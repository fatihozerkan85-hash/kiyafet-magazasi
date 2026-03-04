@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   ADMIN PANEL 404 DUZELTME
echo ========================================
echo.
echo Sorun: admin.html dosyasi bulunamiyor (404)
echo Cozum: Frontend yeniden deploy ediliyor
echo.

echo // Admin panel fix > web/public/admin-fix.txt
git add web/public/admin-fix.txt web/public/admin.html
git commit -m "Admin panel 404 duzeltme - frontend yeniden deploy"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Frontend otomatik deploy ediliyor...
echo Bekleme suresi: 3-5 dakika
echo.
echo Deploy tamamlandiginda:
echo.
echo 1. Admin paneli acin:
echo    https://kiyafet-magazasi.vercel.app/admin.html
echo.
echo 2. Cache temizleyin: Ctrl + Shift + Delete
echo 3. Hard refresh: Ctrl + F5
echo.
echo Giris bilgileri:
echo Kullanici: admin
echo Sifre: admin123
echo.
pause
