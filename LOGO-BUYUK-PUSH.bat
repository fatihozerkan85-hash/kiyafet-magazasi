@echo off
echo ========================================
echo BUYUK LOGO PUSH - 3000x600px
echo ========================================
echo.

git add web/public/as.png
git commit -m "Logo 3000x600px buyuk versiyon"
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel 2-3 dakika icinde deploy edecek
echo Logo artik BUYUK gorunecek!
echo.
pause
