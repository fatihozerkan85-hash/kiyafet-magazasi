@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 HIZLI DEPLOY
echo ========================================
echo.

echo 📝 Git durumu kontrol ediliyor...
git status

echo.
echo ========================================
echo 💡 MANUEL ADIMLAR:
echo ========================================
echo.
echo 1. Aşağıdaki komutları sırayla çalıştırın:
echo.
echo    git add .
echo    (Sorulan soruya "A" yanıtını verin)
echo.
echo    git commit -m "Boyner tarzı kategori menüsü - sade tasarım"
echo.
echo    git push origin main
echo.
echo 2. Vercel otomatik deploy edecek (1-2 dakika)
echo.
echo 3. Sitenizi kontrol edin:
echo    https://kiyafet-magazasi.vercel.app
echo.
pause
