@echo off
echo EXE 파일 생성 중...
cd /d "C:\Users\tip12\Documents\세금계산서"
pyinstaller --onefile --noconsole --name "홈택스자동로그인" hometax_login.py
echo.
echo EXE 파일이 dist 폴더에 생성되었습니다!
pause