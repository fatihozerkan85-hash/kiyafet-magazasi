@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   BACKEND DEPLOY - Kampanya Sorunu
echo ========================================
echo.
echo Sorun: Backend'e ulasilamiyor
echo Cozum: Backend'i yeniden deploy ediyoruz
echo.

cd backend

echo.
echo Backend dosyalari yukleniyor...
echo.

git add .
git commit -m "Backend yeniden deploy - kampanya ve urun API'leri"
git push origin main

cd ..

echo.
echo ========================================
echo   BACKEND DEPLOY TAMAMLANDI!
echo ========================================
echo.
echo Simdi frontend'i de guncelleyelim...
echo.

git add web/src/App.js
git commit -m "Frontend backend baglantisi guncellendi"
git push origin main

echo.
echo ========================================
echo   TUM DEPLOYMENT TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy basliyor...
echo Bekleme suresi: 3-5 dakika
echo.
echo Test icin:
echo 1. test-backend-baglanti.html dosyasini acin
echo 2. Backend testini yapin
echo 3. Sonra siteyi test edin
echo.
echo Backend URL:
echo https://kiyafet-magazasi-backend.vercel.app
echo.
echo Frontend URL:
echo https://kiyafet-magazasi.vercel.app
echo.
pause
