$ErrorActionPreference = "Stop"

# ============================================================
# 02_batch_osc2cm_import.ps1
# Minimal, stable batch convert OpenSCENARIO .xosc to CarMaker TestRun
# Project: C:\CM_Projects\ADAS_Demo1
#
# Important design decisions:
# - Do NOT define or include FMU/GenericPlugin here.
# - FMU CM_ACCController_V17 is already configured in SimParameter.
# - This script only converts XOSC -> TestRun.
# - It clears generated outputs before writing new data.
# - It keeps output structure: OSC_Imported\feature_domain\function\case_id
# ============================================================

$ProjectRoot = "C:\CM_Projects\ADAS_Demo1"
$Osc2Cm = "C:\IPG\carmaker\win64-15.1\bin\osc2cm.exe"

$Manifest = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\xosc_manifest.csv"
$Report = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\import_report.csv"

$WorkXoscRoot = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\_work_xosc"
$TestRunRoot = Join-Path $ProjectRoot "Data\TestRun"
$LogRoot = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\logs\osc2cm"

# ============================================================
# User config
# ============================================================

# Must match OSC entity name for Ego.
# Do not remove -e, otherwise osc2cm may convert all entities to traffic objects.
$EgoName = "Ego"

# Keep empty because Ego vehicle/FMU setup is managed by SimParameter/project config.
# If you later need to force an Ego Vehicle InfoFile, set exact name from Data\Vehicle.
$EgoInfoFile = ""

# OpenSCENARIO version: 100 / 110 / 120 / 130
$OscVersion = "130"

# Keep simulation alive if Ego has no explicit maneuver in OSC Storyboard.
$DefaultManeuverDuration = "99999.0"

# ============================================================
# Helpers
# ============================================================

