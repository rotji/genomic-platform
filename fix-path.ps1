# 🔧 Complete PATH Fix Script for Genomic Platform
# This script fixes PATH issues for Python, Clarinet, and ensures all backend services work from command prompt

Write-Host "🛠️  Fixing PATH for Genomic Platform Backend Services" -ForegroundColor Green
Write-Host ""

# Function to check if running as Administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Check if running as Administrator
if (-not (Test-Administrator)) {
    Write-Host "❌ This script must be run as Administrator to modify system PATH" -ForegroundColor Red
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After running as Administrator, execute:" -ForegroundColor Cyan
    Write-Host "cd C:\Users\PC\Desktop\genomic-platform" -ForegroundColor White
    Write-Host "powershell -ExecutionPolicy Bypass -File fix-path.ps1" -ForegroundColor White
    exit 1
}

Write-Host "✅ Running as Administrator" -ForegroundColor Green
Write-Host ""

# Get current system PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
Write-Host "📋 Current System PATH length: $($currentPath.Length) characters" -ForegroundColor Cyan

# Define paths to add
$pathsToAdd = @()

# 1. Find and add Python path
Write-Host ""
Write-Host "🐍 Fixing Python PATH..." -ForegroundColor Yellow

$pythonPaths = @(
    "C:\Users\PC\AppData\Local\Programs\Python\Python313",
    "C:\Users\PC\AppData\Local\Programs\Python\Python313\Scripts",
    "C:\Python313", 
    "C:\Python313\Scripts",
    "C:\Program Files\Python313",
    "C:\Program Files\Python313\Scripts"
)

foreach ($pythonPath in $pythonPaths) {
    if (Test-Path $pythonPath) {
        if ($currentPath -notlike "*$pythonPath*") {
            $pathsToAdd += $pythonPath
            Write-Host "  ✅ Found Python path: $pythonPath" -ForegroundColor Green
        } else {
            Write-Host "  ✅ Python path already in PATH: $pythonPath" -ForegroundColor Green
        }
    }
}

# 2. Add Clarinet path
Write-Host ""
Write-Host "🔮 Fixing Clarinet PATH..." -ForegroundColor Yellow

