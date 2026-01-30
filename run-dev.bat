@echo off
echo ========================================
echo Starting Sistem Peminjaman Alat
echo Development Server
echo ========================================
echo.
echo Starting Laravel server and Vite dev server...
echo.
echo The application will be available at:
echo   http://127.0.0.1:8000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Run the dev command from composer.json
composer run dev
