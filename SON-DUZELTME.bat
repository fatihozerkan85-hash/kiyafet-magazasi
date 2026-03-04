@echo off
echo ========================================
echo   SON DUZELTME - VERCEL ICIN
echo ========================================
echo.

git add .
git commit -m "Vercel build duzeltmeleri - CSS ve config"
git push

echo.
echo ========================================
echo   YUKLENDI!
echo ========================================
echo.
echo Simdi Vercel'de MANUEL olarak ayarlayalim:
echo.
echo 1. Vercel dashboard'a git
echo 2. Frontend projesine tikla
echo 3. Settings - General
echo 4. Build Command: npm run build
echo 5. Output Directory: build
echo 6. Install Command: npm install
echo 7. Node.js Version: 18.x
echo 8. Save
echo 9. Deployments - Redeploy
echo.
pause
