@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   TEK PROJE DEPLOYMENT
echo ========================================
echo.
echo Frontend ve Backend birlikte deploy ediliyor...
echo.
echo Yapilan degisiklikler:
echo ✅ vercel.json olusturuldu (monorepo)
echo ✅ Frontend API URL guncellendi
echo ✅ Admin panel API URL guncellendi
echo ✅ Backend ayni domain'de calısacak
echo.
echo Artik:
echo - Frontend: https://kiyafet-magazasi.vercel.app
echo - Backend: https://kiyafet-magazasi.vercel.app/api/...
echo.
echo Yukleniyor...
echo.

git add -A
git commit -m "Monorepo yapisina gecildi - frontend ve backend tek projede"
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
echo 1. Siteyi acin: https://kiyafet-magazasi.vercel.app
echo 2. Ctrl + Shift + Delete ile cache temizleyin
echo 3. Ctrl + F5 ile yenileyin
echo 4. Kampanyalar ve urunler gorunmeli!
echo.
echo API Endpoints:
echo - https://kiyafet-magazasi.vercel.app/api/urunler
echo - https://kiyafet-magazasi.vercel.app/api/kampanyalar
echo.
echo Admin Panel:
echo - https://kiyafet-magazasi.vercel.app/admin.html
echo - Kullanici: admin
echo - Sifre: admin123
echo.
pause
