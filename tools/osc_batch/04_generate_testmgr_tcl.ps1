$ErrorActionPreference = "Stop"

# ============================================================
# 04_generate_testmgr_tcl.ps1
# Generate CarMaker TestMgr TCL scripts and inject per-case
# variation samples from DATA_sample YAML files.
#
# Project root is fixed for production path:
#   C:\CM_Projects\ADAS_Demo1
#
# This script:
#   - Reads import_report.csv from step 02.
#   - Uses only TestRuns with status = OK.
#   - Reads per-case YAML files from:
#       Data\OpenSCENARIO\DATA_sample\<feature_domain>\<function>\acc_dsp_xxx.yaml
#     and compatible fallback paths.
#   - Injects only sample values whose keys are listed in declared_parameters.
#   - Does NOT modify TestRuns.
#   - Does NOT define FMU / GenericPlugin.
#   - Does NOT modify SimParameter.
#   - Always writes variation_injection_report.csv.
#   - Loads Data\Misc\OSC_Automation\kpi.yaml (KPI spec) and, for every
#     generated Test Run, additionally injects matching Characteristic and
#     Criterion items so each Test Run is evaluated against the documented
#     KPI thresholds, not just executed. Always writes kpi_injection_report.csv.
# ============================================================

$ProjectRoot = "C:\CM_Projects\ADAS_Demo1"

$AutomationDataRoot = Join-Path $ProjectRoot "Data\Misc\OSC_Automation"
$ImportReport = Join-Path $AutomationDataRoot "import_report.csv"
$VariationReport = Join-Path $AutomationDataRoot "variation_injection_report.csv"
$KpiReport = Join-Path $AutomationDataRoot "kpi_injection_report.csv"

$TestRunRoot = Join-Path $ProjectRoot "Data\TestRun"
$ScriptOutRoot = Join-Path $ProjectRoot "Data\Script\OSC_Automation"
$DataSampleRoot = Join-Path $ProjectRoot "Data\OpenSCENARIO\DATA_sample"
$KpiRoot = Join-Path $ProjectRoot "Data\OpenSCENARIO\KPI"

# KpiEngine.ps1 is expected to live alongside this script.
$KpiEnginePath = Join-Path $PSScriptRoot "KpiEngine.ps1"
if (-not (Test-Path $KpiEnginePath)) {
    throw "KpiEngine.ps1 not found next to this script: $KpiEnginePath"
}
. $KpiEnginePath

# ============================================================
# Helpers
# ============================================================

function Remove-GeneratedPath {
    param(
        [string]$Path,
        [string]$Description
    )

    if ([string]::IsNullOrWhiteSpace($Path)) {
        return
    }

    if (Test-Path $Path) {
        Write-Host ("[CLEAN] Removing {0}: {1}" -f $Description, $Path) -ForegroundColor Yellow
        Remove-Item -Path $Path -Recurse -Force
    }
}

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Get-RowValue {
    param(
        $Row,
        [string]$ColumnName,
        [string]$DefaultValue
    )

    $prop = $Row.PSObject.Properties[$ColumnName]

    if ($null -eq $prop) {
        return $DefaultValue
    }

    if ([string]::IsNullOrWhiteSpace([string]$prop.Value)) {
        return $DefaultValue
    }

    return [string]$prop.Value
}

function Write-TextFileNoBom {
    param(
        [string]$Path,
        [string[]]$Lines
    )

    Ensure-Directory -Path (Split-Path $Path)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllLines($Path, $Lines, $utf8NoBom)
}

