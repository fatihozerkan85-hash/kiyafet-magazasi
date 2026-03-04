@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   TAM OZELLIKLI ADMIN PANELI
echo ========================================
echo.
echo Eklenen ozellikler:
echo.
echo ✅ Sekme Sistemi
echo    - Dashboard
echo    - Kampanyalar
echo    - Urunler
echo    - Kategoriler
echo    - Siparisler
echo    - Kuponlar
echo.
echo ✅ Urun Yonetimi
echo    - Urun ekleme (resimler, fiyat, stok)
echo    - Urun duzenleme
echo    - Urun silme
echo    - Coklu resim yukleme
echo.
echo ✅ Kategori Yonetimi
echo    - Kategori ekleme (emoji dahil)
echo    - Kategori duzenleme
echo    - Kategori silme
echo.
echo ✅ Siparis Yonetimi
echo    - Siparis listesi
echo    - Durum guncelleme
echo    - Kargo takip
echo.
echo ✅ Kupon Yonetimi
echo    - Kupon olusturma
echo    - Indirim ayarlama
echo.
echo ========================================
echo.
echo GitHub'a yukleniyor...
echo.

git add web/public/admin.html backend/server.js
git commit -m "Tam ozellikli admin paneli eklendi - urun, kategori, siparis yonetimi"
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
echo Admin Panel: https://kiyafet-magazasi.vercel.app/admin.html
echo Kullanici: admin
echo Sifre: admin123
echo.
echo Yeni Ozellikler:
echo - Urun ekleme/duzenleme/silme
echo - Kategori yonetimi
echo - Siparis takibi
echo - Kupon yonetimi
echo.
pause
