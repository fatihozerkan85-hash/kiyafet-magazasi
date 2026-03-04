@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   ACIL DUZELTME - Backend Baglantisi
echo ========================================
echo.
echo Sorun: Kampanyalar ve urunler yuklenmiyor
echo Cozum: Backend URL duzeltildi
echo.
echo Yukleniyor...
echo.

git add web/src/App.js
git commit -m "ACIL: Backend URL duzeltildi - kampanyalar ve urunler yuklenecek"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy basliyor...
echo Bekleme suresi: 2-3 dakika
echo.
echo Deploy tamamlandiginda:
echo.
echo 1. Siteyi acin: https://kiyafet-magazasi.vercel.app
echo 2. Ctrl + Shift + Delete ile cache temizleyin
echo 3. Ctrl + F5 ile yenileyin (hard refresh)
echo 4. Kampanyalar ve urunler gorunmeli!
echo.
echo Sorun devam ederse:
echo - F12 basin
echo - Console sekmesine bakin
echo - Network sekmesinde API cagrilarini kontrol edin
echo.
pause