function Convert-ToForwardSlash {
    param([string]$Path)

    return $Path.Replace("\", "/")
}

function Get-CaseNumber {
    param([string]$CaseId)

    if ($CaseId -match "(\d+)$") {
        return $Matches[1]
    }

    return ""
}

function Find-DataSampleYaml {
    param(
        [string]$FeatureDomain,
        [string]$FunctionName,
        [string]$CaseId
    )

    $caseNumber = Get-CaseNumber -CaseId $CaseId

    if ([string]::IsNullOrWhiteSpace($caseNumber)) {
        return ""
    }

    $fileBase = "acc_dsp_$caseNumber"

    $candidatePaths = @(
        (Join-Path $DataSampleRoot (Join-Path $FeatureDomain (Join-Path $FunctionName "$fileBase.yaml"))),
        (Join-Path $DataSampleRoot (Join-Path $FeatureDomain (Join-Path $FunctionName $fileBase))),
        (Join-Path $DataSampleRoot (Join-Path $FeatureDomain (Join-Path $FunctionName (Join-Path $CaseId "$fileBase.yaml")))),
        (Join-Path $DataSampleRoot (Join-Path $FeatureDomain (Join-Path $FunctionName (Join-Path $CaseId $fileBase))))
    )

    foreach ($path in $candidatePaths) {
        if (Test-Path $path) {
            return $path
        }
    }

    return ""
}

function Parse-InlineList {
    param([string]$RawValue)

    $items = @()

    $value = $RawValue.Trim()

    if ($value.StartsWith("[") -and $value.EndsWith("]")) {
        $inner = $value.Substring(1, $value.Length - 2)
        $parts = $inner.Split(",")

        foreach ($part in $parts) {
            $clean = $part.Trim().Trim("'").Trim('"')
            if (-not [string]::IsNullOrWhiteSpace($clean)) {
                $items += $clean
            }
        }
    }

    return $items
}

function Parse-DataSampleYaml {
    param([string]$YamlPath)

    $result = [PSCustomObject]@{
        yaml_path = $YamlPath
        valid = $false
        case_id = ""
        declared_parameters = @()
        samples = @()
        message = ""
    }

    if (-not (Test-Path $YamlPath)) {
        $result.message = "YAML file not found"
        return $result
    }

    $lines = Get-Content -Path $YamlPath -Encoding UTF8

    $insideDeclaredBlock = $false
    $insideSamples = $false
    $currentSample = $null

    foreach ($rawLine in $lines) {
        $line = [string]$rawLine

        if ([string]::IsNullOrWhiteSpace($line)) {
            continue
        }

        $trim = $line.Trim()

        if ($trim.StartsWith("#")) {
            continue
        }

        if ($trim -match "^case_id\s*:\s*(.+)$") {
            $result.case_id = $Matches[1].Trim().Trim("'").Trim('"')
            $insideDeclaredBlock = $false
            continue
        }

        if ($trim -match "^declared_parameters\s*:\s*(.+)$") {
            $rawValue = $Matches[1].Trim()
            $result.declared_parameters = Parse-InlineList -RawValue $rawValue
            $insideDeclaredBlock = $false
            continue
        }

        if ($trim -match "^declared_parameters\s*:\s*$") {
            $insideDeclaredBlock = $true
            continue
        }

        if ($insideDeclaredBlock -and $trim -match "^-+\s*(.+)$") {
            $paramName = $Matches[1].Trim().Trim("'").Trim('"')
            if (-not [string]::IsNullOrWhiteSpace($paramName)) {
                $result.declared_parameters += $paramName
            }
            continue
        }

        if ($trim -match "^samples\s*:\s*$") {
            $insideSamples = $true
            $insideDeclaredBlock = $false
            continue
        }

        if ($insideSamples -and $trim -match "^-\s*sample_id\s*:\s*(.+)$") {
            if ($null -ne $currentSample) {
                $result.samples += $currentSample
            }

            $sampleId = $Matches[1].Trim().Trim("'").Trim('"')
            $currentSample = [ordered]@{}
            $currentSample["sample_id"] = $sampleId
            continue
        }

        if ($insideSamples -and $null -ne $currentSample -and $trim -match "^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$") {
            $key = $Matches[1].Trim()
            $value = $Matches[2].Trim().Trim("'").Trim('"')
            $currentSample[$key] = $value
            continue
        }
    }

    if ($null -ne $currentSample) {
        $result.samples += $currentSample
    }

    if ([string]::IsNullOrWhiteSpace($result.case_id)) {
        $result.message = "Missing case_id"
        return $result
    }

    if ($result.declared_parameters.Count -eq 0) {
        $result.message = "Missing or empty declared_parameters"
        return $result
    }

    if ($result.samples.Count -eq 0) {
        $result.message = "Missing or empty samples"
        return $result
    }

    foreach ($sample in $result.samples) {
        if (-not $sample.Contains("sample_id")) {
            $result.message = "At least one sample is missing sample_id"
            return $result
        }
    }

    $result.valid = $true
    $result.message = "OK"
    return $result
}

function Get-TestRunText {
    param([string]$TestRunPath)

    if (-not (Test-Path $TestRunPath)) {
        return ""
    }

    return [System.IO.File]::ReadAllText($TestRunPath, [System.Text.Encoding]::Default)
}

function Test-TextContainsLiteral {
    param(
        [string]$Text,
        [string]$Value
    )

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return $false
    }

    return ($Text -match [regex]::Escape($Value))
}

