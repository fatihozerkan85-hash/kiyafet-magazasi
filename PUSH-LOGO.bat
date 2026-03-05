@echo off
echo ========================================
echo LOGO BOYUTU GUNCELLEME - 440x80px
echo ========================================
echo.

git add .
git commit -m "Logo boyutu 440x80px olarak guncellendi - kirmizi cerceve tam"
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel 2-3 dakika icinde deploy edecek
echo.
pause
