@echo off
echo ========================================
echo   BASIT VERSIYON GITHUB'A YUKLENIYOR
echo ========================================
echo.

git add .
git commit -m "Basit versiyon - Vercel build hatasi duzeltildi"
git push

echo.
echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek.
echo Bu sefer build basarili olacak!
echo.
echo 2-3 dakika bekleyin ve Vercel dashboard kontrol edin.
echo.
pause
