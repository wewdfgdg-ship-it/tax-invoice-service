@echo off
echo ============================================
echo Python 및 환경 테스트
echo ============================================
echo.
echo 1. Python 버전 확인:
"C:\Python313\python.exe" --version
echo.
echo 2. 현재 디렉토리:
cd
echo.
echo 3. 파일 목록:
dir *.py
echo.
echo 4. 필수 패키지 확인:
"C:\Python313\python.exe" -c "import selenium; print('Selenium OK')"
"C:\Python313\python.exe" -c "from dotenv import load_dotenv; print('Dotenv OK')"
"C:\Python313\python.exe" -c "import webdriver_manager; print('Webdriver Manager OK')"
echo.
echo 5. .env 파일 확인:
if exist .env (echo .env 파일 있음) else (echo .env 파일 없음!)
echo.
echo ============================================
echo 테스트 완료. 문제가 있으면 확인하세요.
echo ============================================
pause