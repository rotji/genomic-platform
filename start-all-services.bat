@echo off
echo Starting All Genomic Platform Services...
echo.

start "API Server" cmd /k "cd /d C:\Users\PC\Desktop\genomic-platform\backend\api-server && npm run dev"
timeout /t 3 /nobreak > nul

start "Analysis Engine" cmd /k "cd /d C:\Users\PC\Desktop\genomic-platform\backend\analysis-engine && C:\Users\PC\AppData\Local\Programs\Python\Python313\python.exe src\main.py"
timeout /t 3 /nobreak > nul

start "Oracle Service" cmd /k "cd /d C:\Users\PC\Desktop\genomic-platform\backend\oracle-service && npm run dev"

echo All services started in separate windows!
echo.
echo Service URLs:
echo   - API Server: http://localhost:3001
echo   - Analysis Engine: http://localhost:8000  
echo   - Oracle Service: http://localhost:3002
echo.
pause