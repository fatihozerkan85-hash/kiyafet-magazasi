@echo off
chcp 65001 >nul
echo ========================================
echo 🎨 BOYNER TARZI TASARIM - DEPLOY
echo ========================================
echo.

echo 📝 Değişiklikler hazır!
echo.
echo ✅ Yapılan güncellemeler:
echo    - Kampanya banner'ları (Boyner tarzı)
echo    - Kategori grid (modern kartlar)
echo    - Ürün grid (premium görünüm)
echo    - Tüm renkler siyah (#000000)
echo.

echo 🚀 GitHub'a yükleniyor...
git add .
git commit -m "Boyner tarzı anasayfa tasarımı eklendi - modern kampanya banner'ları, kategori ve ürün kartları"
git push origin main

echo.
echo ========================================
echo ✅ TAMAMLANDI!
echo ========================================
echo.
echo 📱 Vercel otomatik deploy edecek (1-2 dakika)
echo.
echo 🌐 Sitenizi kontrol edin:
echo    https://kiyafet-magazasi.vercel.app
echo.
echo 💡 Değişiklikleri görmek için:
echo    1. Sayfayı yenileyin (F5)
echo    2. Cache temizleyin (Ctrl+Shift+R)
echo.
pause
