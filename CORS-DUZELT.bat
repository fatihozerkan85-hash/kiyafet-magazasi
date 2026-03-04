@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   CORS SORUNU COZUMU
echo ========================================
echo.
echo Sorun: Backend CORS policy, frontend URL'sine izin vermiyor
echo Cozum: CORS ayarlari guncellendi - tum Vercel domain'lerine izin
echo.

git add backend/server.js
git commit -m "CORS duzeltildi - tum Vercel domainlerine izin"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Backend otomatik deploy ediliyor...
echo Bekleme suresi: 2-3 dakika
echo.
echo Deploy tamamlandiginda:
echo.
echo 1. https://kiyafet-magazasi.vercel.app acin
echo 2. Ctrl + Shift + Delete (cache temizle)
echo 3. Ctrl + F5 (hard refresh)
echo 4. Kampanyalar ve urunler GORUNMELI! 🎉
echo.
echo Eger hala gorunmuyorsa:
echo - F12 - Console acin
echo - CORS hatasi olmamali
echo - "Kampanyalar yuklendi" mesaji gorunmeli
echo.
pause
