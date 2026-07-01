# ============================================================
# KpiEngine.ps1
#
# KPI evaluation engine for CarMaker Test Manager automation.
#
# Responsibilities:
#   - Load and parse kpi.yaml (nested YAML, requires powershell-yaml module)
#   - Translate each KPI definition into CarMaker TestMgr Characteristic /
#     Criterion "TestMgr additem" Tcl lines
#
# This module does NOT touch TestRun/Variation generation. It is purely
# additive: given a case_id, it returns a list of Tcl lines to be appended
# right after the corresponding "TestMgr additem TestRun ..." block (and
# after its Variations) in the Test Series tree.
#
# Requires: Import-Module powershell-yaml (caller's responsibility).
#
# ------------------------------------------------------------
# Signal naming note (CM_ACCController_V17, confirmed against the real
# CarMaker Data Dictionary -- see CM15_1_ACC_V17_..._SIGNAL_MAPPING doc):
#
#   AccelCtrl.ACC.DesiredAx / .DesiredDist / .DesiredSpd / .DesiredTGap /
#   .IsActive / .Time2Collision, and AccelCtrl.DesiredAx (no ".ACC.")
#       -> registered in the Data Dictionary AS-IS, no prefix needed.
#   Every other FMU output ("Debug.*")
#       -> only registered via the FMU plugin's "Add FMU Output to DDict"
#          option, which renames it on registration to
#          "FMU.<InstanceName>.Out.<OriginalSignalName>", e.g.
#          Debug.EffectiveTimeGap -> FMU.CM_ACCController_V17.Out.Debug.EffectiveTimeGap
#
# kpi.yaml now stores the FULLY-QUALIFIED, DDict-correct name directly in
# every 'signal' / 'signal_actual' / 'signal_ref' field -- this module reads
# signal names verbatim and does not rewrite or prefix them. If the FMU
# instance name ever changes, update kpi.yaml accordingly; no code change
# needed here.
# ============================================================

# ------------------------------------------------------------
# YAML loading
# ------------------------------------------------------------

function Import-KpiSpec {
    <#
        Loads kpi.yaml and returns the flattened list of KPI definitions.
        Each returned object carries enough context (group name, kpi name,
        full original node) for the translator functions below.
    #>
    param([string]$KpiYamlPath)

    if (-not (Test-Path $KpiYamlPath)) {
        throw "KPI spec file not found: $KpiYamlPath"
    }

    if (-not (Get-Module -ListAvailable -Name powershell-yaml)) {
        throw "Module 'powershell-yaml' is required to parse kpi.yaml (nested YAML). Install with: Install-Module powershell-yaml -Scope CurrentUser"
    }

    Import-Module powershell-yaml -ErrorAction Stop

    $rawText = Get-Content -Path $KpiYamlPath -Raw -Encoding UTF8
    $parsed = ConvertFrom-Yaml -Yaml $rawText

    if ($null -eq $parsed) {
        throw "kpi.yaml parsed to null. Check file content/encoding: $KpiYamlPath"
    }

    # Top-level key is expected to be a single spec id, e.g. ACC_KPI_SPEC_STD.
    # We don't hardcode that name: take the first (and only) top-level key.
    $specKeys = @($parsed.Keys)
    if ($specKeys.Count -eq 0) {
        throw "kpi.yaml has no top-level spec key."
    }
    $specRoot = $parsed[$specKeys[0]]

    $flat = @()

    foreach ($groupName in @($specRoot.Keys)) {
        $groupNode = $specRoot[$groupName]
        foreach ($kpiName in @($groupNode.Keys)) {
            $flat += [PSCustomObject]@{
                spec_id    = $specKeys[0]
                group      = $groupName
                kpi_name   = $kpiName
                node       = $groupNode[$kpiName]
            }
        }
    }

    return $flat
}

# ------------------------------------------------------------
# Tcl literal helpers
# ------------------------------------------------------------

function Format-TclNumber {
    param([double]$Value)
    # Normalize to a plain decimal string (avoid culture-dependent separators
    # and avoid scientific notation for typical KPI threshold magnitudes).
    return $Value.ToString([System.Globalization.CultureInfo]::InvariantCulture)
}

function New-IdentSafe {
    <#
        Sanitizes a string so it is safe to use as a CarMaker Characteristic
        identifier / quantity name fragment: letters, digits and underscore
        only, no leading digit.
    #>
    param([string]$Text)

    $clean = ($Text -replace '[^A-Za-z0-9_]', '_')
    if ($clean -match '^[0-9]') {
        $clean = "_$clean"
    }
    return $clean
}

