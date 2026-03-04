@echo off
echo.
echo ========================================
echo   TUM OZELLIKLER GITHUB'A YUKLENIYOR
echo ========================================
echo.

git add -A
git commit -m "Kampanya sistemi, admin paneli, kategoriler, puanlama, yorumlar, kargo takip eklendi"
git push origin main

echo.
echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo Vercel'de otomatik deploy basliyor...
echo 2-3 dakika bekleyin.
echo.
echo Sonra sitenizi yenileyin: Ctrl + F5
echo.
pause
