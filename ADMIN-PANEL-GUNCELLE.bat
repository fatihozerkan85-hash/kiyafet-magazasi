@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 ADMIN PANEL GÜNCELLEME
echo ========================================
echo.
echo Admin panele yeni özellikler eklendi:
echo ✅ Kategori ekleme/silme/aktif-pasif
echo ✅ Ürün ekleme/silme
echo ✅ Kupon oluşturma
echo.
pause

echo.
echo ========================================
echo 📦 ADIM 1: Git Add
echo ========================================
git add -A
if errorlevel 1 (
    echo ❌ Git add hatası!
    pause
    exit /b 1
)
echo ✅ Dosyalar hazırlandı

echo.
echo ========================================
echo 💾 ADIM 2: Git Commit
echo ========================================
git commit -m "Admin panel güncellendi - Kategori, Ürün ve Kupon yönetimi eklendi"
if errorlevel 1 (
    echo ⚠️ Commit hatası veya değişiklik yok
)
echo ✅ Commit tamamlandı

echo.
echo ========================================
echo 🚀 ADIM 3: Git Push
echo ========================================
git push
if errorlevel 1 (
    echo ❌ Push hatası!
    pause
    exit /b 1
)
echo ✅ GitHub'a yüklendi!

echo.
echo ========================================
echo ⏳ ADIM 4: Vercel Deploy Bekleniyor
echo ========================================
echo.
echo Vercel otomatik olarak deploy edecek...
echo Bu işlem 2-3 dakika sürer.
echo.
echo Vercel Dashboard: https://vercel.com/dashboard
echo.
echo Deploy tamamlandığında admin panel güncellenecek:
echo https://kiyafet-magazasi-web-18b6.vercel.app/admin-tam.html
echo.
echo ========================================
echo ✅ GÜNCELLEME TAMAMLANDI!
echo ========================================
echo.
echo Yeni Özellikler:
echo.
echo 📁 KATEGORİ YÖNETİMİ:
echo   - Yeni kategori ekleme
echo   - Kategori silme
echo   - Aktif/Pasif yapma
echo.
echo 🛍️ ÜRÜN YÖNETİMİ:
echo   - Yeni ürün ekleme
echo   - Ürün silme
echo   - Resim, fiyat, stok yönetimi
echo.
echo 🎟️ KUPON YÖNETİMİ:
echo   - Yeni kupon oluşturma
echo   - Yüzde veya sabit indirim
echo   - Kupon listesi
echo.
echo Deploy bitince admin panele girin ve test edin!
echo.
pause