function Escape-TclQuotedString {
    <#
        Escapes a free-text string so it can be safely embedded inside a
        Tcl double-quoted "..." literal (used for -desc and Criterion names).

        Tcl treats the following as special even inside "...": backslash,
        double-quote, square brackets (command substitution) and dollar sign
        (variable substitution). Any of these appearing unescaped in
        human-written text (e.g. "Warn [3.0s,4.0s)") breaks the surrounding
        Tcl command with a cryptic "missing close-bracket" error. Escaping
        order matters: backslash must be escaped FIRST, otherwise the
        backslashes inserted for the other characters would themselves get
        re-escaped.

        Verified against a real Tcl 8.6 interpreter (info complete + exec)
        for every Criterion/Characteristic line this module generates.
    #>
    param([string]$Text)

    $escaped = $Text.Replace('\', '\\')
    $escaped = $escaped.Replace('"', '\"')
    $escaped = $escaped.Replace('[', '\[')
    $escaped = $escaped.Replace(']', '\]')
    $escaped = $escaped.Replace('$', '\$')
    return $escaped
}

# ------------------------------------------------------------
# Characteristic / Criterion Tcl line builders
# ------------------------------------------------------------

function New-CharacteristicLines {
    <#
        Returns the single Tcl line for one "TestMgr additem Characteristic".

        $Expression is normally the right-hand side of the Real-time
        Expression; this function prepends "Qu::<Ident>=" to it.

        $RawExpression: set to $true when $Expression is ALREADY a complete,
        self-contained RTexpr body that performs its own assignment(s) to
        Qu::<Ident> -- e.g. the official CarMaker self-referencing
        accumulator pattern "first()?Qu::Ident=0:Ident=max(Ident,(cond))".
        In that case this function uses $Expression verbatim and does NOT
        prepend "Qu::<Ident>=" (doing so would double-assign and corrupt the
        pattern, since the assignment already happens inside each branch of
        the first()?: conditional).

        $UseBraceForExpression: when the expression contains literal double
        quotes (e.g. CheckCollision("Ego","TV1")), the RTexpr value MUST be
        wrapped in Tcl curly braces {...} instead of double-quotes "...",
        otherwise the inner quotes would prematurely terminate the "..."
        wrapper and corrupt the whole Tcl command. Braces nest safely and
        require no escaping of inner quotes. Verified against a real Tcl
        interpreter. Pass $true whenever the expression itself contains a
        quoted string literal (entity names for CheckCollision/Speed, etc.)
        or whenever $RawExpression is $true (accumulator patterns always use
        the bare identifier form, which is simplest to keep brace-wrapped).
    #>
    param(
        [string]$Ident,
        [string]$Desc,
        [string]$Expression,
        [bool]$UseBraceForExpression = $false,
        [bool]$RawExpression = $false
    )

    $escapedDesc = Escape-TclQuotedString -Text $Desc

    if ($RawExpression) {
        $rtexprBody = $Expression
    } else {
        $rtexprBody = ('Qu::{0}={1}' -f $Ident, $Expression)
    }

    if ($UseBraceForExpression) {
        $paramArg = ('{{RTexpr {{{0}}}}}' -f $rtexprBody)
    } else {
        $rtexprEscaped = Escape-TclQuotedString -Text $rtexprBody
        $paramArg = ('{{RTexpr "{0}"}}' -f $rtexprEscaped)
    }

    return @(
        ('TestMgr additem Characteristic "{0}" -desc "{1}" -ident "{0}" -param {{{2}}}' -f $Ident, $escapedDesc, $paramArg)
    )
}

function New-CriterionLines {
    <#
        Returns the single Tcl line for one "TestMgr additem Criterion".
        $Good / $Warn / $Bad are Tcl boolean expressions (strings). $Warn may
        be $null (or empty) for a 2-state (good/bad) criterion.
    #>
    param(
        [string]$Name,
        [string]$Desc,
        [string]$Good,
        [string]$Warn,
        [string]$Bad
    )

    $escapedDesc = Escape-TclQuotedString -Text $Desc
    $escapedName = Escape-TclQuotedString -Text $Name

    $optsParts = @()
    $optsParts += ('-good {{{0}}}' -f $Good)
    if (-not [string]::IsNullOrWhiteSpace($Warn)) {
        $optsParts += ('-warn {{{0}}}' -f $Warn)
    }
    $optsParts += ('-bad {{{0}}}' -f $Bad)

    $line = ('TestMgr additem Criterion "{0}" -desc "{1}" {2}' -f $escapedName, $escapedDesc, ($optsParts -join ' '))
    return @($line)
}

function New-EverViolatedCharacteristicLines {
    <#
        Builds a "latching" Characteristic that becomes and stays 1 the
        moment $ViolationCond is ever true during the WHOLE Test Run, using
        the self-referencing accumulator pattern confirmed in CarMaker's own
        Programmer's Guide example:

            first()?Qu::MaxSpd=0:MaxSpd=max(Car.v,MaxSpd)

        Adapted here to a boolean "ever violated" latch:

            first()?Qu::<Ident>=0:<Ident>=max(<Ident>,(<ViolationCond>))

        Because max() never decreases once it has been 1, this correctly
        answers "did this condition occur at ANY point in the simulation",
        not just at the final time step -- unlike reading the raw condition
        directly via [get], which only reflects its value at the moment the
        Criterion is evaluated (end of simulation).

        $ViolationCond must be a Tcl/RTexpr boolean expression in terms of
        already-defined quantities/Characteristics (e.g.
        "ActualDist<SafeDist"). It is evaluated every simulation cycle.
    #>
    param(
        [string]$Ident,
        [string]$Desc,
        [string]$ViolationCond
    )

    $fullDesc = "[EVALUATED OVER ENTIRE TEST RUN DURATION] $Desc"
    $expression = "first()?Qu::${Ident}=0:${Ident}=max(${Ident},(${ViolationCond}))"
    return New-CharacteristicLines -Ident $Ident -Desc $fullDesc -Expression $expression -UseBraceForExpression $true -RawExpression $true
}

function New-TwoTierEverViolatedCharacteristicLines {
    <#
        Same latching principle as New-EverViolatedCharacteristicLines, but
        tracks two independent severity tiers (warn-level and bad-level)
        separately, each with its own latch, so that a Criterion can later
        report "ever reached bad" with priority over "ever reached warn"
        even if the warn-level condition is also (necessarily) true whenever
        the bad-level one is.

        Returns TWO Characteristic lines (one per tier), via two calls into
        New-EverViolatedCharacteristicLines.
    #>
    param(
        [string]$WarnIdent,
        [string]$WarnDesc,
        [string]$WarnCond,
        [string]$BadIdent,
        [string]$BadDesc,
        [string]$BadCond
    )

    $lines = @()
    $lines += New-EverViolatedCharacteristicLines -Ident $WarnIdent -Desc $WarnDesc -ViolationCond $WarnCond
    $lines += New-EverViolatedCharacteristicLines -Ident $BadIdent -Desc $BadDesc -ViolationCond $BadCond
    return $lines
}

# ------------------------------------------------------------
# Per-KPI translators
# Each translator receives:
#   $CaseId   - e.g. "acc_csc_004"
#   $Node     - the KPI yaml node (hashtable from ConvertFrom-Yaml)
#   $Entities - result of Get-TVEntities for this Test Run (may be empty)
# and returns a hashtable: @{ Lines = @(...); Skipped = $bool; SkipReason = "" }
# ------------------------------------------------------------

function Convert-SafeDistanceConsistency {
    <#
        Bad if, at ANY point during the entire Test Run, the function was
        actively following (gate signal == 1) AND the actual distance had
        fallen below the safe-distance target at that same instant. Good
        otherwise (including the case where the function was never in
        active Follow mode at all during the run).

        This uses the ever-violated accumulator pattern: the violation
        condition itself is gated INSIDE the accumulator
        ("gate==1 && ActualDist<SafeDist"), so a momentary drop below
        SafeDist while NOT actively following (e.g. a brief gate flicker)
        does not count, but any momentary drop while actively following
        DOES count and is never "forgotten" even if distance recovers
        before the simulation ends -- the only way prior designs (final
        value only) would catch.

        The gate also prevents false-fails when ACC is in plain Cruise
        Control (no same-lane fused target -- e.g. a target vehicle in an
        adjacent lane) where Target.DistX/SafeDistance are not meaningful:
        SafeDist is only a valid constraint while the function is actually
        following a confirmed same-lane fused target.

        $GateNode is the yaml node supplying the "is actively following"
        signal (kpi.yaml: following/active_follow_gate). Required -- if
        $null, the gate is omitted from the violation condition (the
        criterion becomes "ever ActualDist<SafeDist" unconditionally; only
        happens if that node is missing from kpi.yaml).
    #>
    param([string]$CaseId, $Node, $GateNode)

    $sigActual = [string]$Node['signal_actual']
    $sigRef = [string]$Node['signal_ref']

    $identActual = "${CaseId}_ActualDist"
    $identRef = "${CaseId}_SafeDist"
    $identViolated = "${CaseId}_SafeDistViolated"

    $lines = @()
    $lines += New-CharacteristicLines -Ident $identActual -Desc "Actual distance to lead (signal=$sigActual)" -Expression $sigActual
    $lines += New-CharacteristicLines -Ident $identRef -Desc "Reference safe distance (signal=$sigRef)" -Expression $sigRef

    if ($null -ne $GateNode) {
        $gateQty = [string]$GateNode['signal']
        $violationCond = "$gateQty==1 && $identActual<$identRef"
        $violDesc = "Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers."
    } else {
        $violationCond = "$identActual<$identRef"
        $violDesc = "Latches to 1 the moment ActualDist<SafeDist. (No active_follow_gate defined in kpi.yaml -- judged unconditionally.)"
    }
    $lines += New-EverViolatedCharacteristicLines -Ident $identViolated -Desc $violDesc -ViolationCond $violationCond

    $lines += New-CriterionLines -Name "$CaseId - Safe Distance Consistency" `
        -Desc "Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point." `
        -Good ("[get $identViolated] == 0") -Warn $null -Bad ("[get $identViolated] == 1")

    return @{ Lines = $lines; Skipped = $false; SkipReason = "" }
}

function Convert-TTCGroup {
    <#
        Merges TTC_warning + TTC_critical + TTC_no_collision (three yaml nodes,
        same underlying signal) into a single Characteristic + two latching
        "ever violated" accumulators (warn-tier and bad-tier, tracked
        separately) + one Criterion, gated by the target-validity signal
        (safety/target_valid_gate in kpi.yaml) so that TTC is only judged
        when a lead target actually exists.

        TTC is an instantaneous quantity that can dip into the warn or bad
        zone only briefly and recover before the simulation ends; reading
        its final value alone (as in an earlier version of this function)
        would miss any such transient. Both zones are now latched
        independently with the same accumulator pattern used for SafeDist:
        once "ever bad" is set it stays set, and likewise for "ever warn",
        even if TTC later recovers to a safe value. The Criterion then
        reports bad if the bad-tier ever latched, else warn if the warn-tier
        ever latched, else good -- bad always wins over warn for the whole
        run, per the worst-result-wins convention used elsewhere in CarMaker
        Test Manager.

        $ValidGateNode is the safety/target_valid_gate yaml node (must supply
        'signal'). If $null (node missing from kpi.yaml), the gate is omitted
        entirely and TTC is judged unconditionally -- callers should prefer
        always defining target_valid_gate in kpi.yaml to avoid this fallback.
    #>
    param([string]$CaseId, $WarnNode, $CriticalNode, $NoCollisionNode, $ValidGateNode)

    # All three nodes share the same 'signal'; use the warning node as primary
    # source (validated identical signal across nodes by the caller).
    $signal = [string]$WarnNode['signal']
    $warnTh = [double]$WarnNode['threshold']['warning']
    $critTh = [double]$CriticalNode['threshold']['critical']

    $ident = "${CaseId}_TTC"
    $warnEverIdent = "${CaseId}_TTCWarnEver"
    $badEverIdent = "${CaseId}_TTCBadEver"

    $lines = @()
    $lines += New-CharacteristicLines -Ident $ident -Desc "Time-to-collision (signal=$signal)" -Expression $signal

    $warnS = Format-TclNumber $warnTh
    $critS = Format-TclNumber $critTh

    if ($null -ne $ValidGateNode) {
        $validQty = [string]$ValidGateNode['signal']
        $warnCond = "$validQty==1 && $ident>=$critS && $ident<$warnS"
        $badCond  = "$validQty==1 && $ident>0 && $ident<$critS"
        $desc = "Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [${critS},${warnS})s. Bad if it ever entered (0,${critS})s."
    } else {
        $warnCond = "$ident>=$critS && $ident<$warnS"
        $badCond  = "$ident>0 && $ident<$critS"
        $desc = "Good if TTC never entered the warn/bad zone throughout the run. Warn if it ever entered [${critS},${warnS})s. Bad if it ever entered (0,${critS})s. (No target_valid_gate defined in kpi.yaml -- judged unconditionally.)"
    }

    $lines += New-TwoTierEverViolatedCharacteristicLines `
        -WarnIdent $warnEverIdent -WarnDesc "Latches to 1 the moment TTC ever enters the warn zone [${critS},${warnS})s." -WarnCond $warnCond `
        -BadIdent $badEverIdent -BadDesc "Latches to 1 the moment TTC ever enters the bad zone (0,${critS})s." -BadCond $badCond

    $lines += New-CriterionLines -Name "$CaseId - Time To Collision" `
        -Desc $desc `
        -Good ("[get $badEverIdent] == 0 && [get $warnEverIdent] == 0") `
        -Warn ("[get $badEverIdent] == 0 && [get $warnEverIdent] == 1") `
        -Bad  ("[get $badEverIdent] == 1")

    return @{ Lines = $lines; Skipped = $false; SkipReason = "" }
}

function Convert-SimpleAxBound {
    <#
function Convert-SimpleAxBound {
    <#
        Generic 2-state (good/bad) Characteristic+Criterion builder for the
        three AccelCtrl.DesiredAx-based KPIs (comfort / emergency / max
        emergency). Each must use its OWN Characteristic identifier even
        though they share the same underlying signal, because Characteristic
        identifiers (and the Data Dictionary quantities they create) must be
        unique within the Test Series.

        Acceleration changes every simulation cycle, so checking only its
        final value (as an earlier version of this function did) is close
        to meaningless -- a single out-of-bound spike anywhere during the
        run is the actual safety-relevant event, even if Ax has long since
        returned within bounds by the time the simulation ends. This uses
        the ever-violated accumulator pattern: bad latches permanently the
        moment the bound is ever exceeded, for any point during the run.

        $MinV / $MaxV are passed as plain [object] (not [Nullable[double]])
        to avoid relying on a type accelerator that may not be loaded in
        every PowerShell version/profile; pass $null explicitly for "not
        applicable" (e.g. emergency_deceleration has only a min bound).
    #>
    param(
        [string]$CaseId,
        [string]$IdentSuffix,
        [string]$CriterionLabel,
        $Node,
        [object]$MinV,
        [object]$MaxV
    )

    $signal = [string]$Node['signal']
    $ident = "${CaseId}_${IdentSuffix}"
    $identViolated = "${CaseId}_${IdentSuffix}OutOfBoundEver"

    $lines = @()
    $lines += New-CharacteristicLines -Ident $ident -Desc "$CriterionLabel (signal=$signal)" -Expression $signal

    $violConds = @()
    $descParts = @()
    if ($null -ne $MinV) {
        $minS = Format-TclNumber ([double]$MinV)
        $violConds += "$ident<$minS"
        $descParts += "min=$minS"
    }
    if ($null -ne $MaxV) {
        $maxS = Format-TclNumber ([double]$MaxV)
        $violConds += "$ident>$maxS"
        $descParts += "max=$maxS"
    }
    $violationCond = ($violConds -join ' || ')

    $lines += New-EverViolatedCharacteristicLines -Ident $identViolated `
        -Desc "Latches to 1 the moment $CriterionLabel ever goes out of bound ($($descParts -join ', '))." `
        -ViolationCond $violationCond

    $lines += New-CriterionLines -Name "$CaseId - $CriterionLabel" `
        -Desc ("Good if " + $CriterionLabel + " never went out of bound ($($descParts -join ', ')) throughout the run.") `
        -Good ("[get $identViolated] == 0") -Warn $null -Bad ("[get $identViolated] == 1")

    return @{ Lines = $lines; Skipped = $false; SkipReason = "" }
}

function Convert-JerkLimit {
    <#
        Jerk is a derivative, changing every cycle; checking only its final
        value is meaningless. Uses the ever-violated accumulator pattern:
        bad latches permanently the moment |jerk| ever exceeds the limit.
    #>
    param([string]$CaseId, $Node)

    # signal in yaml is written as "derivative(AccelCtrl.DesiredAx)" (descriptive,
    # not valid RTexpr syntax). The underlying base signal is AccelCtrl.DesiredAx;
    # derivative is computed with the built-in diff(a,b) = da/db function.
    $baseSignal = "AccelCtrl.DesiredAx"
    $maxV = [double]$Node['threshold']['max']

    $ident = "${CaseId}_Jerk"
    $identViolated = "${CaseId}_JerkOverLimitEver"
    $expression = "abs(diff($baseSignal,Time))"

    $lines = @()
    $lines += New-CharacteristicLines -Ident $ident -Desc "Jerk = |d(DesiredAx)/dt|, base signal=$baseSignal" -Expression $expression

    $maxS = Format-TclNumber $maxV

    $lines += New-EverViolatedCharacteristicLines -Ident $identViolated `
        -Desc "Latches to 1 the moment |jerk| ever exceeds ${maxS} m/s3." `
        -ViolationCond "$ident>$maxS"

    $lines += New-CriterionLines -Name "$CaseId - Jerk Limit" `
        -Desc "Good if |jerk| never exceeded ${maxS} m/s3 throughout the run." `
        -Good ("[get $identViolated] == 0") `
        -Warn $null `
        -Bad  ("[get $identViolated] == 1")

    return @{ Lines = $lines; Skipped = $false; SkipReason = "" }
}

function Convert-NoCollisionDistance {
    <#
        Distance to the nearest lead object can dip below the threshold
        momentarily (e.g. during a close pass) and recover before the
        simulation ends; checking only the final value would hide that.
        Uses the ever-violated accumulator pattern: bad latches permanently
        the moment distance ever drops below the threshold.
    #>
    param([string]$CaseId, $Node)

    $signal = [string]$Node['signal']
    $minV = [double]$Node['threshold']['min']

    $ident = "${CaseId}_NoCollDist"
    $identViolated = "${CaseId}_NoCollDistViolatedEver"
    $lines = @()
    $lines += New-CharacteristicLines -Ident $ident -Desc "Distance to nearest lead object (signal=$signal)" -Expression $signal

    $minS = Format-TclNumber $minV

    $lines += New-EverViolatedCharacteristicLines -Ident $identViolated `
        -Desc "Latches to 1 the moment distance ever drops below ${minS}m." `
        -ViolationCond "$ident<$minS"

    $lines += New-CriterionLines -Name "$CaseId - No Collision Distance" `
        -Desc "Good if distance never dropped below ${minS}m throughout the run." `
        -Good ("[get $identViolated] == 0") `
        -Warn $null `
        -Bad  ("[get $identViolated] == 1")

    return @{ Lines = $lines; Skipped = $false; SkipReason = "" }
}

function Convert-CollisionAndImpactSpeed {
    <#
        Builds collision_flag, impact_speed, and a separate "ever collided"
        latch, all derived from a signal that ALREADY exists and is
        entity-agnostic ("nearest lead object" semantics -- the same
        distance signal used for no_collision_distance):

            collision_flag = ($DistSignal <= 0)
                -- instantaneous: true only in the exact cycle(s) where the
                   gap is <= 0. Kept instantaneous (not latched) because it
                   is used purely as the trigger condition for impact_speed's
                   latch() below -- latch() itself already does the
                   "remember the first true and keep it" job correctly, so
                   collision_flag does not need to be separately latched for
                   that purpose.
            impact_speed = latch(Speed("Ego"), collision_flag==1)
                -- Ego speed recorded at the exact simulation cycle
                   collision_flag FIRST becomes true; latch() is a built-in
                   "record once and hold" function, so this part already
                   behaves correctly over the whole run without needing the
                   ever-violated accumulator pattern.
            collision_ever = ever-violated accumulator on collision_flag==1
                -- needed because the Criterion only sees the FINAL value of
                   whatever it reads via [get]. Reading collision_flag's
                   final value directly (an earlier version of this
                   function did this) would wrongly report "good" if the
                   vehicles separated again (DistX recovered above 0) by the
                   time the simulation ends, even though a real collision
                   happened earlier. collision_ever fixes that by latching
                   permanently once collision_flag is ever 1.

        $DistSignal must be the fully-qualified, DDict-correct quantity name
        (e.g. resolved from collision/no_collision_distance's 'signal' field
        in kpi.yaml by the caller) -- this function does not rewrite it.
    #>
    param([string]$CaseId, [string]$DistSignal)

    $collisionIdent = "${CaseId}_CollisionFlag"
    $impactIdent = "${CaseId}_ImpactSpeed"
    $collisionEverIdent = "${CaseId}_CollisionEver"

    $lines = @()
    $lines += New-CharacteristicLines -Ident $collisionIdent -Desc "Collision flag derived from $DistSignal <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below." -Expression "($DistSignal<=0)"

    $impactExpr = "latch(Speed(`"Ego`"),Qu::${collisionIdent}==1)"
    $lines += New-CharacteristicLines -Ident $impactIdent -Desc "Ego speed latched at moment of first collision (nearest lead object)" -Expression $impactExpr -UseBraceForExpression $true

    $lines += New-EverViolatedCharacteristicLines -Ident $collisionEverIdent `
        -Desc "Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends." `
        -ViolationCond "$collisionIdent==1"

    $lines += New-CriterionLines -Name "$CaseId - Collision Flag" `
        -Desc "Good if no collision ever occurred (nearest lead object) throughout the run." `
        -Good ("[get $collisionEverIdent] == 0") `
        -Warn $null `
        -Bad  ("[get $collisionEverIdent] == 1")

    $lines += New-CriterionLines -Name "$CaseId - Impact Speed" `
        -Desc "Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s" `
        -Good ("[get $collisionEverIdent] == 0 || [get $impactIdent] == 0") `
        -Warn ("[get $collisionEverIdent] == 1 && [get $impactIdent] > 0 && [get $impactIdent] < 5") `
        -Bad  ("[get $collisionEverIdent] == 1 && [get $impactIdent] >= 5")

    return @{ Lines = $lines; Skipped = $false; SkipReason = "" }
}

# ------------------------------------------------------------
# Top-level orchestrator
# ------------------------------------------------------------

function New-KpiTclLines {
    <#
        Main entry point. Given the flattened KPI spec (from Import-KpiSpec)
        and a CaseId, returns:
            @{
                Lines  = [string[]]   Tcl lines to insert into the Test Series
                Report = [PSCustomObject[]]  one row per KPI group, for the
                         variation_injection_report.csv style audit trail
            }

        Note: this no longer requires DeclaredParameters / TV-entity detection.
        Every KPI in kpi.yaml is now derived either from a directly-named
        signal, or (for collision_flag/impact_speed) from the existing
        entity-agnostic "nearest lead object" distance signal supplied by
        collision/no_collision_distance's 'signal' field, so it applies
        uniformly to every Test Run regardless of how many target vehicles
        the underlying scenario uses. All signal names are read verbatim
        from kpi.yaml -- this module does not rewrite or prefix them.
    #>
    param(
        [System.Object[]]$KpiSpec,
        [string]$CaseId
    )

    # Group nodes by (group, kpi_name) for direct lookup.
    $byKey = @{}
    foreach ($item in $KpiSpec) {
        $byKey["$($item.group)/$($item.kpi_name)"] = $item.node
    }

    # Collect (label, result) pairs first; flatten into Lines/Report afterward.
    # This avoids relying on nested-function variable scoping (PowerShell's
    # $script: scope modifier refers to the top-level script scope, NOT the
    # enclosing function's scope, so a nested helper mutating $script:allLines
    # would silently write to the wrong variable if this function is ever
    # dot-sourced as part of a larger script. Building a plain array of
    # results and flattening it in one place below is scope-safe regardless
    # of how this module is sourced.)
    $pairs = @()

    # A2. following.safe_distance_consistency, gated by
    # following.active_follow_gate (Debug.Fusion.Active) if defined.
    if ($byKey.ContainsKey('following/safe_distance_consistency')) {
        $gateNode = if ($byKey.ContainsKey('following/active_follow_gate')) { $byKey['following/active_follow_gate'] } else { $null }
        $pairs += [PSCustomObject]@{ Label = 'safe_distance_consistency'; Result = (Convert-SafeDistanceConsistency -CaseId $CaseId -Node $byKey['following/safe_distance_consistency'] -GateNode $gateNode) }
    }

    # A3. safety.TTC_warning + TTC_critical + TTC_no_collision (merged),
    # gated by safety.target_valid_gate if defined in kpi.yaml.
    if ($byKey.ContainsKey('safety/TTC_warning') -and $byKey.ContainsKey('safety/TTC_critical')) {
        $noCollNode = if ($byKey.ContainsKey('safety/TTC_no_collision')) { $byKey['safety/TTC_no_collision'] } else { $null }
        $validGateNode = if ($byKey.ContainsKey('safety/target_valid_gate')) { $byKey['safety/target_valid_gate'] } else { $null }
        $pairs += [PSCustomObject]@{ Label = 'TTC'; Result = (Convert-TTCGroup -CaseId $CaseId -WarnNode $byKey['safety/TTC_warning'] -CriticalNode $byKey['safety/TTC_critical'] -NoCollisionNode $noCollNode -ValidGateNode $validGateNode) }
    }

    # A4-A5. longitudinal.* (each gets its own Characteristic identifier).
    # Note: max_emergency_limit was merged into emergency_deceleration (the
    # model defines a single ACC.EmergencyAx threshold, not two separate
    # tiers), so there is no longer a separate call site for it here.
    if ($byKey.ContainsKey('longitudinal/comfort_deceleration')) {
        $n = $byKey['longitudinal/comfort_deceleration']
        $pairs += [PSCustomObject]@{ Label = 'comfort_deceleration'; Result = (Convert-SimpleAxBound -CaseId $CaseId -IdentSuffix 'ComfortAx' -CriterionLabel 'Comfort Deceleration Limit' -Node $n -MinV ([double]$n['threshold']['min']) -MaxV ([double]$n['threshold']['max'])) }
    }
    if ($byKey.ContainsKey('longitudinal/emergency_deceleration')) {
        $n = $byKey['longitudinal/emergency_deceleration']
        $pairs += [PSCustomObject]@{ Label = 'emergency_deceleration'; Result = (Convert-SimpleAxBound -CaseId $CaseId -IdentSuffix 'EmergencyAx' -CriterionLabel 'Emergency Deceleration Bound' -Node $n -MinV ([double]$n['threshold']['min']) -MaxV $null) }
    }

    # A6. jerk.jerk_limit
    if ($byKey.ContainsKey('jerk/jerk_limit')) {
        $pairs += [PSCustomObject]@{ Label = 'jerk_limit'; Result = (Convert-JerkLimit -CaseId $CaseId -Node $byKey['jerk/jerk_limit']) }
    }

    # A7a. collision.no_collision_distance
    if ($byKey.ContainsKey('collision/no_collision_distance')) {
        $pairs += [PSCustomObject]@{ Label = 'no_collision_distance'; Result = (Convert-NoCollisionDistance -CaseId $CaseId -Node $byKey['collision/no_collision_distance']) }
    }

    # A7b. collision.impact_speed + derived collision_flag (entity-agnostic,
    # derived purely from collision/no_collision_distance's signal -- no TV
    # name/count needed). Requires that node to be present in kpi.yaml since
    # it supplies the distance signal name; skipped with a clear reason if not.
    if ($byKey.ContainsKey('collision/impact_speed')) {
        if ($byKey.ContainsKey('collision/no_collision_distance')) {
            $distSignal = [string]$byKey['collision/no_collision_distance']['signal']
            $pairs += [PSCustomObject]@{ Label = 'collision_flag_and_impact_speed'; Result = (Convert-CollisionAndImpactSpeed -CaseId $CaseId -DistSignal $distSignal) }
        } else {
            $pairs += [PSCustomObject]@{
                Label = 'collision_flag_and_impact_speed'
                Result = @{
                    Lines = @()
                    Skipped = $true
                    SkipReason = "SKIPPED_NO_DISTANCE_SIGNAL: collision/no_collision_distance node missing from kpi.yaml; collision_flag/impact_speed need its 'signal' value."
                }
            }
        }
    }

    # D1. response.driver_reaction_reference -> explicit skip, no signal available.
    if ($byKey.ContainsKey('response/driver_reaction_reference')) {
        $pairs += [PSCustomObject]@{
            Label = 'driver_reaction_reference'
            Result = @{
                Lines = @()
                Skipped = $true
                SkipReason = "SKIPPED_NO_SIGNAL: driver_reaction_reference is a constant reference value (metric), not measurable from simulation."
            }
        }
    }

    # Flatten pairs into Lines + Report.
    $allLines = @()
    $report = @()
    foreach ($pair in $pairs) {
        $result = $pair.Result
        $allLines += $result.Lines
        $report += [PSCustomObject]@{
            case_id               = $CaseId
            kpi_group             = $pair.Label
            characteristic_count  = @($result.Lines | Where-Object { $_ -match '^TestMgr additem Characteristic' }).Count
            criterion_count       = @($result.Lines | Where-Object { $_ -match '^TestMgr additem Criterion' }).Count
            skipped               = $result.Skipped
            skip_reason           = $result.SkipReason
        }
    }

    return @{ Lines = $allLines; Report = $report }
}
