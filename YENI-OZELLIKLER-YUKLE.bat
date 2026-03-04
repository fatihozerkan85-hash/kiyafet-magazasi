@echo off
echo ========================================
echo   YENI OZELLIKLER EKLENDI!
echo ========================================
echo.
echo Eklenen ozellikler:
echo.
echo ✅ Urun Puanlama (5 yildiz sistemi)
echo ✅ Musteri Yorumlari
echo ✅ Kargo Takip Sistemi
echo ✅ Stok Durumu Gosterimi
echo ✅ Urun Detay Sayfasi
echo ✅ Resim Galerisi (4 resim)
echo.
echo ========================================

git add .
git commit -m "Urun puanlama, yorumlar, kargo takip ve stok durumu eklendi"
git push

echo.
echo ========================================
echo   YUKLENDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek.
echo 2-3 dakika bekleyin ve test edin!
echo.
echo Test icin:
echo - Bir urun kartina tiklayin
echo - Urun detay sayfasinda yorum yapin
echo - Yildiz vererek puan verin
echo - Siparislerim sayfasinda kargo takip edin
echo - Stok durumlarini kontrol edin
echo.
pause
