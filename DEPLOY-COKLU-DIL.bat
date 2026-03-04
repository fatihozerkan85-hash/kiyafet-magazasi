@echo off
echo ========================================
echo COKLU DIL DESTEGI DEPLOY
echo ========================================
echo.
echo Kategori ve Urunlere Coklu Dil Destegi Eklendi
echo.
echo OZELLIKLER:
echo - Kategorilere Ingilizce isim eklendi
echo - Urunlere Ingilizce isim ve aciklama eklendi
echo - Admin panelde Turkce + English form alanlari
echo - Frontend'de dil bazli gosterim
echo.
pause

echo.
echo [1/3] Git add...
git add .

echo.
echo [2/3] Git commit...
git commit -m "Kategori ve urunlere coklu dil destegi eklendi - Turkce ve English"

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
echo TEST ADIMLARI:
echo.
echo 1. ADMIN PANEL TEST:
echo    - Admin panele gir: admin / admin123
echo    - Kategoriler ^> Yeni kategori ekle (Turkce + English)
echo    - Urunler ^> Yeni urun ekle (Turkce + English)
echo.
echo 2. FRONTEND TEST:
echo    - Ana siteye git
echo    - Dil secicide "English" sec
echo    - Kategorilerin Ingilizce oldugunu gor
echo    - Urunlerin Ingilizce oldugunu gor
echo    - "Turkce" sec ve kontrol et
echo.
echo LINKLER:
echo - Ana Site: https://kiyafet-magazasi.vercel.app
echo - Admin Panel: https://kiyafet-magazasi-web-18b6.vercel.app/admin-tam.html
echo.
pause
