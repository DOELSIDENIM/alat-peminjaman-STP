@echo off
echo Starting Laravel Development Server...
echo.
echo The server will start on: http://127.0.0.1:8000
echo Press Ctrl+C to stop the server
echo.

REM Start the Laravel development server
php artisan serve --host=127.0.0.1 --port=8000
