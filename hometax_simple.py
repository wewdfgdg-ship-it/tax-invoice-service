#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
홈택스 간단 테스트
"""

import time
import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# .env 파일에서 비밀번호 로드
load_dotenv()
cert_password = os.getenv('pw')
print(f"Password loaded: ****{cert_password[-2:] if cert_password else 'None'}")

# Chrome 드라이버 설정
options = Options()
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1920,1080")

print("Starting Chrome driver...")
try:
    driver = webdriver.Chrome(options=options)
    print("Chrome driver OK")
    
    print("Connecting to hometax...")
    driver.get("https://www.hometax.go.kr")
    time.sleep(5)
    print("Page loaded")
    
    input("Press Enter to close...")
    driver.quit()
    
except Exception as e:
    print(f"Error: {e}")
    input("Press Enter to exit...")