$ErrorActionPreference = "Stop"

function Ensure-Directory {
    param([Parameter(Mandatory=$true)][string]$Path)
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
}

function Remove-OldFile {
    param([Parameter(Mandatory=$true)][string]$Path, [string]$Description = "old file")
    if (Test-Path -LiteralPath $Path) {
        Write-Host "[CLEAN] Removing $Description $Path" -ForegroundColor Yellow
        Remove-Item -LiteralPath $Path -Force -ErrorAction Stop
    }
}

function Write-Step {
    param([Parameter(Mandatory=$true)][string]$Message)
    Write-Host ""
    Write-Host "=== $Message ===" -ForegroundColor Cyan
}

function Get-ScenarioObjectNames {
    param([Parameter(Mandatory=$true)][string]$XmlText)

    $matches = [regex]::Matches($XmlText, '<ScenarioObject\s+name="([^"]+)"')
    return @($matches | ForEach-Object { $_.Groups[1].Value })
}

$ProjectRoot = "C:\CM_Projects\ADAS_Demo1"
$XoscRoot = Join-Path $ProjectRoot "Data\OpenSCENARIO\Scenarios"
$FeatureDomainFilter = "longitudinal_feature"
$FunctionFilter = "ACC"
$ScanRoot = Join-Path $XoscRoot "$FeatureDomainFilter\$FunctionFilter"

$AutomationData = Join-Path $ProjectRoot "Data\Misc\OSC_Automation"
$Manifest = Join-Path $AutomationData "xosc_manifest.csv"

Write-Step "Prepare output manifest"
Ensure-Directory $AutomationData
Remove-OldFile $Manifest "old xosc manifest"

Write-Step "Scan XOSC source"
Write-Host "Source root: $ScanRoot"

$rows = @()

Get-ChildItem $ScanRoot -Recurse -Filter *.xosc |
    Where-Object {
        $_.FullName -notmatch "\\.venv\\" -and
        $_.FullName -notmatch "\\__pycache__\\" -and
        $_.FullName -notmatch "\\Templates\\" -and
        $_.FullName -notmatch "\\Catalogs\\"
    } |
    Sort-Object FullName |
    ForEach-Object {
        $relativeFromScenarios = $_.FullName.Replace($XoscRoot + "\", "")
        $parts = $relativeFromScenarios -split "\\"

        if ($parts.Count -lt 3) {
            Write-Host "[SKIP] Unexpected path: $($_.FullName)" -ForegroundColor Yellow
            return
        }

        $featureDomain = $parts[0]
        $functionName = $parts[1]
        $caseFolder = $_.Directory.Name
        $caseId = if ($caseFolder -match "^(acc|aeb|lka|apa|pa)_csc_\d+$") { $caseFolder } else { $_.BaseName }

        $xmlText = Get-Content $_.FullName -Raw -Encoding UTF8
        $entityNames = Get-ScenarioObjectNames -XmlText $xmlText
        $nonEgoEntities = @($entityNames | Where-Object { $_ -notmatch "^(Ego|ego|EGO)$" })
        $isMultiTv = if ($nonEgoEntities.Count -gt 1) { 1 } else { 0 }

        $relXosc = $_.FullName.Replace($ProjectRoot + "\", "")
        $outputRel = "OSC_Imported\$featureDomain\$functionName\$caseId"
        $workRel = "_work_xosc\$featureDomain\$functionName\$caseId\$($_.Name)"

        $rows += [PSCustomObject]@{
            case_id = $caseId
            feature_domain = $featureDomain
            function_name = $functionName
            source_xosc_abs = $_.FullName
            source_xosc_rel = $relXosc
            work_xosc_rel = $workRel
            output_testrun = $outputRel
            entity_count = $entityNames.Count
            non_ego_entity_count = $nonEgoEntities.Count
            is_multi_tv = $isMultiTv
            enabled = 1
        }
    }

$rows | Export-Csv $Manifest -NoTypeInformation -Encoding UTF8

Write-Host "Manifest generated: $Manifest" -ForegroundColor Green
Write-Host "Total cases: $($rows.Count)"
Write-Host "Multi-TV cases: $(($rows | Where-Object { $_.is_multi_tv -eq 1 }).Count)"
