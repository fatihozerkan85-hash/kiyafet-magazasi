@echo off
echo ========================================
echo   KAMPANYA SISTEMI DEPLOY
echo ========================================
echo.
echo Tum degisiklikler GitHub'a yukleniyor...
echo.

git add .
git commit -m "Kampanya banner sistemi, admin paneli, kategori sistemi ve tum yeni ozellikler eklendi"
git push

echo.
echo ========================================
echo   YUKLENDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek.
echo 2-3 dakika bekleyin!
echo.
echo Sonra siteyi yenileyin (Ctrl + F5)
echo.
echo Gorecekleriniz:
echo - Buyuk kampanya bannerlari (ana sayfa)
echo - Admin butonu (admin girisi sonrasi)
echo - Kategori menusu (sticky)
echo - Urun puanlama ve yorumlar
echo - Kargo takip sistemi
echo - Stok durumu
echo.
pause
