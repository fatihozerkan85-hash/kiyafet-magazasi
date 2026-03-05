@echo off
echo ========================================
echo GUNCEL LOGO PUSH
echo ========================================
echo.

git add web/public/as.png
git commit -m "Guncel logo yuklendi"
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel 2-3 dakika icinde deploy edecek
echo Guncel logo gorunecek!
echo.
pause