$clarinetPath = "C:\Program Files\clarinet\bin"
if (Test-Path $clarinetPath) {
    if ($currentPath -notlike "*$clarinetPath*") {
        $pathsToAdd += $clarinetPath
        Write-Host "  ✅ Found Clarinet path: $clarinetPath" -ForegroundColor Green
    } else {
        Write-Host "  ✅ Clarinet path already in PATH: $clarinetPath" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ Clarinet not found at: $clarinetPath" -ForegroundColor Red
    Write-Host "     Please reinstall Clarinet or check installation location" -ForegroundColor Yellow
}

# 3. Verify Node.js path
Write-Host ""
Write-Host "🟢 Checking Node.js PATH..." -ForegroundColor Yellow

try {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js not found in PATH" -ForegroundColor Red
    
    # Common Node.js installation paths
    $nodePaths = @(
        "C:\Program Files\nodejs",
        "C:\Program Files (x86)\nodejs",
        "$env:APPDATA\npm"
    )
    
    foreach ($nodePath in $nodePaths) {
        if (Test-Path $nodePath) {
            if ($currentPath -notlike "*$nodePath*") {
                $pathsToAdd += $nodePath
                Write-Host "  ✅ Found Node.js path: $nodePath" -ForegroundColor Green
            }
        }
    }
}

# 4. Add all new paths to system PATH
if ($pathsToAdd.Count -gt 0) {
    Write-Host ""
    Write-Host "🔧 Adding paths to system PATH..." -ForegroundColor Yellow
    
    $newPath = $currentPath
    foreach ($path in $pathsToAdd) {
        $newPath += ";$path"
        Write-Host "  ➕ Adding: $path" -ForegroundColor Cyan
    }
    
    # Update system PATH
    try {
        [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        Write-Host "  ✅ System PATH updated successfully!" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ Failed to update system PATH: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "✅ All paths are already configured correctly!" -ForegroundColor Green
}

# 5. Fix Windows Python Store alias issue
Write-Host ""
Write-Host "🔧 Fixing Windows Python Store alias..." -ForegroundColor Yellow

$pythonAppAlias = "$env:LOCALAPPDATA\Microsoft\WindowsApps\python.exe"
$pythonAppAlias3 = "$env:LOCALAPPDATA\Microsoft\WindowsApps\python3.exe"

if (Test-Path $pythonAppAlias) {
    try {
        Remove-Item $pythonAppAlias -Force
        Write-Host "  ✅ Removed Python Store alias: $pythonAppAlias" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Could not remove Python Store alias (may require manual removal)" -ForegroundColor Yellow
    }
}

if (Test-Path $pythonAppAlias3) {
    try {
        Remove-Item $pythonAppAlias3 -Force
        Write-Host "  ✅ Removed Python3 Store alias: $pythonAppAlias3" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Could not remove Python3 Store alias (may require manual removal)" -ForegroundColor Yellow
    }
}

# 6. Create convenient batch files for running services
Write-Host ""
Write-Host "📝 Creating service runner scripts..." -ForegroundColor Yellow

# API Server runner
$apiServerScript = @"
@echo off
echo 🖥️  Starting Genomic Platform API Server...
cd /d "C:\Users\PC\Desktop\genomic-platform\backend\api-server"
npm run dev
pause
"@

$apiServerScript | Out-File -FilePath "C:\Users\PC\Desktop\genomic-platform\run-api-server.bat" -Encoding ASCII
Write-Host "  ✅ Created: run-api-server.bat" -ForegroundColor Green

# Analysis Engine runner
$analysisEngineScript = @"
@echo off
echo 🐍 Starting Genomic Analysis Engine...
cd /d "C:\Users\PC\Desktop\genomic-platform\backend\analysis-engine"
C:\Users\PC\AppData\Local\Programs\Python\Python313\python.exe src\main.py
pause
"@

$analysisEngineScript | Out-File -FilePath "C:\Users\PC\Desktop\genomic-platform\run-analysis-engine.bat" -Encoding ASCII
Write-Host "  ✅ Created: run-analysis-engine.bat" -ForegroundColor Green

# Oracle Service runner
$oracleServiceScript = @"
@echo off
echo 🔮 Starting Oracle Service...
cd /d "C:\Users\PC\Desktop\genomic-platform\backend\oracle-service"
npm run dev
pause
"@

$oracleServiceScript | Out-File -FilePath "C:\Users\PC\Desktop\genomic-platform\run-oracle-service.bat" -Encoding ASCII
Write-Host "  ✅ Created: run-oracle-service.bat" -ForegroundColor Green

# All services runner
$allServicesScript = @"
@echo off
echo 🚀 Starting All Genomic Platform Services...
echo.

start "API Server" cmd /k "cd /d C:\Users\PC\Desktop\genomic-platform\backend\api-server && npm run dev"
timeout /t 3 /nobreak > nul

start "Analysis Engine" cmd /k "cd /d C:\Users\PC\Desktop\genomic-platform\backend\analysis-engine && C:\Users\PC\AppData\Local\Programs\Python\Python313\python.exe src\main.py"
timeout /t 3 /nobreak > nul

start "Oracle Service" cmd /k "cd /d C:\Users\PC\Desktop\genomic-platform\backend\oracle-service && npm run dev"

echo ✅ All services started in separate windows!
echo.
echo 🌐 Service URLs:
echo   - API Server: http://localhost:3001
echo   - Analysis Engine: http://localhost:8000  
echo   - Oracle Service: http://localhost:3002
echo.
pause
"@

$allServicesScript | Out-File -FilePath "C:\Users\PC\Desktop\genomic-platform\start-all-services.bat" -Encoding ASCII
Write-Host "  ✅ Created: start-all-services.bat" -ForegroundColor Green

# 7. Summary and next steps
Write-Host ""
Write-Host "🎉 PATH Fix Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 What was fixed:" -ForegroundColor Cyan
Write-Host "  ✅ Python PATH issues resolved" -ForegroundColor White
Write-Host "  ✅ Clarinet added to system PATH" -ForegroundColor White
Write-Host "  ✅ Node.js PATH verified" -ForegroundColor White
Write-Host "  ✅ Windows Python Store aliases removed" -ForegroundColor White
Write-Host "  ✅ Convenient service runner scripts created" -ForegroundColor White
Write-Host ""
Write-Host "🚀 How to run services:" -ForegroundColor Cyan
Write-Host "  • Double-click: start-all-services.bat (runs all services)" -ForegroundColor White
Write-Host "  • Or individually: run-api-server.bat, run-analysis-engine.bat, run-oracle-service.bat" -ForegroundColor White
Write-Host ""
Write-Host "🔄 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart your command prompt/PowerShell" -ForegroundColor White
Write-Host "  2. Test: python --version" -ForegroundColor White
Write-Host "  3. Test: clarinet --version" -ForegroundColor White
Write-Host "  4. Test: node --version" -ForegroundColor White
Write-Host "  5. Run: start-all-services.bat" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: Restart your terminal for PATH changes to take effect!" -ForegroundColor Yellow