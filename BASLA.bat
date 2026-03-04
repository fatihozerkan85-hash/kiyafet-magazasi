@echo off
echo ========================================
echo   KIYAFET MAGAZASI - BASLAT
echo ========================================
echo.
echo Backend ve Frontend baslatiliyor...
echo.

cd backend
start cmd /k "echo Backend baslatiliyor... && node server.js"

timeout /t 3 /nobreak > nul

cd ../web
start cmd /k "echo Frontend baslatiliyor... && npm start"

echo.
echo ========================================
echo   BASLATILDI!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Test Hesabi:
echo Email: admin@kiyafet.com
echo Sifre: admin123
echo.
echo Kuponlar: HOSGELDIN, YENISEZON, 50TL
echo.
pause
