# PowerShell 스크립트 - 홈택스 자동 로그인
Write-Host "홈택스 자동 로그인 시작..." -ForegroundColor Green
Set-Location "C:\Users\tip12\Documents\세금계산서"

try {
    & "C:\Python313\python.exe" "hometax_login.py"
} catch {
    Write-Host "오류 발생: $_" -ForegroundColor Red
}

Write-Host "`n완료되었습니다. 아무 키나 누르세요..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")