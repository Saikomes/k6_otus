$ErrorActionPreference = "Stop"

# ===== CONFIG =====
$ScriptName = "testOtus.js"
$MountDir   = "/k6"

# ===== PATHS =====
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Ensure docker-compose is executed in correct folder
Set-Location $ScriptDir

Write-Host "ScriptDir: $ScriptDir"
Write-Host "PWD:       $(Get-Location)"

$TagName = ("{0}-{1}" -f `
    [System.IO.Path]::GetFileNameWithoutExtension($ScriptName), `
    (Get-Date -Format "yyyyMMddHHmmss"))

$LogsDir   = Join-Path $ScriptDir "logs"
$LogFile   = Join-Path $LogsDir "loadTest.log"
$ErrorFile = Join-Path $LogsDir "error.log"

# ===== PREPARE LOGS =====
if (-not (Test-Path $LogsDir)) {
    New-Item -ItemType Directory -Path $LogsDir | Out-Null
}

if (Test-Path $LogFile)   { Remove-Item $LogFile   -Force }
if (Test-Path $ErrorFile) { Remove-Item $ErrorFile -Force }

# ===== RUN K6 =====
Write-Host "Running k6 inside docker-compose..."

docker-compose run --rm `
    -v "${ScriptDir}:${MountDir}" `
    k6 `
    run `
        --log-format=raw `
        --console-output "${MountDir}/logs/loadTest.log" `
        "${MountDir}/scripts/${ScriptName}" `
        --tag "testid=${TagName}"

# ===== FILTER LOGS =====
if (Test-Path $LogFile) {
    Write-Host "Filtering logs..."
    Get-Content $LogFile |
        Where-Object { $_ -notmatch 'ar user' -and $_ -notmatch 'sv user' } |
        Set-Content $ErrorFile
} else {
    Write-Warning "Log file not found. Probably k6 did not start."
}
