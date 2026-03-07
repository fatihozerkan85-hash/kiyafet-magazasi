@echo off
echo ========================================
echo VERCEL POSTGRES DEPLOYMENT
echo ========================================
echo.

echo [1/4] Installing PostgreSQL package...
cd backend
call npm install @vercel/postgres
cd ..
echo.

echo [2/4] Adding changes to Git...
git add .
echo.

echo [3/4] Committing changes...
git commit -m "PostgreSQL migration: Vercel Postgres (Neon) integration"
echo.

echo [4/4] Pushing to GitHub (triggers Vercel deploy)...
git push origin main
echo.

echo ========================================
echo DEPLOYMENT STARTED!
echo ========================================
echo.
echo Vercel will automatically:
echo 1. Deploy backend with PostgreSQL
echo 2. Connect to Neon database
echo 3. Initialize tables and seed data
echo.
echo Check deployment status:
echo https://vercel.com/fatihozerkan85-haas-projects/kiyafet-magazasi-backend
echo.
echo After deployment, test:
echo https://kiyafet-magazasi-backend.vercel.app/api/health
echo https://aslbutique.com.tr
echo.
pause
