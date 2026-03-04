@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   BACKEND KONTROL
echo ========================================
echo.
echo Backend'in deploy edilip edilmedigini kontrol ediyoruz...
echo.
echo Backend URL: https://kiyafet-magazasi-backend.vercel.app
echo.
echo Tarayicinizda su URL'leri acin:
echo.
echo 1. Backend Root:
echo    https://kiyafet-magazasi-backend.vercel.app
echo    Beklenen: "Kiyafet Magazasi API calisiyor"
echo.
echo 2. Urunler API:
echo    https://kiyafet-magazasi-backend.vercel.app/api/urunler
echo    Beklenen: JSON array (14 urun)
echo.
echo 3. Kampanyalar API:
echo    https://kiyafet-magazasi-backend.vercel.app/api/kampanyalar
echo    Beklenen: JSON array (3 kampanya)
echo.
echo ========================================
echo.
echo Eger hata aliyorsaniz:
echo.
echo 1. Backend deploy edilmemis olabilir
echo 2. BACKEND-DEPLOY.bat dosyasini calistirin
echo 3. 3-5 dakika bekleyin
echo 4. Tekrar test edin
echo.
echo ========================================
echo.
echo Test sayfasini acmak ister misiniz? (E/H)
set /p choice=Seciminiz: 

if /i "%choice%"=="E" (
    start test-backend-baglanti.html
    echo.
    echo Test sayfasi acildi!
    echo Sonuclari kontrol edin.
)

echo.
pause
