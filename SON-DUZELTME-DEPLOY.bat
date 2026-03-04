@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   SON DUZELTME - Frontend Yeniden Deploy
echo ========================================
echo.
echo Sorun: Frontend build'de API_URL dogru ayarlanmamis
echo Cozum: Yeni bir commit ile yeniden build tetikliyoruz
echo.

echo // API URL Test > web/src/api-test.txt
git add web/src/api-test.txt
git commit -m "Frontend yeniden build - API URL duzeltmesi"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik olarak frontend'i yeniden build edecek.
echo.
echo 3-5 dakika bekleyin, sonra test edin:
echo.
echo 1. https://kiyafet-magazasi.vercel.app
echo 2. Ctrl + Shift + Delete (cache temizle)
echo 3. Ctrl + F5 (hard refresh)
echo 4. Kampanyalar ve urunler gorunmeli!
echo.
echo Vercel deployment durumu:
echo https://vercel.com/dashboard
echo.
pause
