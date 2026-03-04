@echo off
echo ========================================
echo ADMIN PANEL ERISIM TESTI
echo ========================================
echo.
echo Ana Site: https://kiyafet-magazasi.vercel.app
echo Admin Panel: https://kiyafet-magazasi.vercel.app/admin.html
echo Backend: https://kiyafet-magazasi-backend.vercel.app
echo.
echo ========================================
echo COZUM:
echo ========================================
echo.
echo Admin paneline erisim icin:
echo 1. Frontend'i yeniden deploy etmemiz gerekiyor
echo 2. admin.html dosyasi public klasorunde mevcut
echo 3. React build sonrasi build/admin.html olarak kopyalanmali
echo.
echo Simdi frontend'i yeniden deploy ediyorum...
echo.
pause

cd web
echo Frontend deploy ediliyor...
call vercel --prod
echo.
echo ========================================
echo DEPLOY TAMAMLANDI!
echo ========================================
echo.
echo Admin paneline giris bilgileri:
echo Kullanici: admin
echo Sifre: admin123
echo.
echo Admin Panel URL: https://kiyafet-magazasi.vercel.app/admin.html
echo.
pause
