@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 ADMIN PANEL DEPLOY
echo ========================================
echo.
echo Bu script admin panelini deploy edecek
echo.
echo Adımlar:
echo 1. Frontend build
echo 2. Vercel'e deploy
echo 3. Admin panel erişim testi
echo.
pause

echo.
echo ========================================
echo 📦 ADIM 1: Frontend Build
echo ========================================
cd web
echo Frontend build ediliyor...
call npm run build
if errorlevel 1 (
    echo ❌ Build hatası!
    pause
    exit /b 1
)
echo ✅ Build tamamlandı!

echo.
echo ========================================
echo 🚀 ADIM 2: Vercel Deploy
echo ========================================
echo Frontend deploy ediliyor...
call vercel --prod
if errorlevel 1 (
    echo ❌ Deploy hatası!
    pause
    exit /b 1
)
echo ✅ Deploy tamamlandı!

cd ..

echo.
echo ========================================
echo ✅ DEPLOY BAŞARILI!
echo ========================================
echo.
echo 🌐 Ana Site: https://kiyafet-magazasi.vercel.app
echo 🔐 Admin Panel: https://kiyafet-magazasi.vercel.app/admin.html
echo 📊 Tam Admin Panel: https://kiyafet-magazasi.vercel.app/admin-tam.html
echo.
echo ========================================
echo 🔑 GİRİŞ BİLGİLERİ
echo ========================================
echo Kullanıcı Adı: admin
echo Şifre: admin123
echo.
echo ========================================
echo 📋 ADMIN PANEL ÖZELLİKLERİ
echo ========================================
echo.
echo admin.html (Basit):
echo   ✅ Kampanya Yönetimi
echo.
echo admin-tam.html (Tam Özellikli):
echo   ✅ Dashboard (İstatistikler)
echo   ✅ Kampanya Yönetimi
echo   ✅ Ürün Listesi
echo   ✅ Kategori Listesi
echo   ✅ Sipariş Listesi
echo   ✅ Kullanıcı Listesi
echo   ✅ Kupon Listesi
echo.
echo ========================================
echo 💡 İPUCU
echo ========================================
echo Browser cache'i temizleyin (Ctrl+Shift+Delete)
echo veya Incognito modda açın
echo.
pause
