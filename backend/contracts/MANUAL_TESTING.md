# 🧪 Manual Clarinet Testing Guide

Since we're having PATH issues with Clarinet, here are the manual commands you can run:

## 🔧 Option 1: Add Clarinet to PATH Permanently

1. **Open System Properties**:
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Click "Environment Variables"
   - Under "System Variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\Program Files\clarinet\bin`
   - Click OK and restart your terminal

2. **Or add to current session**:
   ```powershell
   $env:PATH += ";C:\Program Files\clarinet\bin"
   ```

## 🧪 Option 2: Test Smart Contracts Manually

Navigate to our contracts directory and run these commands:

```powershell
# Navigate to contracts
cd C:\Users\PC\Desktop\genomic-platform\backend\contracts

# Check contract syntax
& "C:\Program Files\clarinet\bin\clarinet.exe" check contracts\genomic-data-storage.clar
& "C:\Program Files\clarinet\bin\clarinet.exe" check contracts\oracle-verification.clar

# Run tests
& "C:\Program Files\clarinet\bin\clarinet.exe" test

# Initialize project (if needed)
& "C:\Program Files\clarinet\bin\clarinet.exe" new genomic-platform

# Start local devnet
& "C:\Program Files\clarinet\bin\clarinet.exe" devnet start
```

## 🚀 What These Commands Do:

1. **`clarinet check`**: Validates Clarity syntax and logic
2. **`clarinet test`**: Runs our test suites
3. **`clarinet devnet start`**: Starts local blockchain for testing

## 🎯 Expected Results:

- ✅ Contract syntax should be valid
- ✅ Tests should pass 
- ✅ Local devnet should start on `http://localhost:8000`

## 🔧 Troubleshooting:

If you see any errors, it's likely because:
1. PATH isn't set correctly (solution above)
2. Terminal needs restart after installation
3. Need to run as Administrator

## 📋 Next Steps After Testing:

Once Clarinet works, we can:
1. Deploy contracts to testnet
2. Test integration with Oracle service
3. Verify blockchain functionality
4. Move to frontend development

Try the PATH option first, then test with these manual commands!