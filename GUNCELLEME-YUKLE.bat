@echo off
echo ========================================
echo   DEGISIKLIKLERI GITHUB'A YUKLE
echo ========================================
echo.

git add .
git commit -m "Package.json duzeltildi - Vercel icin"
git push

echo.
echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik olarak yeniden deploy edecek.
echo 1-2 dakika bekleyin ve Vercel dashboard'u kontrol edin.
echo.
pause
