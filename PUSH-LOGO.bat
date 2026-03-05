@echo off
echo ========================================
echo LOGO BACKGROUND OLARAK GUNCELLEME
echo ========================================
echo.

git add .
git commit -m "Logo background olarak guncellendi - tam alan kaplama"
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel 2-3 dakika icinde deploy edecek
echo Logo artik header'in tamamini kaplayacak!
echo.
pause
