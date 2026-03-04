@echo off
echo ========================================
echo YENİ ÖZELLİKLER DEPLOY SCRIPTI
echo ========================================
echo.
echo Bu script yeni özellikleri GitHub'a push edecek
echo Vercel otomatik olarak deploy edecek
echo.
echo Eklenen Özellikler:
echo - Gelişmiş Raporlama (Satış, En Çok Satanlar, Kategori, Gelir Grafiği)
echo - Müşteri Segmentasyonu (VIP, Sadık, Yeni, Pasif)
echo - Çoklu Dil Desteği (Türkçe, English)
echo.
pause

echo.
echo [1/3] Git add...
git add .

echo.
echo [2/3] Git commit...
git commit -m "Gelişmiş raporlama, müşteri segmentasyonu ve çoklu dil desteği eklendi"

echo.
echo [3/3] Git push...
git push origin main

echo.
echo ========================================
echo DEPLOY TAMAMLANDI!
echo ========================================
echo.
echo Vercel otomatik deploy edecek (1-2 dakika)
echo.
echo LINKLER:
echo - Ana Site: https://kiyafet-magazasi.vercel.app
echo - Admin Panel: https://kiyafet-magazasi-web-18b6.vercel.app/admin-tam.html
echo - Backend: https://kiyafet-magazasi-backend.vercel.app
echo.
echo YENİ ÖZELLİKLER:
echo 1. Admin Panel ^> Raporlar sekmesi
echo 2. Admin Panel ^> Kullanıcılar (Segmentasyon)
echo 3. Ana Site ^> Header'da dil seçici
echo.
pause
