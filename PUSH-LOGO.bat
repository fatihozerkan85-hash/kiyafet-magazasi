@echo off
echo ========================================
echo LOGO PUSH
echo ========================================
echo.

git add .
git commit -m "Logo guncellendi"
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel 2-3 dakika icinde deploy edecek
echo.
pause
