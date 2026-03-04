@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 YENİ ÖZELLİKLER DEPLOYMENT
echo ========================================
echo.
echo 4 Yeni Özellik Eklendi:
echo ✅ 📸 Resim Upload Sistemi
echo ✅ 📦 Sipariş Durumu Güncelleme
echo ✅ 📧 Email Bildirimleri
echo ✅ 📱 SMS Entegrasyonu
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
git commit -m "Yeni özellikler eklendi: Resim upload, Sipariş yönetimi, Email ve SMS bildirimleri"
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
echo Deploy tamamlandığında yeni özellikler hazır olacak!
echo.
echo ========================================
echo ✅ DEPLOYMENT BAŞLATILDI!
echo ========================================
echo.
echo 📋 YENİ ÖZELLİKLER:
echo.
echo 1. 📸 RESİM UPLOAD SİSTEMİ
echo    - Bilgisayardan resim yükleme
echo    - Otomatik önizleme
echo    - Max 2MB boyut kontrolü
echo.
echo 2. 📦 SİPARİŞ DURUMU GÜNCELLEME
echo    - 6 farklı durum
echo    - Kargo takip entegrasyonu
echo    - Durum geçmişi
echo.
echo 3. 📧 EMAIL BİLDİRİMLERİ
echo    - Otomatik email gönderimi
echo    - Sipariş durumu bildirimleri
echo    - Email şablonları
echo.
echo 4. 📱 SMS ENTEGRASYONU
echo    - Otomatik SMS gönderimi
echo    - Sipariş durumu bildirimleri
echo    - Netgsm/İletimerkezi desteği
echo.
echo ========================================
echo 🎯 KULLANIM
echo ========================================
echo.
echo Admin Panel: https://kiyafet-magazasi-web-18b6.vercel.app/admin-tam.html
echo Giriş: admin / admin123
echo.
echo Deploy bitince:
echo 1. Ürünler → Resim yükle
echo 2. Siparişler → Durum güncelle
echo 3. Email ve SMS otomatik gönderilir
echo.
echo Detaylı kullanım: YENİ-ÖZELLİKLER-KULLANIM.md
echo.
pause