function Remove-GeneratedPath {
    param(
        [Parameter(Mandatory=$true)][string]$Path,
        [Parameter(Mandatory=$true)][string]$Description
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
    param(
        [Parameter(Mandatory=$true)][string]$Path
    )

    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Get-RowValue {
    param(
        [Parameter(Mandatory=$true)]$Row,
        [Parameter(Mandatory=$true)][string]$ColumnName,
        [string]$DefaultValue = ""
    )

    $prop = $Row.PSObject.Properties[$ColumnName]

    if ($null -eq $prop) {
        return $DefaultValue
    }

    $value = [string]$prop.Value

    if ([string]::IsNullOrWhiteSpace($value)) {
        return $DefaultValue
    }

    return $value
}

function Get-RelativePathFromProject {
    param(
        [Parameter(Mandatory=$true)][string]$AbsolutePath
    )

    return $AbsolutePath.Replace($ProjectRoot + "\", "")
}

function Write-TextUtf8NoBom {
    param(
        [Parameter(Mandatory=$true)][string]$Path,
        [Parameter(Mandatory=$true)][string]$Text
    )

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Text, $utf8NoBom)
}

function Repair-BusEntityRefInWorkingCopy {
    param(
        [Parameter(Mandatory=$true)][string]$XoscFile
    )

    if (-not (Test-Path $XoscFile)) {
        return
    }

    $text = Get-Content -Path $XoscFile -Raw -Encoding UTF8

    if ($text -notmatch 'entityRef="Bus"' -and $text -notmatch 'value="Bus"') {
        return
    }

    try {
        [xml]$xml = $text
    } catch {
        Write-Host ("[WARN] XML parse failed. Skip Bus repair: {0}" -f $XoscFile) -ForegroundColor Yellow
        return
    }

    $scenarioObjects = @()
    $nodes = $xml.SelectNodes("//*[local-name()='ScenarioObject']")

    foreach ($node in $nodes) {
        if ($node.name) {
            $scenarioObjects += [string]$node.name
        }
    }

    if ($scenarioObjects.Count -eq 0) {
        Write-Host ("[WARN] No ScenarioObject found. Skip Bus repair: {0}" -f $XoscFile) -ForegroundColor Yellow
        return
    }

    $candidates = @()

    foreach ($obj in $scenarioObjects) {
        if ($obj -ne $EgoName -and $obj -ne "Bus") {
            $candidates += $obj
        }
    }

    if ($candidates.Count -eq 0) {
        Write-Host ("[WARN] No non-Ego replacement candidate for Bus: {0}" -f $XoscFile) -ForegroundColor Yellow
        return
    }

    $replacement = $candidates[0]

    foreach ($obj in $candidates) {
        if ($obj -match "^TV|Target|Vehicle|Car|Truck") {
            $replacement = $obj
            break
        }
    }

    $newText = $text
    $newText = $newText -replace 'entityRef="Bus"', ("entityRef=`"{0}`"" -f $replacement)
    $newText = $newText -replace 'value="Bus"', ("value=`"{0}`"" -f $replacement)

    if ($newText -ne $text) {
        Write-TextUtf8NoBom -Path $XoscFile -Text $newText
        Write-Host ("[PATCH] Replaced invalid Bus reference with {0}: {1}" -f $replacement, $XoscFile) -ForegroundColor Cyan
    }
}

function Invoke-Osc2Cm {
    param(
        [Parameter(Mandatory=$true)][string[]]$Arguments,
        [Parameter(Mandatory=$true)][string]$LogFile
    )

    Ensure-Directory -Path (Split-Path $LogFile)

    if (Test-Path $LogFile) {
        Remove-Item -Path $LogFile -Force
    }

    # Use direct call operator for stability with osc2cm.exe.
    # Redirect all streams to a per-case log file.
    & $Osc2Cm @Arguments *> $LogFile

    if ($null -eq $LASTEXITCODE) {
        return -998
    }

    return [int]$LASTEXITCODE
}

# ============================================================
# Pre-check
# ============================================================

if (-not (Test-Path $Osc2Cm)) {
    throw "osc2cm.exe not found: $Osc2Cm"
}

if (-not (Test-Path $Manifest)) {
    throw "Manifest not found. Run 01_scan_xosc.ps1 first: $Manifest"
}

# ============================================================
# Clean generated batch-level data
# ============================================================

Remove-GeneratedPath -Path $Report -Description "old import report"
Ensure-Directory -Path (Split-Path $Report)

Remove-GeneratedPath -Path $WorkXoscRoot -Description "old working XOSC root"
Ensure-Directory -Path $WorkXoscRoot

Remove-GeneratedPath -Path $LogRoot -Description "old osc2cm logs"
Ensure-Directory -Path $LogRoot

# ============================================================
# Batch conversion
# ============================================================

$rows = Import-Csv $Manifest
$reportRows = @()

foreach ($row in $rows) {
    $enabled = Get-RowValue -Row $row -ColumnName "enabled" -DefaultValue "1"

    if ($enabled -ne "1") {
        continue
    }

    $caseId = Get-RowValue -Row $row -ColumnName "case_id" -DefaultValue ""
    $featureDomain = Get-RowValue -Row $row -ColumnName "feature_domain" -DefaultValue "longitudinal_feature"
    $functionName = Get-RowValue -Row $row -ColumnName "function" -DefaultValue "ACC"

    if ([string]::IsNullOrWhiteSpace($caseId)) {
        Write-Host "[SKIP] Empty case_id in manifest row." -ForegroundColor Yellow
        continue
    }

    $sourceXoscAbs = Get-RowValue -Row $row -ColumnName "source_xosc_abs" -DefaultValue ""

    if ([string]::IsNullOrWhiteSpace($sourceXoscAbs)) {
        $sourceXoscRel = Get-RowValue -Row $row -ColumnName "source_xosc_rel" -DefaultValue ""
        $sourceXoscAbs = Join-Path $ProjectRoot $sourceXoscRel
    }

    $caseWorkDir = Join-Path $WorkXoscRoot (Join-Path $featureDomain (Join-Path $functionName $caseId))
    $caseWorkXosc = Join-Path $caseWorkDir (Split-Path $sourceXoscAbs -Leaf)

    $outputTrRel = Get-RowValue -Row $row -ColumnName "output_testrun" -DefaultValue ""

    if ([string]::IsNullOrWhiteSpace($outputTrRel)) {
        $outputTrRel = "OSC_Imported\$featureDomain\$functionName\$caseId"
    }

    $outputTrRel = $outputTrRel.Replace("/", "\")
    $outputTrAbs = Join-Path $TestRunRoot $outputTrRel

    $caseLogDir = Join-Path $LogRoot (Join-Path $featureDomain $functionName)
    $caseLogFile = Join-Path $caseLogDir ("{0}.log" -f $caseId)

    Write-Host ""
    Write-Host ("=== Converting {0}/{1}/{2} ===" -f $featureDomain, $functionName, $caseId) -ForegroundColor Cyan
    Write-Host "Source XOSC : $sourceXoscAbs"
    Write-Host "Work XOSC   : $caseWorkXosc"
    Write-Host "TestRun     : $outputTrAbs"
    Write-Host "osc2cm log  : $caseLogFile"

    if (-not (Test-Path $sourceXoscAbs)) {
        Write-Host ("[FAIL] Source XOSC missing: {0}" -f $sourceXoscAbs) -ForegroundColor Red

        $reportRows += [PSCustomObject]@{
            case_id = $caseId
            feature_domain = $featureDomain
            function_name = $functionName
            source_xosc = $sourceXoscAbs
            work_xosc = ""
            output_testrun = $outputTrRel
            status = "FAIL"
            exit_code = -1
            log_file = $caseLogFile
            message = "Source XOSC missing"
        }

        continue
    }

    # Clean per-case generated data before writing new data.
    Remove-GeneratedPath -Path $caseWorkDir -Description "old working case folder"
    Ensure-Directory -Path $caseWorkDir

    Remove-GeneratedPath -Path $outputTrAbs -Description "old TestRun output"

    Copy-Item -Path $sourceXoscAbs -Destination $caseWorkXosc -Force

    # Only modifies working-copy, never source XOSC.
    Repair-BusEntityRefInWorkingCopy -XoscFile $caseWorkXosc

    $workXoscRel = Get-RelativePathFromProject -AbsolutePath $caseWorkXosc

    $argsList = @(
        "-p", $ProjectRoot,
        "-o", $workXoscRel,
        "-t", $outputTrRel,
        "-e", $EgoName,
        "--validate",
        "--oscversion", $OscVersion,
        "--mapparam",
        "--trfmobj",
        "--trfendmode", "2",
        "--defaultman", $DefaultManeuverDuration,
        "--logtofile",
        "--logtoconsole",
        "--loglevel", "4"
    )

    if (-not [string]::IsNullOrWhiteSpace($EgoInfoFile)) {
        $argsList += @("-i", $EgoInfoFile)
    }

    $exitCode = Invoke-Osc2Cm -Arguments $argsList -LogFile $caseLogFile

    if ($exitCode -eq 0) {
        $status = "OK"
        Write-Host ("[OK] {0}" -f $caseId) -ForegroundColor Green
    } else {
        $status = "FAIL"
        Write-Host ("[FAIL] {0}, exit={1}" -f $caseId, $exitCode) -ForegroundColor Red
        Write-Host ("       log: {0}" -f $caseLogFile) -ForegroundColor Yellow
    }

    $reportRows += [PSCustomObject]@{
        case_id = $caseId
        feature_domain = $featureDomain
        function_name = $functionName
        source_xosc = $sourceXoscAbs
        work_xosc = $caseWorkXosc
        output_testrun = $outputTrRel
        status = $status
        exit_code = $exitCode
        log_file = $caseLogFile
        message = ""
    }
}

$reportRows | Export-Csv $Report -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "Import report generated:"
Write-Host $Report
