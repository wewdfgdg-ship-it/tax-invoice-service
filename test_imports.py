#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
홈택스 로그인 스크립트 디버깅용 테스트 파일
필수 라이브러리들이 제대로 설치되어 있는지 확인
"""

import sys
import os

def test_imports():
    """필수 라이브러리 임포트 테스트"""
    print("라이브러리 임포트 테스트 시작...")
    print("=" * 50)
    
    # 1. 기본 라이브러리 테스트
    try:
        import time
        print("OK time 모듈")
    except ImportError as e:
        print(f"FAIL time 모듈: {e}")
        
    # 2. Selenium 테스트
    try:
        import selenium
        print(f"OK selenium 버전: {selenium.__version__}")
        
        from selenium import webdriver
        print("OK selenium.webdriver")
        
        from selenium.webdriver.common.by import By
        print("OK selenium By")
        
        from selenium.webdriver.support.ui import WebDriverWait
        print("OK selenium WebDriverWait")
        
        from selenium.webdriver.support import expected_conditions as EC
        print("OK selenium expected_conditions")
        
        from selenium.webdriver.chrome.options import Options
        print("OK selenium Chrome Options")
        
        from selenium.common.exceptions import TimeoutException, NoSuchElementException
        print("OK selenium exceptions")
        
    except ImportError as e:
        print(f"FAIL Selenium 라이브러리: {e}")
        print("해결방법: pip install selenium")
        return False
    
    # 3. dotenv 테스트
    try:
        from dotenv import load_dotenv
        print("OK python-dotenv")
    except ImportError as e:
        print(f"FAIL python-dotenv: {e}")
        print("해결방법: pip install python-dotenv")
        return False
    
    # 4. .env 파일 테스트
    try:
        load_dotenv()
        pw = os.getenv('pw')
        if pw:
            print(f"OK .env 파일에서 비밀번호 로드 성공 (****{pw[-2:] if len(pw) > 2 else '**'})")
        else:
            print("WARN .env 파일에 'pw' 값이 없습니다")
            print(".env 파일에 다음과 같이 추가하세요: pw=your_password")
    except Exception as e:
        print(f"FAIL .env 파일 로드: {e}")
    
    # 5. Chrome 드라이버 기본 테스트
    try:
        options = Options()
        options.add_argument("--headless")  # 헤드리스 모드로 빠른 테스트
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        
        print("Chrome 드라이버 테스트 중...")
        driver = webdriver.Chrome(options=options)
        driver.get("https://www.google.com")
        print("OK Chrome 드라이버 작동")
        driver.quit()
        
    except Exception as e:
        print(f"FAIL Chrome 드라이버: {e}")
        print("해결방법:")
        print("   1. Chrome 브라우저 설치 확인")
        print("   2. Chrome 브라우저 업데이트")
        print("   3. 또는 pip install webdriver-manager 후 코드 수정")
        return False
    
    print("\n모든 테스트 통과!")
    print("홈택스 로그인 스크립트 실행 준비 완료")
    return True

def main():
    """메인 함수"""
    print("홈택스 로그인 스크립트 환경 테스트")
    print(f"Python 버전: {sys.version}")
    print(f"현재 디렉토리: {os.getcwd()}")
    print()
    
    try:
        if test_imports():
            print("\n이제 'python hometax_login.py' 실행하세요!")
        else:
            print("\n문제가 있습니다. 위의 해결방법을 따라해주세요.")
            
    except Exception as e:
        print(f"\n예상치 못한 오류: {e}")
        import traceback
        traceback.print_exc()
    
    input("\nEnter를 눌러 종료하세요...")

if __name__ == "__main__":
    main()