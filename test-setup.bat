@echo off
echo ========================================
echo TESTING - Sistem Peminjaman Alat
echo ========================================
echo.

echo [Step 1] Checking PHP...
php --version
if %errorlevel% neq 0 (
    echo ERROR: PHP not found!
    pause
    exit /b 1
)
echo.

echo [Step 2] Checking Composer...
composer --version
if %errorlevel% neq 0 (
    echo ERROR: Composer not found!
    pause
    exit /b 1
)
echo.

echo [Step 3] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)
echo.

echo [Step 4] Checking MySQL Connection...
php artisan migrate:status
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Database not accessible or migrations not run yet.
    echo Running migrations now...
    echo.
    
    echo Creating database...
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS api_peminjaman_alat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
    
    echo Running migrations...
    php artisan migrate --force
    
    echo Seeding database...
    php artisan db:seed --force
)
echo.

echo [Step 5] Clearing caches...
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo.

echo [Step 6] Checking routes...
php artisan route:list
echo.

echo [Step 7] Building assets...
call npm run build
echo.

echo ========================================
echo All checks completed!
echo ========================================
echo.
echo To start the server, run: run-dev.bat
echo Or manually run: php artisan serve
echo.
pause
