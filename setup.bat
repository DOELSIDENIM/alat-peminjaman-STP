@echo off
echo ========================================
echo Setup Sistem Peminjaman Alat
echo ========================================
echo.

REM Check if XAMPP is running
echo [1/7] Checking XAMPP MySQL service...
net start | find "MySQL" >nul
if %errorlevel% neq 0 (
    echo WARNING: MySQL service is not running!
    echo Please start XAMPP Control Panel and start MySQL service.
    echo.
    pause
)

REM Create database
echo [2/7] Creating database...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS api_peminjaman_alat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if %errorlevel% equ 0 (
    echo Database created successfully!
) else (
    echo WARNING: Could not create database. It may already exist or MySQL is not accessible.
)
echo.

REM Clear Laravel caches
echo [3/7] Clearing Laravel caches...
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo.

REM Run migrations
echo [4/7] Running database migrations...
php artisan migrate --force
if %errorlevel% neq 0 (
    echo ERROR: Migration failed!
    pause
    exit /b 1
)
echo.

REM Seed database
echo [5/7] Seeding database...
php artisan db:seed --force
if %errorlevel% neq 0 (
    echo WARNING: Seeding failed or already completed!
)
echo.

REM Optimize application
echo [6/7] Optimizing application...
php artisan optimize
echo.

REM Build assets
echo [7/7] Building frontend assets...
call npm run build
echo.

echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To run the application in development mode:
echo   1. Run: composer run dev
echo      OR
echo   2. Run in separate terminals:
echo      - Terminal 1: php artisan serve
echo      - Terminal 2: npm run dev
echo.
echo The application will be available at:
echo   http://127.0.0.1:8000
echo.
pause
