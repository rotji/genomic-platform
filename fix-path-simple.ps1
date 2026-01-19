# Simple PATH Fix Script for Genomic Platform
# Run as Administrator

Write-Host "Fixing PATH for Genomic Platform Backend Services" -ForegroundColor Green

# Check if running as Administrator
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Running as Administrator - OK" -ForegroundColor Green

# Get current system PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$pathsToAdd = @()

# Add Python path
$pythonPath = "C:\Users\PC\AppData\Local\Programs\Python\Python312"
if (Test-Path $pythonPath) {
    if ($currentPath -notlike "*$pythonPath*") {
        $pathsToAdd += $pythonPath
        Write-Host "Adding Python path: $pythonPath" -ForegroundColor Cyan
    }
}

$pythonScriptsPath = "C:\Users\PC\AppData\Local\Programs\Python\Python312\Scripts"
if (Test-Path $pythonScriptsPath) {
    if ($currentPath -notlike "*$pythonScriptsPath*") {
        $pathsToAdd += $pythonScriptsPath
        Write-Host "Adding Python Scripts path: $pythonScriptsPath" -ForegroundColor Cyan
    }
}

# Add Clarinet path
$clarinetPath = "C:\Program Files\clarinet\bin"
if (Test-Path $clarinetPath) {
    if ($currentPath -notlike "*$clarinetPath*") {
        $pathsToAdd += $clarinetPath
        Write-Host "Adding Clarinet path: $clarinetPath" -ForegroundColor Cyan
    }
}

# Update PATH if needed
if ($pathsToAdd.Count -gt 0) {
    $newPath = $currentPath
    foreach ($path in $pathsToAdd) {
        $newPath += ";$path"
    }
    
    try {
        [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        Write-Host "System PATH updated successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to update system PATH: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "All paths are already configured!" -ForegroundColor Green
}

# Remove Python Store aliases
$pythonAlias = "$env:LOCALAPPDATA\Microsoft\WindowsApps\python.exe"
if (Test-Path $pythonAlias) {
    try {
        Remove-Item $pythonAlias -Force
        Write-Host "Removed Python Store alias" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove Python Store alias" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "PATH fix complete!" -ForegroundColor Green
Write-Host "Please restart your terminal for changes to take effect" -ForegroundColor Yellow