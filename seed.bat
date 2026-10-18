@echo off
echo Seeding MongoDB database with sample data...
echo.
cd /d %~dp0backend
node seed.js
echo.
pause
