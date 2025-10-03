# 🚀 Deployment Script for Genomic Platform Smart Contracts

Write-Host "🧬 Deploying Genomic Platform Smart Contracts" -ForegroundColor Green
Write-Host ""

# Check if Clarinet is installed
try {
    $clarinetVersion = clarinet --version
    Write-Host "✅ Clarinet version: $clarinetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Clarinet not installed. Please install Clarinet first." -ForegroundColor Red
    Write-Host "See INSTALL_CLARINET.md for instructions." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🔧 Setting up development environment..." -ForegroundColor Yellow

# Initialize Clarinet project (if not already done)
if (-not (Test-Path "Clarinet.toml")) {
    Write-Host "Initializing Clarinet project..." -ForegroundColor Yellow
    clarinet new .
} else {
    Write-Host "✅ Clarinet project already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "🧪 Running contract checks..." -ForegroundColor Yellow

# Check contract syntax
Write-Host "Checking genomic-data-storage contract..." -ForegroundColor Cyan
clarinet check contracts/genomic-data-storage.clar

Write-Host "Checking oracle-verification contract..." -ForegroundColor Cyan  
clarinet check contracts/oracle-verification.clar

Write-Host ""
Write-Host "🧪 Running tests..." -ForegroundColor Yellow

# Run tests
clarinet test

Write-Host ""
Write-Host "🌐 Starting local devnet..." -ForegroundColor Yellow

# Start devnet (this will run in background)
Write-Host "Starting Stacks devnet for local testing..." -ForegroundColor Cyan
Write-Host "This will start a local blockchain environment." -ForegroundColor White
Write-Host ""
Write-Host "Available accounts:" -ForegroundColor Cyan
Write-Host "- Deployer: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" -ForegroundColor White
Write-Host "- Oracle1:  ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5" -ForegroundColor White
Write-Host "- Oracle2:  ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG" -ForegroundColor White
Write-Host "- Oracle3:  ST2JHG361ZXG51QTQAVCW0LQSGTH23STD0SRS3CV7" -ForegroundColor White
Write-Host "- User1:    ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND" -ForegroundColor White
Write-Host "- User2:    ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Green
Write-Host "1. Run: clarinet devnet start" -ForegroundColor White
Write-Host "2. Open browser to http://localhost:8000 for Stacks explorer" -ForegroundColor White
Write-Host "3. Deploy contracts to testnet when ready" -ForegroundColor White
Write-Host "4. Integrate with Oracle service at localhost:3002" -ForegroundColor White
Write-Host ""