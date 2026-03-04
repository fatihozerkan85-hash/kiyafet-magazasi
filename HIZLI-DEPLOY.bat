@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   ADMIN GIRIS SISTEMI - DEPLOY
echo ========================================
echo.
echo Yukleniyor...
echo.

git add -A
git commit -m "Admin giris sistemi eklendi - sifre koruması (admin/admin123)"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy basliyor...
echo Bekleme suresi: 3-5 dakika
echo.
echo Deploy tamamlandiginda:
echo.
echo 1. Admin panelini acin:
echo    https://kiyafet-magazasi.vercel.app/admin.html
echo.
echo 2. Ctrl + F5 ile yenileyin (hard refresh)
echo.
echo 3. Giris yapin:
echo    Kullanici: admin
echo    Sifre: admin123
echo.
echo 4. Kampanya yonetimini test edin!
echo.
echo ========================================
echo.
pause
