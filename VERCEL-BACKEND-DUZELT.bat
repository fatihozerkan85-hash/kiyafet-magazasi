@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   VERCEL BACKEND DUZELTME
echo ========================================
echo.
echo Yapilan degisiklik:
echo ✅ module.exports = app; eklendi
echo ✅ Vercel serverless function olarak calisacak
echo.
echo GitHub'a yukleniyor...
echo.

git add backend/server.js
git commit -m "Backend Vercel serverless function olarak duzeltildi"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik olarak backend'i yeniden deploy edecek.
echo.
echo 3-5 dakika bekleyin, sonra test edin:
echo.
echo Backend URL:
echo https://kiyafet-magazasi-backend.vercel.app
echo.
echo API Endpoints:
echo https://kiyafet-magazasi-backend.vercel.app/api/urunler
echo https://kiyafet-magazasi-backend.vercel.app/api/kampanyalar
echo.
echo Test:
echo 1. Yukaridaki URL'leri tarayicida acin
echo 2. JSON verileri gorunmeli
echo 3. Sonra frontend'i test edin
echo.
pause
