@echo off
echo ========================================
echo LOGO BOYUTU DUZELTME - COVER MODE
echo ========================================
echo.

git add .
git commit -m "Logo boyutu duzeltildi - objectFit cover ile tam cerceve"
git push origin main

echo.
echo ========================================
echo TAMAMLANDI!
echo ========================================
echo.
echo Vercel 2-3 dakika icinde deploy edecek
echo Logo artik kirmizi cerceveyi tam kaplayacak!
echo.
pause
