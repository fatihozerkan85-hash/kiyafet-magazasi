@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   LOCAL TEST - Backend ve Frontend
echo ========================================
echo.
echo Backend ve Frontend'i local'de test ediyoruz...
echo.
echo 1. Backend'i baslat (port 5000)
echo 2. Frontend'i baslat (port 3000)
echo 3. Tarayicida test et
echo.
echo ========================================
echo.

start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start cmd /k "cd web && npm start"

echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Tarayicida acilacak...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo Test:
echo 1. Kampanyalar gorunuyor mu?
echo 2. Urunler gorunuyor mu?
echo 3. Console'da hata var mi? (F12)
echo.
pause