function Convert-ValueForTclParam {
    param([string]$Value)

    if ($Value -match "^-?\d+(\.\d+)?$") {
        return $Value
    }

    $escaped = $Value.Replace("}", "\}")
    return "{$escaped}"
}

function Build-TestRunParamSpec {
    param([string[]]$ParamNames)

    $items = @()

    foreach ($p in $ParamNames) {
        $items += ("{{{0} NValue}}" -f $p)
    }

    return ($items -join " ")
}

function Build-VariationValueList {
    param(
        $Sample,
        [string[]]$ParamNames
    )

    $values = @()

    foreach ($p in $ParamNames) {
        $values += (Convert-ValueForTclParam -Value ([string]$Sample[$p]))
    }

    return ($values -join " ")
}

# ============================================================
# Pre-check
# ============================================================

if (-not (Test-Path $ImportReport)) {
    throw "Import report not found. Run 02_batch_osc2cm_import.ps1 first: $ImportReport"
}

if (-not (Get-Module -ListAvailable -Name powershell-yaml)) {
    throw "Module 'powershell-yaml' is required to parse kpi.yaml. Install with: Install-Module powershell-yaml -Scope CurrentUser"
}

Ensure-Directory -Path $AutomationDataRoot

Remove-GeneratedPath -Path $ScriptOutRoot -Description "old generated TestMgr TCL folder"
Ensure-Directory -Path $ScriptOutRoot

Remove-GeneratedPath -Path $VariationReport -Description "old variation injection report"
Remove-GeneratedPath -Path $KpiReport -Description "old KPI injection report"

# ============================================================
# Load valid imported TestRuns
# ============================================================

$importRows = Import-Csv $ImportReport
$validRows = @()

