@echo off
echo ========================================
echo   GITHUB'A YUKLEME
echo ========================================
echo.

REM Git kurulu mu kontrol et
git --version >nul 2>&1
if errorlevel 1 (
    echo HATA: Git kurulu degil!
    echo Git indirin: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git kurulu: OK
echo.

REM Kullanici bilgilerini al
set /p GITHUB_USER="GitHub kullanici adiniz: "
set /p USER_NAME="Adiniz Soyadiniz: "
set /p USER_EMAIL="Email adresiniz: "

echo.
echo ========================================
echo   GIT YAPILANDIRILIYOR...
echo ========================================
echo.

git config --global user.name "%USER_NAME%"
git config --global user.email "%USER_EMAIL%"

echo Git yapilandirildi: OK
echo.

echo ========================================
echo   DOSYALAR HAZIRLANIYOR...
echo ========================================
echo.

git init
git add .
git commit -m "Kiyafet magazasi ilk yukleme"
git branch -M main

echo Dosyalar hazirlandi: OK
echo.

echo ========================================
echo   GITHUB'A BAGLANIYOR...
echo ========================================
echo.

git remote add origin https://github.com/%GITHUB_USER%/kiyafet-magazasi.git

echo.
echo ========================================
echo   GITHUB'A YUKLENIYOR...
echo ========================================
echo.
echo ONEMLI: GitHub sifrenizi veya token'inizi girin!
echo.

git push -u origin main

echo.
echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo Kodunuz GitHub'da:
echo https://github.com/%GITHUB_USER%/kiyafet-magazasi
echo.
echo Simdi Vercel'e deploy edebilirsiniz!
echo.
pause
