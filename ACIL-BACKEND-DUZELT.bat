@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   ACIL BACKEND DUZELTME
echo ========================================
echo.
echo Sorun: Kategoriler degiskeni iki kez tanimlandi
echo Cozum: Eski tanim silindi
echo.

git add backend/server.js
git commit -m "ACIL: Kategoriler cift tanim hatasi duzeltildi"
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
echo 1. Backend test edin:
echo    https://kiyafet-magazasi-backend.vercel.app
echo.
echo 2. Frontend test edin:
echo    https://kiyafet-magazasi.vercel.app
echo.
echo 3. Her sey calismali!
echo.
pause
