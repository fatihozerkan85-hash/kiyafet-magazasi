@echo off
echo ========================================
echo   ADIM 1: TAM OZELLIKLER EKLENDI
echo ========================================
echo.
echo Eklenen ozellikler:
echo - Kayit sayfasi
echo - Favoriler sistemi
echo - Kupon sistemi
echo - Odeme sayfasi (3 yontem)
echo - Siparislerim sayfasi
echo.

git add .
git commit -m "Tam ozellikler eklendi - Kayit, Favoriler, Kupon, Odeme"
git push

echo.
echo ========================================
echo   YUKLENDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek.
echo 2-3 dakika bekleyin ve test edin!
echo.
pause
