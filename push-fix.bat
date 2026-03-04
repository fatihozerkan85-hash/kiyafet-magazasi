@echo off
echo ========================================
echo   ESLint Hatalari Duzeltiliyor...
echo ========================================
echo.

git add .
git commit -m "ESLint hatalari duzeltildi - React import ve onKeyPress"
git push

echo.
echo ========================================
echo   YUKLENDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek.
echo 2-3 dakika bekleyin ve test edin!
echo.
echo Frontend URL: https://kiyafet-magazasi.vercel.app
echo.
pause
