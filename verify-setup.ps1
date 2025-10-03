# 🧪 Verify All Backend Services and Tools
# Run this after fixing PATH to verify everything works

Write-Host "🧪 Verifying Genomic Platform Backend Setup" -ForegroundColor Green
Write-Host ""

$allGood = $true

# Test 1: Python
Write-Host "🐍 Testing Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    if ($pythonVersion -like "*Python*") {
        Write-Host "  ✅ Python: $pythonVersion" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Python not working correctly" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "  ❌ Python not found in PATH" -ForegroundColor Red
    $allGood = $false
}

# Test 2: Node.js
Write-Host ""
Write-Host "🟢 Testing Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js not found in PATH" -ForegroundColor Red
    $allGood = $false
}

# Test 3: npm
Write-Host ""
Write-Host "📦 Testing npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  ✅ npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ npm not found in PATH" -ForegroundColor Red
    $allGood = $false
}

# Test 4: Clarinet
Write-Host ""
Write-Host "🔮 Testing Clarinet..." -ForegroundColor Yellow
try {
    $clarinetVersion = clarinet --version 2>&1
    if ($clarinetVersion -like "*clarinet*" -or $clarinetVersion -like "*version*") {
        Write-Host "  ✅ Clarinet: $clarinetVersion" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Clarinet not working: $clarinetVersion" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "  ❌ Clarinet not found in PATH" -ForegroundColor Red
    $allGood = $false
}

# Test 5: Service Directories
Write-Host ""
Write-Host "📁 Testing Service Directories..." -ForegroundColor Yellow

$services = @(
    @{ Name = "API Server"; Path = "backend\api-server\package.json" },
    @{ Name = "Analysis Engine"; Path = "backend\analysis-engine\src\main.py" },
    @{ Name = "Oracle Service"; Path = "backend\oracle-service\package.json" },
    @{ Name = "Smart Contracts"; Path = "backend\contracts\contracts\genomic-data-storage.clar" }
)

foreach ($service in $services) {
    if (Test-Path $service.Path) {
        Write-Host "  ✅ $($service.Name): Found" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $($service.Name): Missing ($($service.Path))" -ForegroundColor Red
        $allGood = $false
    }
}

# Test 6: Try running a quick command from each service
Write-Host ""
Write-Host "🧪 Testing Quick Commands..." -ForegroundColor Yellow

# Test Python directly
try {
    $pythonTest = python -c "print('Python OK')" 2>&1
    if ($pythonTest -eq "Python OK") {
        Write-Host "  ✅ Python execution: Working" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Python execution: Failed" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "  ❌ Python execution: Error" -ForegroundColor Red
    $allGood = $false
}

# Test Clarinet check (if available)
if (Test-Path "backend\contracts\contracts\genomic-data-storage.clar") {
    try {
        $clarinetCheck = clarinet check backend\contracts\contracts\genomic-data-storage.clar 2>&1
        Write-Host "  ✅ Clarinet check: Attempted" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Clarinet check: Not available yet" -ForegroundColor Yellow
    }
}

# Summary
Write-Host ""
if ($allGood) {
    Write-Host "🎉 All backend tools and services are ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 You can now run:" -ForegroundColor Cyan
    Write-Host "  • start-all-services.bat (to start all services)" -ForegroundColor White
    Write-Host "  • python backend\analysis-engine\src\main.py" -ForegroundColor White
    Write-Host "  • clarinet check backend\contracts\contracts\genomic-data-storage.clar" -ForegroundColor White
    Write-Host "  • npm run dev (in any service directory)" -ForegroundColor White
} else {
    Write-Host "❌ Some issues found. Please:" -ForegroundColor Red
    Write-Host "  1. Run fix-path.ps1 as Administrator" -ForegroundColor White
    Write-Host "  2. Restart your terminal" -ForegroundColor White
    Write-Host "  3. Run this verification script again" -ForegroundColor White
}

Write-Host ""
Write-Host "📋 Service URLs (when running):" -ForegroundColor Cyan
Write-Host "  • API Server: http://localhost:3001" -ForegroundColor White
Write-Host "  • Analysis Engine: http://localhost:8000" -ForegroundColor White
Write-Host "  • Oracle Service: http://localhost:3002" -ForegroundColor White