@echo off
echo Tum mavi renkleri siyaha ceviriliyor...

powershell -Command "(Get-Content 'web/src/App.js') -replace '#667eea', '#000000' | Set-Content 'web/src/App.js'"

echo Tamamlandi!
pause
