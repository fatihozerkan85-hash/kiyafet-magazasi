@echo off
echo ========================================
echo   KAMPANYA SISTEMI EKLENDI!
echo ========================================
echo.
echo Eklenen ozellikler:
echo.
echo ✅ Kampanya Banner Sistemi
echo    - Otomatik gecis (5 saniye)
echo    - Buyuk gorsel banner
echo    - Navigasyon noktalari
echo    - Tiklanabilir banner
echo.
echo ✅ Admin Paneli
echo    - Kampanya ekleme
echo    - Kampanya duzenleme
echo    - Kampanya silme
echo    - Aktif/Pasif yapma
echo    - Gorsel onizleme
echo.
echo ✅ 3 Hazir Kampanya
echo    - Yaz Indirimi
echo    - Yeni Sezon Koleksiyonu
echo    - Ucretsiz Kargo
echo.
echo ✅ Backend API'ler
echo    - GET /api/kampanyalar (musteri)
echo    - GET /api/admin/kampanyalar (admin)
echo    - POST /api/admin/kampanya (ekle)
echo    - PUT /api/admin/kampanya/:id (guncelle)
echo    - DELETE /api/admin/kampanya/:id (sil)
echo    - PATCH /api/admin/kampanya/:id/toggle (aktif/pasif)
echo.
echo ========================================

git add .
git commit -m "Kampanya banner sistemi ve admin paneli eklendi"
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
echo 1. Ana sayfada kampanya bannerlarini gorun
echo 2. Admin hesabi ile giris yapin (admin@kiyafet.com / admin123)
echo 3. Header'da "Admin" butonuna tiklayin
echo 4. Yeni kampanya ekleyin
echo 5. Kampanyalari aktif/pasif yapin
echo 6. Ana sayfada degisiklikleri gorun
echo.
pause
