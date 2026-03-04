@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   BACKEND VE FRONTEND AYRI DEPLOY
echo ========================================
echo.
echo Degisiklikler:
echo ✅ Backend root endpoint eklendi
echo ✅ Frontend API URL guncellendi (backend URL)
echo ✅ Admin panel API URL guncellendi
echo ✅ Root vercel.json silindi
echo.
echo Simdi yapmaniz gerekenler:
echo.
echo ========================================
echo   ADIM 1: BACKEND DEPLOY (Vercel Dashboard)
echo ========================================
echo.
echo 1. https://vercel.com/dashboard adresine gidin
echo 2. "Add New" - "Project" tiklayin
echo 3. GitHub repository'nizi secin: kiyafet-magazasi
echo 4. Configure Project:
echo    - Project Name: kiyafet-magazasi-backend
echo    - Framework: Other
echo    - Root Directory: backend (ONEMLI!)
echo    - Build Command: Bos birakin
echo 5. "Deploy" butonuna tiklayin
echo 6. Deploy tamamlaninca URL'yi kopyalayin
echo.
echo Beklenen URL:
echo https://kiyafet-magazasi-backend.vercel.app
echo.
echo ========================================
echo   ADIM 2: FRONTEND DEPLOY (Otomatik)
echo ========================================
echo.
echo Frontend'i GitHub'a yukleyelim:
echo.

git add -A
git commit -m "Backend ayri deploy icin hazir - root endpoint eklendi"
git push origin main

echo.
echo ========================================
echo   YUKLEME TAMAMLANDI!
echo ========================================
echo.
echo Simdi:
echo.
echo 1. Vercel dashboard'da backend'i deploy edin (yukaridaki adimlar)
echo 2. 3-5 dakika bekleyin
echo 3. Backend URL'sini test edin:
echo    https://kiyafet-magazasi-backend.vercel.app/api/urunler
echo.
echo 4. Frontend otomatik deploy olacak (GitHub push)
echo 5. 3-5 dakika bekleyin
echo 6. Frontend'i test edin:
echo    https://kiyafet-magazasi.vercel.app
echo.
echo 7. Cache temizleyin: Ctrl + Shift + Delete
echo 8. Hard refresh: Ctrl + F5
echo.
echo Detayli rehber: BACKEND-AYRI-DEPLOY.md
echo.
pause
