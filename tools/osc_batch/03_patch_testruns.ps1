$ErrorActionPreference = "Stop"

# ============================================================
# 03_cleanup_duplicate_fmu_from_testruns.ps1
# Remove duplicate FMU/GenericPlugin definitions from generated TestRuns
# Project: C:\CM_Projects\ADAS_Demo1
#
# Important design decisions:
# - CM_ACCController_V17 is already configured in SimParameter.
# - TestRun files must NOT include GenericPlugin.CM_ACCController_V17.* again.
# - This script only removes old duplicated FMU lines/blocks from TestRuns.
# - It does NOT add any new FMU/GenericPlugin configuration.
# ============================================================

$ProjectRoot = "C:\CM_Projects\ADAS_Demo1"

$Manifest = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\xosc_manifest.csv"
$ImportReport = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\import_report.csv"
$CleanupReport = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\cleanup_duplicate_fmu_report.csv"

$TestRunRoot = Join-Path $ProjectRoot "Data\TestRun"
$BackupRoot = Join-Path $ProjectRoot "Data\Misc\OSC_Automation\_backup_testrun_before_fmu_cleanup"

$FmuModelName = "CM_ACCController_V17"

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

function Read-TextDefaultEncoding {
    param(
        [Parameter(Mandatory=$true)][string]$Path
    )

    return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::Default)
}

function Write-TextUtf8NoBom {
    param(
        [Parameter(Mandatory=$true)][string]$Path,
        [Parameter(Mandatory=$true)][string]$Text
    )

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Text, $utf8NoBom)
}

function Test-LooksLikeCarMakerInfoFile {
    param(
        [Parameter(Mandatory=$true)][string]$Path
    )

    if (-not (Test-Path $Path)) {
        return $false
    }

    try {
        $head = Get-Content -Path $Path -TotalCount 60 -ErrorAction Stop
    } catch {
        return $false
    }

    if ($null -eq $head -or $head.Count -eq 0) {
        return $false
    }

    $joined = $head -join "`n"

    if ($joined -match "#INFOFILE") {
        return $true
    }

    if ($joined -match "FileIdent") {
        return $true
    }

    if ($joined -match "DrivMan" -or $joined -match "Traffic" -or $joined -match "Road" -or $joined -match "Vehicle") {
        return $true
    }

    return $false
}

function Backup-TestRunFile {
    param(
        [Parameter(Mandatory=$true)][string]$SourcePath,
        [Parameter(Mandatory=$true)][string]$FeatureDomain,
        [Parameter(Mandatory=$true)][string]$FunctionName,
        [Parameter(Mandatory=$true)][string]$CaseId
    )

    $backupDir = Join-Path $BackupRoot (Join-Path $FeatureDomain (Join-Path $FunctionName $CaseId))
    Ensure-Directory -Path $backupDir

    $backupPath = Join-Path $backupDir "testrun_before_fmu_cleanup.backup"
    Copy-Item -Path $SourcePath -Destination $backupPath -Force

    return $backupPath
}

function Remove-DuplicateFmuConfigFromText {
    param(
        [Parameter(Mandatory=$true)][string]$Text,
        [Parameter(Mandatory=$true)][string]$FmuModelName
    )

    $newText = $Text

    # Remove old automation block if any previous script inserted it.
    $newText = [regex]::Replace(
        $newText,
        "(?s)# --- Added by OSC batch automation ---.*?# --- End OSC batch automation ---\r?\n?",
        ""
    )

    # Remove direct GenericPlugin lines for this FMU model only.
    $escapedModel = [regex]::Escape($FmuModelName)
    $newText = [regex]::Replace(
        $newText,
        "(?m)^\s*GenericPlugin\.$escapedModel\..*\r?\n?",
        ""
    )

    # Remove direct Plugin lines for this model if a previous script wrote them.
    $newText = [regex]::Replace(
        $newText,
        "(?m)^\s*Plugin\.$escapedModel\..*\r?\n?",
        ""
    )

    # Remove TestRun-level FMU logging only if it appears as an injected standalone line.
    # FMU logging should stay managed by SimParameter in this project.
    $newText = [regex]::Replace(
        $newText,
        "(?m)^\s*FMU\.Logging\.ToFile\s*=.*\r?\n?",
        ""
    )

    return $newText.TrimEnd() + "`r`n"
}

# ============================================================
# Pre-check
# ============================================================

if (-not (Test-Path $Manifest)) {
    throw "Manifest not found. Run 01_scan_xosc.ps1 first: $Manifest"
}

Remove-GeneratedPath -Path $CleanupReport -Description "old cleanup report"
Ensure-Directory -Path (Split-Path $CleanupReport)

