@echo off
echo ========================================
echo SEED DATA - PowerShell Method
echo ========================================
echo.
echo Seed data calistiriliyor...
echo.

powershell -Command "try { $response = Invoke-RestMethod -Uri 'https://kiyafet-magazasi-backend.vercel.app/api/admin/seed-data' -Method POST -ContentType 'application/json'; Write-Host ''; Write-Host 'BASARILI!' -ForegroundColor Green; Write-Host ''; Write-Host 'Eklenen Veriler:' -ForegroundColor Yellow; Write-Host 'Kategoriler:' $response.counts.kategoriler; Write-Host 'Kampanyalar:' $response.counts.kampanyalar; Write-Host 'Urunler:' $response.counts.urunler; Write-Host ''; Write-Host 'Simdi test edin: https://aslbutique.com.tr' -ForegroundColor Cyan; } catch { Write-Host ''; Write-Host 'HATA!' -ForegroundColor Red; Write-Host $_.Exception.Message; Write-Host ''; Write-Host 'Deployment henuz tamamlanmamis olabilir.' -ForegroundColor Yellow; Write-Host '1-2 dakika bekleyip tekrar deneyin.'; }"

echo.
echo.
pause
