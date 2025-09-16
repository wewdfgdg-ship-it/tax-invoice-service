@echo off
chcp 65001 >nul
echo Hometax Auto Login Starting...
cd /d "C:\Users\tip12\Documents\세금계산서"
"C:\Python313\python.exe" hometax_login.py
if %errorlevel% neq 0 (
    echo.
    echo Error occurred!
    echo Please check Python installation.
)
pause