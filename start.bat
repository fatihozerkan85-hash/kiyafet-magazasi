@echo off
echo ================================
echo KIYAFET MAGAZASI BASLATILIYOR
echo ================================
echo.

echo [1/3] Backend sunucu baslatiliyor...
start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul

echo [2/3] Web uygulamasi baslatiliyor...
start cmd /k "cd web && npm start"

echo.
echo ================================
echo TAMAMLANDI!
echo ================================
echo.
echo Backend: http://localhost:5000
echo Web: http://localhost:3000
echo.
echo Kapatmak icin acilan pencereleri kapatabilirsiniz.
pause
