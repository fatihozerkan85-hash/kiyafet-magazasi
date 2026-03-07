@echo off
echo ========================================
echo ACIL SEED DATA FIX
echo ========================================
echo.

echo [1/3] Git commit...
git add backend/server.js
git commit -m "Add manual seed data endpoint for emergency fix"
echo.

echo [2/3] Push to GitHub...
git push origin main
echo.

echo [3/3] Deployment baslatildi!
echo.
echo Vercel deployment tamamlaninca (1-2 dakika):
echo.
echo Seed data'yi manuel calistirmak icin:
echo https://kiyafet-magazasi-backend.vercel.app/api/admin/seed-data
echo.
echo Bu URL'i tarayicida POST request olarak cagirin
echo veya asagidaki HTML dosyasini kullanin:
echo SEED-DATA-TRIGGER.html
echo.
pause