foreach ($row in $importRows) {
    $status = Get-RowValue -Row $row -ColumnName "status" -DefaultValue ""

    if ($status -ne "OK") {
        continue
    }

    $caseId = Get-RowValue -Row $row -ColumnName "case_id" -DefaultValue ""
    $featureDomain = Get-RowValue -Row $row -ColumnName "feature_domain" -DefaultValue "longitudinal_feature"
    $functionName = Get-RowValue -Row $row -ColumnName "function_name" -DefaultValue ""

    if ([string]::IsNullOrWhiteSpace($functionName)) {
        $functionName = Get-RowValue -Row $row -ColumnName "function" -DefaultValue "ACC"
    }

    $outputTrRel = Get-RowValue -Row $row -ColumnName "output_testrun" -DefaultValue ""

    if ([string]::IsNullOrWhiteSpace($outputTrRel)) {
        $outputTrRel = "OSC_Imported\$featureDomain\$functionName\$caseId"
    }

    $outputTrRel = $outputTrRel.Replace("/", "\")

    if ([string]::IsNullOrWhiteSpace($caseId)) {
        continue
    }

    $testRunAbs = Join-Path $TestRunRoot $outputTrRel

    if (-not (Test-Path $testRunAbs)) {
        continue
    }

    $validRows += [PSCustomObject]@{
        case_id = $caseId
        feature_domain = $featureDomain
        function_name = $functionName
        output_testrun = $outputTrRel
        test_run_abs = $testRunAbs
    }
}

Write-Host ("Valid TestRuns for TestMgr: {0}" -f $validRows.Count)

if ($validRows.Count -eq 0) {
    throw "No valid imported TestRuns found. Check import_report.csv."
}

# ============================================================
# Generate per-group TCL scripts
# ============================================================

$variationReportRows = @()
$kpiReportRows = @()
$groups = $validRows | Group-Object feature_domain, function_name
$masterGenerateLines = @()
$masterRunLines = @()

$masterGenerateLines += 'Log "=== Generate all OSC Test Series ==="'
$masterRunLines += 'Log "=== Run all OSC Test Series ==="'

$groupIndex = 1

foreach ($group in $groups) {
    $rows = $group.Group | Sort-Object case_id

    $featureDomain = $rows[0].feature_domain
    $functionName = $rows[0].function_name

    $safeFeature = $featureDomain.Replace("/", "_").Replace("\", "_")
    $safeFunction = $functionName.Replace("/", "_").Replace("\", "_")

    $generateTclName = ("{0:00}_generate_{1}_{2}_testseries.tcl" -f $groupIndex, $safeFeature, $safeFunction)
    $runTclName = ("{0:00}_run_{1}_{2}_testseries.tcl" -f ($groupIndex + 1), $safeFeature, $safeFunction)

    $generateTclPath = Join-Path $ScriptOutRoot $generateTclName
    $runTclPath = Join-Path $ScriptOutRoot $runTclName

    $seriesRel = ("OSC_Imported/{0}/{1}/{2}_OSC_Regression.ts" -f $featureDomain, $functionName, $functionName)
    $seriesAbs = Join-Path $TestRunRoot ($seriesRel.Replace("/", "\"))

    Remove-GeneratedPath -Path $seriesAbs -Description ("old Test Series {0}/{1}" -f $featureDomain, $functionName)

    # ------------------------------------------------------------
    # Load this group's KPI spec: Data\OpenSCENARIO\KPI\<feature_domain>\<function>\kpi.yaml
    # Mirrors the DATA_sample layout. One kpi.yaml is shared by every Test
    # Run / case_id within this feature_domain+function group (confirmed:
    # not per-case). If missing, KPI injection is skipped for the WHOLE
    # group with a clear warning -- TestRun/Variation generation is
    # completely unaffected either way.
    # ------------------------------------------------------------
    $kpiYamlPath = Join-Path $KpiRoot (Join-Path $featureDomain (Join-Path $functionName "kpi.yaml"))
    $kpiSpec = @()
    if (Test-Path $kpiYamlPath) {
        try {
            $kpiSpec = Import-KpiSpec -KpiYamlPath $kpiYamlPath
            Write-Host ("[KPI] Loaded {0} KPI node(s) for {1}/{2} from {3}" -f $kpiSpec.Count, $featureDomain, $functionName, $kpiYamlPath) -ForegroundColor Cyan
        } catch {
            Write-Host ("[KPI] WARNING: failed to parse {0}: {1}" -f $kpiYamlPath, $_.Exception.Message) -ForegroundColor Yellow
            $kpiSpec = @()
        }
    } else {
        Write-Host ("[KPI] WARNING: kpi.yaml not found for {0}/{1} ({2}). Skipping KPI injection for this group." -f $featureDomain, $functionName, $kpiYamlPath) -ForegroundColor Yellow
    }

    $generateLines = @()
    $generateLines += ('Log "=== Generate {0}/{1} OSC Test Series ==="' -f $featureDomain, $functionName)
    $generateLines += 'TestMgr new -force'
    $generateLines += ('TestMgr configure Description "Auto-generated {0}/{1} OpenSCENARIO regression with YAML variations"' -f $featureDomain, $functionName)
    $generateLines += ('TestMgr additem Group "{0} / {1}"' -f $featureDomain, $functionName)
    $generateLines += ""

    foreach ($row in $rows) {
        $caseId = $row.case_id
        $testRunRelTcl = Convert-ToForwardSlash -Path $row.output_testrun
        $testRunText = Get-TestRunText -TestRunPath $row.test_run_abs

        $yamlPath = Find-DataSampleYaml -FeatureDomain $featureDomain -FunctionName $functionName -CaseId $caseId
        $yamlFound = if ([string]::IsNullOrWhiteSpace($yamlPath)) { "NO" } else { "YES" }

        $status = "NO_YAML"
        $message = ""
        $injectParams = @()
        $variationCount = 0
        $declaredNotSampled = @()
        $ignoredSampleKeysNotDeclared = @()
        $missingParamsInTestRun = @()

        if ($yamlFound -eq "NO") {
            $generateLines += ('TestMgr additem TestRun "{0}"' -f $testRunRelTcl)
            $message = "YAML not found. Added TestRun without variations."
        } else {
            $yaml = Parse-DataSampleYaml -YamlPath $yamlPath

            if (-not $yaml.valid) {
                $generateLines += ('TestMgr additem TestRun "{0}"' -f $testRunRelTcl)
                $status = "YAML_INVALID"
                $message = $yaml.message
            } elseif ($yaml.case_id -ne $caseId) {
                $generateLines += ('TestMgr additem TestRun "{0}"' -f $testRunRelTcl)
                $status = "YAML_CASE_MISMATCH"
                $message = ("YAML case_id={0}, expected={1}" -f $yaml.case_id, $caseId)
            } else {
                $declared = @($yaml.declared_parameters)
                $sampleKeysUnion = @()

                foreach ($sample in $yaml.samples) {
                    foreach ($key in $sample.Keys) {
                        if ($key -ne "sample_id" -and ($sampleKeysUnion -notcontains $key)) {
                            $sampleKeysUnion += $key
                        }
                    }
                }

                foreach ($declaredParam in $declared) {
                    $existsInAllSamples = $true

                    foreach ($sample in $yaml.samples) {
                        if (-not $sample.Contains($declaredParam)) {
                            $existsInAllSamples = $false
                            break
                        }
                    }

                    if ($existsInAllSamples) {
                        $injectParams += $declaredParam
                    } else {
                        $declaredNotSampled += $declaredParam
                    }
                }

                foreach ($sampleKey in $sampleKeysUnion) {
                    if ($declared -notcontains $sampleKey) {
                        $ignoredSampleKeysNotDeclared += $sampleKey
                    }
                }

                foreach ($param in $injectParams) {
                    if (-not (Test-TextContainsLiteral -Text $testRunText -Value $param)) {
                        $missingParamsInTestRun += $param
                    }
                }

                if ($injectParams.Count -eq 0) {
                    $generateLines += ('TestMgr additem TestRun "{0}"' -f $testRunRelTcl)
                    $status = "NO_INJECTABLE_PARAMS"
                    $message = "No declared parameters are present in every sample."
                } elseif ($missingParamsInTestRun.Count -gt 0) {
                    $generateLines += ('TestMgr additem TestRun "{0}"' -f $testRunRelTcl)
                    $status = "MISSING_PARAMS_IN_TESTRUN"
                    $message = "At least one injectable parameter is not found in generated TestRun."
                } else {
                    $paramSpec = Build-TestRunParamSpec -ParamNames $injectParams
                    $generateLines += ('TestMgr additem TestRun "{0}" -param {{{1}}}' -f $testRunRelTcl, $paramSpec)

                    foreach ($sample in $yaml.samples) {
                        $sampleId = [string]$sample["sample_id"]
                        $valueList = Build-VariationValueList -Sample $sample -ParamNames $injectParams
                        $generateLines += ('TestMgr additem Variation "{0}" -param {{{1}}}' -f $sampleId, $valueList)
                        $variationCount += 1
                    }

                    $status = "OK"
                    $message = "Injected YAML variations."
                }
            }
        }

        # ------------------------------------------------------------
        # KPI evaluation: inject Characteristic/Criterion for this Test Run.
        #
        # Must be appended HERE -- immediately after the TestRun item and all
        # of its Variation items -- because TestMgr additem Characteristic /
        # Criterion attach to whichever TestRun is the nearest preceding
        # TestRun item in the tree. Inserting them later (e.g. after the
        # group's EndGroup) would attach them to the wrong Test Run or fail
        # outright since there would be no TestRun parent in scope.
        #
        # This runs unconditionally (regardless of $status above): even when
        # the per-case DATA_sample YAML is missing/invalid and no Variations
        # were injected, the Test Run still executes against its .xosc
        # default values and therefore still produces real signals (Ego,
        # lead object, etc.) that the KPIs can be evaluated against.
        # ------------------------------------------------------------
        if ($kpiSpec.Count -eq 0) {
            $kpiReportRows += [PSCustomObject]@{
                case_id              = $caseId
                kpi_group            = "(all)"
                characteristic_count = 0
                criterion_count      = 0
                skipped              = $true
                skip_reason          = "SKIPPED_NO_KPI_YAML_FOR_GROUP: $kpiYamlPath not found or failed to parse."
            }
        } else {
            $kpiResult = New-KpiTclLines -KpiSpec $kpiSpec -CaseId $caseId
            $generateLines += $kpiResult.Lines
            $kpiReportRows += $kpiResult.Report
        }

        $variationReportRows += [PSCustomObject]@{
            case_id = $caseId
            feature_domain = $featureDomain
            function_name = $functionName
            testrun = $row.output_testrun
            yaml_path = $yamlPath
            yaml_found = $yamlFound
            status = $status
            inject_params = ($injectParams -join ",")
            variation_count = $variationCount
            declared_not_sampled = ($declaredNotSampled -join ",")
            ignored_sample_keys_not_declared = ($ignoredSampleKeysNotDeclared -join ",")
            missing_params_in_testrun = ($missingParamsInTestRun -join ",")
            message = $message
        }
    }

    $generateLines += ""
    $generateLines += "TestMgr additem EndGroup"
    $generateLines += ('TestMgr save "{0}"' -f $seriesRel)
    $generateLines += ('Log "Saved Test Series: {0}"' -f $seriesRel)

    $runLines = @()
    $runLines += ('Log "=== Run {0}/{1} OSC Test Series ==="' -f $featureDomain, $functionName)
    $runLines += ('TestMgr load "{0}"' -f $seriesRel)
    $runLines += "TestMgr clearresults"
    $runLines += "TestMgr start"
    $runLines += 'Log "TestMgr Status: [TestMgr get Status]"'
    $runLines += 'Log "TestMgr Result: [TestMgr get Result]"'

    Write-TextFileNoBom -Path $generateTclPath -Lines $generateLines
    Write-TextFileNoBom -Path $runTclPath -Lines $runLines

    $masterGenerateLines += ('source Data/Script/OSC_Automation/{0}' -f $generateTclName)
    $masterRunLines += ('source Data/Script/OSC_Automation/{0}' -f $runTclName)

    Write-Host ("[OK] Generated TCL for {0}/{1}" -f $featureDomain, $functionName) -ForegroundColor Green
    Write-Host ("     Generate: {0}" -f $generateTclPath)
    Write-Host ("     Run     : {0}" -f $runTclPath)
    Write-Host ("     Series  : {0}" -f $seriesAbs)

    $groupIndex += 2
}

# ============================================================
# Write master scripts and report
# ============================================================

$masterGeneratePath = Join-Path $ScriptOutRoot "00_generate_all_testseries.tcl"
$masterRunPath = Join-Path $ScriptOutRoot "00_run_all_testseries.tcl"

Write-TextFileNoBom -Path $masterGeneratePath -Lines $masterGenerateLines
Write-TextFileNoBom -Path $masterRunPath -Lines $masterRunLines

$variationReportRows | Export-Csv -Path $VariationReport -NoTypeInformation -Encoding UTF8
$kpiReportRows | Export-Csv -Path $KpiReport -NoTypeInformation -Encoding UTF8

$kpiSkippedCount = @($kpiReportRows | Where-Object { $_.skipped -eq $true }).Count
$kpiCharCount = ($kpiReportRows | Measure-Object -Property characteristic_count -Sum).Sum
$kpiCritCount = ($kpiReportRows | Measure-Object -Property criterion_count -Sum).Sum

Write-Host ""
Write-Host ("KPI injection summary: {0} Characteristic(s), {1} Criterion(s) added across {2} Test Run(s); {3} KPI group(s) skipped." -f $kpiCharCount, $kpiCritCount, $validRows.Count, $kpiSkippedCount) -ForegroundColor Cyan
if ($kpiSkippedCount -gt 0) {
    Write-Host "See kpi_injection_report.csv for skip reasons (column: skip_reason)." -ForegroundColor Yellow
}


Write-Host ""
Write-Host "Generated master TCL scripts:"
Write-Host $masterGeneratePath
Write-Host $masterRunPath

Write-Host ""
Write-Host "Variation injection report:"
Write-Host $VariationReport

Write-Host ""
Write-Host "KPI injection report:"
Write-Host $KpiReport

Write-Host ""
Write-Host "Run in CarMaker Script Control:"
Write-Host "source Data/Script/OSC_Automation/00_generate_all_testseries.tcl"
Write-Host "source Data/Script/OSC_Automation/00_run_all_testseries.tcl"
