@echo off
echo ========================================
echo LOGO DOSYASI GUNCELLEME VE PUSH
echo ========================================
echo.

echo [1/3] Git add...
git add .

echo.
echo [2/3] Git commit...
git commit -m "Logo dosyasi as.png olarak guncellendi"

echo.
echo [3/3] Git push...
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek (2-3 dakika)
echo.
pause