Remove-GeneratedPath -Path $BackupRoot -Description "old TestRun cleanup backup root"
Ensure-Directory -Path $BackupRoot

$manifestRows = Import-Csv $Manifest
$importStatusByCase = @{}

if (Test-Path $ImportReport) {
    $importRows = Import-Csv $ImportReport

    foreach ($ir in $importRows) {
        $caseIdFromReport = Get-RowValue -Row $ir -ColumnName "case_id" -DefaultValue ""
        $statusFromReport = Get-RowValue -Row $ir -ColumnName "status" -DefaultValue ""

        if (-not [string]::IsNullOrWhiteSpace($caseIdFromReport)) {
            $importStatusByCase[$caseIdFromReport] = $statusFromReport
        }
    }
}

$cleanupRows = @()

foreach ($row in $manifestRows) {
    $enabled = Get-RowValue -Row $row -ColumnName "enabled" -DefaultValue "1"

    if ($enabled -ne "1") {
        continue
    }

    $caseId = Get-RowValue -Row $row -ColumnName "case_id" -DefaultValue ""
    $featureDomain = Get-RowValue -Row $row -ColumnName "feature_domain" -DefaultValue "longitudinal_feature"
    $functionName = Get-RowValue -Row $row -ColumnName "function" -DefaultValue "ACC"

    if ([string]::IsNullOrWhiteSpace($caseId)) {
        continue
    }

    if ($importStatusByCase.ContainsKey($caseId)) {
        if ($importStatusByCase[$caseId] -ne "OK") {
            Write-Host ("[SKIP] {0}: osc2cm import was not OK" -f $caseId) -ForegroundColor Yellow

            $cleanupRows += [PSCustomObject]@{
                case_id = $caseId
                feature_domain = $featureDomain
                function_name = $functionName
                testrun = ""
                changed = $false
                status = "SKIP"
                message = "osc2cm import was not OK"
            }

            continue
        }
    }

    $outputTrRel = Get-RowValue -Row $row -ColumnName "output_testrun" -DefaultValue ""

    if ([string]::IsNullOrWhiteSpace($outputTrRel)) {
        $outputTrRel = "OSC_Imported\$featureDomain\$functionName\$caseId"
    }

    $outputTrRel = $outputTrRel.Replace("/", "\")
    $testRunPath = Join-Path $TestRunRoot $outputTrRel

    Write-Host ""
    Write-Host ("=== Cleaning FMU duplication {0}/{1}/{2} ===" -f $featureDomain, $functionName, $caseId) -ForegroundColor Cyan
    Write-Host "TestRun: $testRunPath"

    if (-not (Test-Path $testRunPath)) {
        Write-Host "[FAIL] TestRun file missing." -ForegroundColor Red

        $cleanupRows += [PSCustomObject]@{
            case_id = $caseId
            feature_domain = $featureDomain
            function_name = $functionName
            testrun = $testRunPath
            changed = $false
            status = "FAIL"
            message = "TestRun file missing"
        }

        continue
    }

    if (-not (Test-LooksLikeCarMakerInfoFile -Path $testRunPath)) {
        Write-Host "[WARN] File does not look like a CarMaker InfoFile. Skip." -ForegroundColor Yellow

        $cleanupRows += [PSCustomObject]@{
            case_id = $caseId
            feature_domain = $featureDomain
            function_name = $functionName
            testrun = $testRunPath
            changed = $false
            status = "SKIP"
            message = "File does not look like a CarMaker InfoFile"
        }

        continue
    }

    $backupPath = Backup-TestRunFile `
        -SourcePath $testRunPath `
        -FeatureDomain $featureDomain `
        -FunctionName $functionName `
        -CaseId $caseId

    $oldText = Read-TextDefaultEncoding -Path $testRunPath
    $newText = Remove-DuplicateFmuConfigFromText -Text $oldText -FmuModelName $FmuModelName
    $changed = ($newText -ne $oldText)

    if ($changed) {
        Write-TextUtf8NoBom -Path $testRunPath -Text $newText
        Write-Host "[OK] Duplicate FMU config removed." -ForegroundColor Green
    } else {
        Write-Host "[OK] No duplicate FMU config found." -ForegroundColor Green
    }

    $cleanupRows += [PSCustomObject]@{
        case_id = $caseId
        feature_domain = $featureDomain
        function_name = $functionName
        testrun = $testRunPath
        changed = $changed
        status = "OK"
        message = "Backup: $backupPath"
    }
}

$cleanupRows | Export-Csv $CleanupReport -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "Cleanup report generated:"
Write-Host $CleanupReport
