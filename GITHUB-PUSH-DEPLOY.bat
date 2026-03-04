@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 GITHUB PUSH - OTOMATIK DEPLOY
echo ========================================
echo.
echo Bu script dosyaları GitHub'a yükleyecek
echo Vercel otomatik olarak deploy edecek
echo.
pause

echo.
echo ========================================
echo 📦 ADIM 1: Git Add
echo ========================================
git add .
if errorlevel 1 (
    echo ❌ Git add hatası!
    echo Git kurulu mu kontrol edin: git --version
    pause
    exit /b 1
)
echo ✅ Dosyalar hazırlandı

echo.
echo ========================================
echo 💾 ADIM 2: Git Commit
echo ========================================
git commit -m "Admin panel eklendi - admin.html ve admin-tam.html"
if errorlevel 1 (
    echo ⚠️ Commit hatası veya değişiklik yok
    echo Devam ediliyor...
)
echo ✅ Commit tamamlandı

echo.
echo ========================================
echo 🚀 ADIM 3: Git Push
echo ========================================
git push
if errorlevel 1 (
    echo ❌ Push hatası!
    echo GitHub'a erişim var mı kontrol edin
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
echo Vercel Dashboard'dan takip edebilirsiniz:
echo https://vercel.com/dashboard
echo.
echo Deploy tamamlandığında admin panel hazır olacak:
echo https://kiyafet-magazasi.vercel.app/admin-tam.html
echo.
echo ========================================
echo ✅ GITHUB PUSH TAMAMLANDI!
echo ========================================
echo.
echo Şimdi yapmanız gerekenler:
echo 1. Vercel Dashboard'a git: https://vercel.com/dashboard
echo 2. "kiyafet-magazasi-web" projesine tıkla
echo 3. "Deployments" sekmesinde yeni deploy'u gör
echo 4. "Building" → "Ready" olmasını bekle (2-3 dk)
echo 5. Admin panele git: https://kiyafet-magazasi.vercel.app/admin-tam.html
echo.
pause
