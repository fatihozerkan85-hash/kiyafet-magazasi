@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   KATEGORI API'LERI DEPLOY
echo ========================================
echo.
echo Backend'e eklenen ozellikler:
echo.
echo ✅ Kategoriler array'i (8 kategori)
echo ✅ GET /api/kategoriler
echo ✅ GET /api/admin/kategoriler
echo ✅ POST /api/admin/kategori
echo ✅ PUT /api/admin/kategori/:id
echo ✅ DELETE /api/admin/kategori/:id
echo ✅ PATCH /api/admin/kategori/:id/toggle
echo.
echo GitHub'a yukleniyor...
echo.

git add backend/server.js
git commit -m "Kategori yonetimi API'leri eklendi"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Backend otomatik deploy ediliyor...
echo Bekleme suresi: 2-3 dakika
echo.
echo Deploy tamamlandiginda test edin:
echo.
echo 1. Kategoriler:
echo    https://kiyafet-magazasi-backend.vercel.app/api/kategoriler
echo.
echo 2. Admin Kategoriler:
echo    https://kiyafet-magazasi-backend.vercel.app/api/admin/kategoriler
echo.
echo Beklenen: 8 kategori JSON array
echo.
echo Sonraki adim: Admin paneline kategori yonetimi ekle
echo.
pause
