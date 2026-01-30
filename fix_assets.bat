@echo off
echo ========================================
echo Fixing Asset and Logo Issues
echo ========================================
echo.

echo [1/3] Creating storage link...
php artisan storage:link
echo.

echo [2/3] Clearing caches...
php artisan optimize:clear
echo.

echo [3/3] Rebuilding frontend assets...
call npm run build
echo.

echo ========================================
echo Done! Please refresh your browser.
echo ========================================
pause
