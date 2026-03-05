@echo off
echo ========================================
echo YENİ LOGO PUSH
echo ========================================
echo.

echo [1/3] Git add...
git add web/public/as.png
git add web/src/App.js

echo.
echo [2/3] Git commit...
git commit -m "Yeni logo guncellendi - as.png"

echo.
echo [3/3] Git push...
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek (2-3 dakika)
echo Site: https://kiyafet-magazasi-web.vercel.app
echo.
pause
