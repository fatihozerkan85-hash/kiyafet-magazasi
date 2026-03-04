@echo off
echo.
echo ========================================
echo   FINAL DEPLOYMENT - TUM OZELLIKLER
echo ========================================
echo.
echo Yuklenen ozellikler:
echo.
echo ✅ Kampanya Banner Sistemi
echo    - 3 hazir kampanya
echo    - Otomatik gecis (5 saniye)
echo    - Tiklanabilir bannerlar
echo.
echo ✅ Admin Paneli (Ayri Sayfa)
echo    - URL: /admin.html
echo    - Sifre koruması (admin/admin123)
echo    - Kampanya yonetimi
echo    - Session yonetimi
echo.
echo ✅ Kategori Sistemi
echo    - 8 kategori menusu
echo    - Sticky menu
echo    - 14 farkli urun
echo.
echo ✅ Urun Ozellikleri
echo    - 5 yildiz puanlama
echo    - Musteri yorumlari
echo    - Kargo takip sistemi
echo    - Stok durumu
echo    - Urun detay sayfasi
echo.
echo ✅ Kullanici Ozellikleri
echo    - Kayit/Giris sistemi
echo    - Favoriler
echo    - Siparislerim
echo    - Kupon sistemi
echo.
echo ✅ Odeme Sistemi
echo    - iyzico entegrasyonu
echo    - 3 odeme yontemi
echo    - Siparis takibi
echo.
echo ========================================
echo   GitHub'a Yukleniyor...
echo ========================================
echo.

git add -A
git commit -m "FINAL: Tum ozellikler eklendi - Kampanya sistemi, admin paneli, kategoriler, puanlama, yorumlar, kargo takip"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy basliyor...
echo.
echo Bekleme suresi: 3-5 dakika
echo.
echo Deploy tamamlandiginda:
echo 1. Sitenizi acin: https://kiyafet-magazasi.vercel.app
echo 2. Ctrl + F5 ile yenileyin (hard refresh)
echo 3. Tum ozellikleri test edin!
echo.
echo Admin Paneli:
echo - URL: https://kiyafet-magazasi.vercel.app/admin.html
echo - Kullanici: admin
echo - Sifre: admin123
echo.
echo Test Hesabi:
echo - Email: admin@kiyafet.com
echo - Sifre: admin123
echo.
echo Test Kuponlari:
echo - HOSGELDIN (%%10 indirim)
echo - YENISEZON (%%15 indirim)
echo - 50TL (50 TL indirim)
echo.
echo iyzico Test Karti:
echo - Kart: 5528 7900 0000 0008
echo - Tarih: 12/30
echo - CVC: 123
echo.
pause
