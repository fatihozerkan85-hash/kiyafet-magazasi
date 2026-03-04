@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   DEBUG DEPLOYMENT
echo ========================================
echo.
echo Console.log eklendi - API_URL debug
echo.

git add web/src/App.js
git commit -m "Debug: API_URL console.log eklendi"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo 3-5 dakika bekleyin, sonra:
echo.
echo 1. https://kiyafet-magazasi.vercel.app acin
echo 2. Ctrl + Shift + Delete (cache temizle)
echo 3. Ctrl + F5 (hard refresh)
echo 4. F12 - Console acin
echo 5. "API_URL:" ve "Hostname:" mesajlarini gorun
echo.
echo Eger API_URL yanlis ise, sorunu buluruz!
echo.
pause
