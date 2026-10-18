@echo off
echo ============================================
echo   Springfield School Website — Launcher
echo ============================================
echo.

echo [1/2] Starting Backend API Server (port 5000)...
start "Backend - School API" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Dev Server (port 3000)...
start "Frontend - School Website" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo  - Frontend: http://localhost:3000
echo  - Backend:  http://localhost:5000
echo  - Admin:    http://localhost:3000/admin
echo.
echo Admin credentials: admin / admin123
echo.
pause
