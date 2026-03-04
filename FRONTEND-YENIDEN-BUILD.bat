@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   FRONTEND YENIDEN BUILD
echo ========================================
echo.
echo API config dosyasi eklendi.
echo Frontend yeniden build edilecek.
echo.

git add web/src/api-config.js
git commit -m "API config dosyasi eklendi - frontend yeniden build"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik build basliyor...
echo Bekleme suresi: 3-5 dakika
echo.
echo Build tamamlandiginda:
echo.
echo 1. https://kiyafet-magazasi.vercel.app acin
echo 2. Ctrl + Shift + Delete (cache temizle)
echo 3. Ctrl + F5 (hard refresh)
echo 4. F12 - Console'u acin
echo 5. "API_URL configured:" mesajini gorun
echo 6. Kampanyalar ve urunler gorunmeli!
echo.
echo Deployment durumu:
echo https://vercel.com/dashboard
echo.
pause
