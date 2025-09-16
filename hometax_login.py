#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
홈택스 공인인증서 자동 로그인 스크립트 (최적화 버전)
워크플로우: 홈택스 접속 → 로그인 버튼 클릭 → 소유자명 클릭 → PW 자동입력 → 확인 클릭 → 팝업 제거
"""

import time
import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class HometaxLogin:
    def __init__(self):
        """홈택스 로그인 자동화 클래스"""
        self.driver = None
        self.wait = None
        
        # .env 파일에서 비밀번호 로드
        load_dotenv()
        self.cert_password = os.getenv('pw')
        if self.cert_password:
            print(f"✅ 비밀번호 로드 성공 (****{self.cert_password[-2:]})")
        else:
            print("⚠️ .env 파일에 'pw' 값이 없습니다.")
        
        # 임시 사업자번호 설정 (나중에 GUI에서 입력받을 예정)
        self.business_number = "8146700192"
        print(f"📊 사업자번호 설정: {self.business_number}")

    def setup_driver(self):
        """Chrome 드라이버 설정"""
        options = Options()
        # 기본 옵션들
        for arg in [
            "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu",
            "--window-size=1920,1080", "--log-level=3",
            "--disable-background-networking", "--disable-sync",
            "--disable-extensions", "--disable-default-apps"
        ]:
            options.add_argument(arg)
        
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 10)

        print("✅ Chrome 드라이버 설정 완료")

    def navigate_to_hometax(self):
        """홈택스 메인 페이지로 이동"""
        print("🌐 홈택스 접속 중...")
        self.driver.get("https://www.hometax.go.kr")
        time.sleep(3)
        print("✅ 홈택스 메인 페이지 로드 완료")

    def debug_login_elements(self):
        """로그인 관련 요소 디버깅"""
        print("\n🔍 로그인 요소 디버깅 시작...")
        self.driver.switch_to.default_content()
        
        # 모든 링크와 버튼 요소 찾기
        try:
            all_links = self.driver.find_elements(By.TAG_NAME, "a")
            all_buttons = self.driver.find_elements(By.TAG_NAME, "button")
            
            print(f"📊 메인 프레임: {len(all_links)} 링크, {len(all_buttons)} 버튼")
            
            # 로그인 관련 키워드를 포함한 요소 찾기
            login_keywords = ['로그인', 'login', '인증', '공인인증서']
            found_elements = []
            
            for link in all_links:
                text = link.text.strip().lower()
                id_attr = link.get_attribute('id') or ''
                onclick = link.get_attribute('onclick') or ''
                
                for keyword in login_keywords:
                    if (keyword in text or keyword in id_attr.lower() or keyword in onclick.lower()):
                        found_elements.append({
                            'type': 'link',
                            'text': link.text.strip()[:30],
                            'id': id_attr,
                            'onclick': onclick[:50] + '...' if onclick else '',
                            'element': link
                        })
                        break
            
            if found_elements:
                print(f"✅ 로그인 관련 요소 {len(found_elements)}개 발견:")
                for i, elem in enumerate(found_elements):
                    print(f"  {i+1}. [{elem['type']}] '{elem['text']}' (id: {elem['id']}) onclick: {elem['onclick']}")
            else:
                print("❌ 로그인 관련 요소를 찾을 수 없습니다.")
                
        except Exception as e:
            print(f"❌ 디버깅 중 오류: {e}")
        
        # iframe 내부도 확인
        frames = self.driver.find_elements(By.TAG_NAME, "iframe")
        print(f"\n🖼️ 총 {len(frames)}개의 iframe 발견")
        
        for i, frame in enumerate(frames):
            try:
                frame_id = frame.get_attribute('id') or f'frame_{i}'
                frame_name = frame.get_attribute('name') or 'unknown'
                print(f"\nFrame {i+1}: id='{frame_id}', name='{frame_name}'")
                
                self.driver.switch_to.frame(frame)
                frame_links = self.driver.find_elements(By.TAG_NAME, "a")
                frame_buttons = self.driver.find_elements(By.TAG_NAME, "button")
                
                print(f"  📊 {len(frame_links)} 링크, {len(frame_buttons)} 버튼")
                
                # 이 프레임에서도 로그인 요소 찾기
                for link in frame_links:
                    text = link.text.strip().lower()
                    id_attr = link.get_attribute('id') or ''
                    onclick = link.get_attribute('onclick') or ''
                    
                    for keyword in login_keywords:
                        if (keyword in text or keyword in id_attr.lower() or keyword in onclick.lower()):
                            print(f"  ✅ 로그인 요소: '{link.text.strip()[:20]}' (id: {id_attr})")
                            break
                
                self.driver.switch_to.default_content()
                
            except Exception as e:
                print(f"  ❌ Frame {i+1} 분석 실패: {e}")
                self.driver.switch_to.default_content()
                continue

    def click_login_button(self):
        """로그인 버튼 클릭"""
        print("🔑 로그인 버튼 찾는 중...")
        
        # 홈택스 실제 구조 기반 선택자들
        login_selectors = [
            # 공인인증서 로그인 관련
            "a[onclick*='login']", 
            "a[onclick*='Login']",
            "a[onclick*='goLogin']",
            "a[onclick*='certLogin']",
            "a[onclick*='loginPopup']",
            
            # ID 기반 선택자들
            "#mf_txppWframe_loginboxFrame_anchor22",
            "#login", "#certLogin", "#loginBtn",
            "[id*='login']", "[id*='Login']", "[id*='cert']",
            "[id*='anchor']", "[id*='btn']",
            
            # 클래스 기반 선택자들  
            ".login", ".cert-login", ".login-btn",
            ".btn-login", ".certificate-login",
            
            # 속성 기반 선택자들
            "[href*='login']", "[href*='Login']",
            "a[title*='로그인']", "a[title*='인증']",
            "a[title*='공인인증서']",
            
            # 일반적인 버튼들
            "button[onclick*='login']",
            "input[onclick*='login']",
            "input[value*='로그인']",
            
            # 홈택스 특화 선택자들
            "a[href*='teht']",  # 홈택스 인증 관련
            "a[href*='cert']",  # 인증서 관련
            "[onclick*='popup']" # 팝업 관련
        ]
        
        for selector in login_selectors:
            element = self.find_element_in_all_frames(selector)
            if element:
                try:
                    print(f"✅ 로그인 버튼 발견: {selector}")
                    self.driver.execute_script("arguments[0].click();", element)
                    print("✅ 로그인 버튼 클릭 성공")
                    time.sleep(3)
                    return True
                except Exception as e:
                    print(f"⚠️ 클릭 실패 ({selector}): {e}")
                    continue
        
        # 텍스트 기반으로 로그인 버튼 찾기
        print("🔍 텍스트 기반으로 로그인 버튼 검색 중...")
        login_element = self.find_login_by_text()
        if login_element:
            try:
                print("✅ 텍스트 기반 로그인 버튼 발견")
                self.driver.execute_script("arguments[0].click();", login_element)
                print("✅ 로그인 버튼 클릭 성공")
                time.sleep(3)
                return True
            except Exception as e:
                print(f"❌ 텍스트 기반 클릭 실패: {e}")
        
        # 선택자로 찾지 못했으면 디버깅 실행
        print("❌ 모든 방법으로 로그인 버튼을 찾을 수 없습니다.")
        print("🔍 페이지 분석을 시작합니다...")
        self.debug_login_elements()
        return False

    def find_login_by_text(self):
        """텍스트 기반으로 로그인 버튼 찾기"""
        login_texts = ['로그인', '공인인증서', '인증서로그인', '공인인증서 로그인']
        
        # 메인 프레임 검색
        self.driver.switch_to.default_content()
        try:
            all_links = self.driver.find_elements(By.TAG_NAME, "a")
            all_buttons = self.driver.find_elements(By.TAG_NAME, "button")
            
            for element in all_links + all_buttons:
                element_text = element.text.strip()
                for login_text in login_texts:
                    if login_text in element_text:
                        return element
        except:
            pass
        
        # 모든 iframe에서 검색
        frames = self.driver.find_elements(By.TAG_NAME, "iframe")
        for frame in frames:
            try:
                self.driver.switch_to.frame(frame)
                frame_links = self.driver.find_elements(By.TAG_NAME, "a")
                frame_buttons = self.driver.find_elements(By.TAG_NAME, "button")
                
                for element in frame_links + frame_buttons:
                    element_text = element.text.strip()
                    for login_text in login_texts:
                        if login_text in element_text:
                            return element
                            
                self.driver.switch_to.default_content()
            except:
                self.driver.switch_to.default_content()
                continue
        
        return None

    def find_element_in_all_frames(self, selector):
        """모든 프레임에서 요소 찾기"""
        # 메인 프레임 검색
        self.driver.switch_to.default_content()
        try:
            element = self.driver.find_element(By.CSS_SELECTOR, selector)
            if element:
                return element
        except:
            pass
        
        # 모든 iframe 검색
        frames = self.driver.find_elements(By.TAG_NAME, "iframe")
        for frame in frames:
            try:
                self.driver.switch_to.frame(frame)
                element = self.driver.find_element(By.CSS_SELECTOR, selector)
                if element:
                    return element
            except:
                pass
            finally:
                self.driver.switch_to.default_content()
        
        return None

    def click_owner_element(self, selector):
        """소유자명 요소 안전하게 클릭"""
        # 메인 프레임에서 검색
        self.driver.switch_to.default_content()
        try:
            element = self.driver.find_element(By.CSS_SELECTOR, selector)
            if element.is_displayed() and element.is_enabled():
                print("✅ 소유자명 발견 (메인 프레임)")
                self.driver.execute_script("arguments[0].click();", element)
                print("✅ 소유자명 클릭 성공")
                return True
        except:
            pass
        
        # 모든 iframe에서 검색
        frames = self.driver.find_elements(By.TAG_NAME, "iframe")
        for i, frame in enumerate(frames):
            try:
                frame_id = frame.get_attribute('id') or f'frame_{i}'
                self.driver.switch_to.frame(frame)
                
                element = self.driver.find_element(By.CSS_SELECTOR, selector)
                if element.is_displayed() and element.is_enabled():
                    print(f"✅ 소유자명 발견 (프레임: {frame_id})")
                    # 같은 프레임 내에서 즉시 클릭
                    self.driver.execute_script("arguments[0].click();", element)
                    print("✅ 소유자명 클릭 성공")
                    self.driver.switch_to.default_content()
                    return True
                    
                self.driver.switch_to.default_content()
            except:
                self.driver.switch_to.default_content()
                continue
        
        return False

    def perform_certificate_login(self, retry_count=0):
        """공인인증서 로그인 수행 (재시도 로직 포함)"""
        max_retries = 3
        
        if retry_count > 0:
            print(f"🔄 공인인증서 로그인 재시도 {retry_count}/{max_retries}")
        else:
            print("🔍 공인인증서 창 대기 중...")
        
        # 1. 소유자명 클릭 대기 및 클릭
        owner_selector = "#row2dataTable > td:nth-child(1) > a > span"
        owner_clicked = False
        
        for i in range(30):
            time.sleep(1)
            if (i + 1) % 5 == 0:
                print(f"⏳ 대기 중... ({i+1}/30초)")
            
            # 소유자명 요소를 찾고 즉시 클릭 시도
            if self.click_owner_element(owner_selector):
                owner_clicked = True
                break
                
        if not owner_clicked:
            print(f"❌ 공인인증서 창을 찾을 수 없습니다. (시도 {retry_count + 1}/{max_retries + 1})")
            
            if retry_count < max_retries:
                print("🔄 로그인 버튼을 다시 클릭하고 재시도합니다...")
                
                # 로그인 버튼 다시 클릭
                if self.click_login_button():
                    print("✅ 로그인 버튼 재클릭 성공")
                    time.sleep(2)
                    # 재귀 호출로 재시도
                    return self.perform_certificate_login(retry_count + 1)
                else:
                    print("❌ 로그인 버튼 재클릭에 실패했습니다.")
                    return False
            else:
                print(f"❌ {max_retries + 1}번 시도 후 공인인증서 창을 찾을 수 없습니다.")
                return False
        
        time.sleep(3)
        
        # 2. #dscert iframe으로 전환 후 비밀번호 입력
        print("🔐 비밀번호 입력 중...")
        self.driver.switch_to.default_content()
        
        try:
            # #dscert iframe 대기 및 전환
            print("🔍 #dscert iframe 대기 중...")
            dscert_iframe = None
            for attempt in range(10):
                try:
                    dscert_iframe = self.driver.find_element(By.CSS_SELECTOR, "#dscert")
                    if dscert_iframe:
                        break
                    time.sleep(0.5)
                except:
                    time.sleep(0.5)
                    continue
            
            if not dscert_iframe:
                print("❌ #dscert iframe을 찾을 수 없습니다.")
                return False
            
            self.driver.switch_to.frame(dscert_iframe)
            print("✅ #dscert iframe으로 전환 성공")
            
            # 비밀번호 필드 찾기 및 입력
            if not self.input_certificate_password():
                return False
            
            # 확인 버튼 클릭
            if not self.click_confirm_button():
                return False
                
            self.driver.switch_to.default_content()
            return True
                
        except Exception as e:
            print(f"❌ 비밀번호 입력 중 오류: {e}")
            return False

    def input_certificate_password(self):
        """공인인증서 비밀번호 입력 (iframe 내에서 실행)"""
        # 비밀번호 필드 찾기 (다중 선택자)
        password_selectors = [
            "#input_cert_pw",
            "input[id*='cert_pw']",
            "input[name*='cert_pw']", 
            "input[type='password']",
            "input[placeholder*='비밀번호']"
        ]
        
        password_field = None
        for selector in password_selectors:
            try:
                password_field = self.driver.find_element(By.CSS_SELECTOR, selector)
                if password_field.is_displayed():
                    print(f"✅ 비밀번호 필드 발견: {selector}")
                    break
            except:
                continue
        
        if not password_field:
            print("❌ 비밀번호 필드를 찾을 수 없습니다.")
            return False
        
        # 비밀번호 입력
        try:
            password_field.clear()
            
            if self.cert_password:
                password_field.send_keys(self.cert_password)
                print("✅ 비밀번호 자동 입력 완료")
            else:
                manual_password = input("공인인증서 비밀번호를 입력하세요: ")
                password_field.send_keys(manual_password)
                print("✅ 비밀번호 수동 입력 완료")
            
            time.sleep(1)
            return True
            
        except Exception as e:
            print(f"❌ 비밀번호 입력 실패: {e}")
            return False

    def click_confirm_button(self):
        """확인 버튼 클릭 (iframe 내에서 실행)"""
        confirm_selectors = [
            "#btn_confirm_iframe > span",
            "#btn_confirm_iframe",
            "button[onclick*='confirm']",
            "input[value*='확인']",
            "button[value*='확인']",
            "input[type='submit']",
            "button[type='submit']"
        ]
        
        confirm_button = None
        for selector in confirm_selectors:
            try:
                confirm_button = self.driver.find_element(By.CSS_SELECTOR, selector)
                if confirm_button.is_displayed() and confirm_button.is_enabled():
                    print(f"✅ 확인 버튼 발견: {selector}")
                    break
            except:
                continue
        
        if not confirm_button:
            print("❌ 확인 버튼을 찾을 수 없습니다.")
            # 모든 버튼 요소 확인해서 텍스트로 찾기 시도
            try:
                all_buttons = self.driver.find_elements(By.TAG_NAME, "button")
                all_inputs = self.driver.find_elements(By.CSS_SELECTOR, "input[type='submit'], input[type='button']")
                
                for btn in all_buttons + all_inputs:
                    btn_text = btn.text.strip()
                    btn_value = btn.get_attribute('value') or ''
                    if '확인' in btn_text or '확인' in btn_value or 'confirm' in btn_text.lower():
                        confirm_button = btn
                        print(f"✅ 텍스트 기반으로 확인 버튼 발견: '{btn_text or btn_value}'")
                        break
            except:
                pass
        
        if confirm_button:
            try:
                self.driver.execute_script("arguments[0].click();", confirm_button)
                print("✅ 확인 버튼 클릭 완료")
                return True
            except Exception as e:
                print(f"❌ 확인 버튼 클릭 실패: {e}")
                return False
        else:
            print("❌ 확인 버튼을 찾을 수 없습니다.")
            return False

    def close_popup_windows(self):
        """팝업창 제거"""
        print("🔧 팝업창 확인 중...")
        self.driver.switch_to.default_content()
        time.sleep(3)
        
        # 팝업 닫기 버튼 선택자들 (새 선택자 우선)
        close_selectors = [
            "#mf_trigger4",  # 새로 추가된 팝업 닫기 버튼
            "#mf_txppWframe_UTXPPABB29_wframe_trigger15",
            "button.close", ".popup-close", "[onclick*='close']",
            "[title*='닫기']", ".modal-close", "button[title='닫기']"
        ]
        
        for selector in close_selectors:
            close_button = self.find_element_in_all_frames(selector)
            if close_button:
                try:
                    self.driver.execute_script("arguments[0].click();", close_button)
                    print(f"✅ 팝업창 제거됨: {selector}")
                    time.sleep(2)  # 팝업이 완전히 사라질 때까지 대기
                    return True
                except:
                    continue
        
        print("ℹ️ 팝업창 없음 (정상)")
        return True

    def click_invoice_menu(self):
        """계산서 버튼 클릭"""
        print("📋 계산서 메뉴 클릭 중...")
        self.driver.switch_to.default_content()
        time.sleep(2)
        
        invoice_selector = "#mf_wfHeader_wq_uuid_333"
        invoice_button = self.find_element_in_all_frames(invoice_selector)
        
        if invoice_button:
            try:
                self.driver.execute_script("arguments[0].click();", invoice_button)
                print("✅ 계산서 버튼 클릭 완료")
                time.sleep(3)  # 메뉴 로딩 대기
                return True
            except Exception as e:
                print(f"❌ 계산서 버튼 클릭 실패: {e}")
                return False
        else:
            print("❌ 계산서 버튼을 찾을 수 없습니다.")
            return False

    def click_tax_invoice_issue(self):
        """전자(세금)계산서 건별발급 버튼 클릭"""
        print("💰 전자(세금)계산서 건별발급 버튼 클릭 중...")
        self.driver.switch_to.default_content()
        time.sleep(2)
        
        tax_invoice_selector = "#combineMenuAtag_4601010100"
        tax_invoice_button = self.find_element_in_all_frames(tax_invoice_selector)
        
        if tax_invoice_button:
            try:
                self.driver.execute_script("arguments[0].click();", tax_invoice_button)
                print("✅ 전자(세금)계산서 건별발급 버튼 클릭 완료")
                time.sleep(3)  # 페이지 로딩 대기
                return True
            except Exception as e:
                print(f"❌ 전자(세금)계산서 건별발급 버튼 클릭 실패: {e}")
                return False
        else:
            print("❌ 전자(세금)계산서 건별발급 버튼을 찾을 수 없습니다.")
            return False

    def input_business_number(self):
        """사업자번호 입력 및 확인 버튼 클릭"""
        print(f"💼 사업자번호 입력 중: {self.business_number}")
        self.driver.switch_to.default_content()
        time.sleep(2)
        
        # 사업자번호 입력 필드 찾기
        business_number_selector = "#mf_txppWframe_edtDmnrBsnoTop"
        business_number_field = self.find_element_in_all_frames(business_number_selector)
        
        if business_number_field:
            try:
                # 입력 필드 클릭 후 기존 값 삭제
                self.driver.execute_script("arguments[0].click();", business_number_field)
                business_number_field.clear()
                
                # 사업자번호 입력
                business_number_field.send_keys(self.business_number)
                print(f"✅ 사업자번호 입력 완료: {self.business_number}")
                time.sleep(1)
                
                # 확인 버튼 클릭
                confirm_selector = "#mf_txppWframe_btnDmnrBsnoCnfrTop"
                confirm_button = self.find_element_in_all_frames(confirm_selector)
                
                if confirm_button:
                    self.driver.execute_script("arguments[0].click();", confirm_button)
                    print("✅ 사업자번호 확인 버튼 클릭 완료")
                    time.sleep(3)  # 처리 대기
                    return True
                else:
                    print("❌ 사업자번호 확인 버튼을 찾을 수 없습니다.")
                    return False
                    
            except Exception as e:
                print(f"❌ 사업자번호 입력 중 오류: {e}")
                return False
        else:
            print("❌ 사업자번호 입력 필드를 찾을 수 없습니다.")
            return False

    def navigate_to_tax_invoice_page(self):
        """세금계산서 발급 페이지로 이동하는 전체 프로세스"""
        print("\n🎯 세금계산서 발급 페이지로 이동 시작")
        print("📋 단계: 팝업 닫기 → 계산서 메뉴 → 건별발급 → 사업자번호 입력 → 최종 팝업 닫기")
        
        # 1단계: 팝업창 닫기
        if not self.close_popup_windows():
            print("⚠️ 팝업 닫기에 실패했지만 계속 진행합니다.")
        
        # 2단계: 계산서 버튼 클릭
        if not self.click_invoice_menu():
            print("❌ 계산서 메뉴 클릭에 실패했습니다.")
            return False
        
        # 3단계: 전자(세금)계산서 건별발급 버튼 클릭
        if not self.click_tax_invoice_issue():
            print("❌ 전자(세금)계산서 건별발급 버튼 클릭에 실패했습니다.")
            return False
        
        # 4단계: 세금계산서 페이지 로딩 후 추가 팝업 제거
        print("🔧 세금계산서 페이지 로딩 후 팝업 확인 중...")
        time.sleep(3)  # 페이지 로딩 대기
        self.close_popup_after_tax_invoice_page()
        
        # 5단계: 사업자번호 입력
        if not self.input_business_number():
            print("⚠️ 사업자번호 입력에 실패했지만 계속 진행합니다.")
        
        print("🎉 세금계산서 발급 준비가 완료되었습니다!")
        return True

    def close_popup_after_tax_invoice_page(self):
        """세금계산서 페이지 이동 후 새 브라우저 창(팝업 윈도우) 제거"""
        print("🔧 세금계산서 페이지 로딩 후 새 브라우저 창 확인 중...")
        time.sleep(3)  # 새 창이 열릴 시간 대기
        
        # 현재 열려있는 모든 윈도우 핸들 가져오기
        main_window = self.driver.current_window_handle
        all_windows = self.driver.window_handles
        
        print(f"📊 총 {len(all_windows)}개의 브라우저 창 감지됨")
        print(f"🏠 메인 창: {main_window}")
        
        # 새로 열린 팝업 창들 찾기 및 닫기
        popup_closed = False
        for window_handle in all_windows:
            if window_handle != main_window:
                try:
                    print(f"🔍 팝업 창 발견: {window_handle}")
                    
                    # 팝업 창으로 전환
                    self.driver.switch_to.window(window_handle)
                    
                    # 창 정보 확인
                    popup_title = self.driver.title
                    popup_url = self.driver.current_url
                    print(f"   📄 제목: {popup_title}")
                    print(f"   🔗 URL: {popup_url[:80]}...")
                    
                    # 팝업 창 닫기
                    self.driver.close()
                    print(f"✅ 팝업 창 닫힘: {window_handle}")
                    popup_closed = True
                    
                except Exception as e:
                    print(f"⚠️ 팝업 창 처리 중 오류: {e}")
                    continue
        
        # 메인 창으로 돌아가기
        try:
            self.driver.switch_to.window(main_window)
            print("🏠 메인 창으로 복귀 완료")
        except Exception as e:
            print(f"⚠️ 메인 창 복귀 중 오류: {e}")
        
        if popup_closed:
            print("✅ 모든 팝업 창이 성공적으로 닫혔습니다!")
            time.sleep(2)  # 창 닫힘 후 안정화 대기
        else:
            print("ℹ️ 추가로 열린 팝업 창 없음 (정상)")
        
        return True

    def close_all_popup_windows(self):
        """모든 팝업 브라우저 창 닫기 (범용)"""
        print("🔧 모든 팝업 브라우저 창 검사 및 제거...")
        
        try:
            main_window = self.driver.current_window_handle
            all_windows = self.driver.window_handles
            
            if len(all_windows) > 1:
                print(f"🔍 {len(all_windows)}개의 브라우저 창 발견 (메인창 포함)")
                
                for window in all_windows:
                    if window != main_window:
                        try:
                            self.driver.switch_to.window(window)
                            print(f"🗑️ 팝업 창 닫기: {self.driver.title}")
                            self.driver.close()
                        except:
                            pass
                
                # 메인 창으로 복귀
                self.driver.switch_to.window(main_window)
                print("🏠 메인 창으로 복귀")
            else:
                print("ℹ️ 추가 팝업 창 없음")
                
        except Exception as e:
            print(f"⚠️ 팝업 창 처리 중 오류: {e}")
        
        time.sleep(1)

    def run(self):
        """전체 로그인 프로세스 실행"""
        try:
            print("🚀 홈택스 공인인증서 자동 로그인 및 세금계산서 발급 페이지 이동 시작")
            print("📋 전체 워크플로우:")
            print("   1️⃣ 홈택스 접속 → 로그인 클릭 → 공인인증서 로그인")
            print("   2️⃣ 팝업 닫기 → 계산서 메뉴 → 건별발급 페이지 → 사업자번호 입력")
            print()
            
            # 1. 드라이버 설정 및 홈택스 접속
            self.setup_driver()
            self.navigate_to_hometax()
            
            # 2. 로그인 버튼 클릭
            if not self.click_login_button():
                input("수동으로 로그인 버튼을 클릭한 후 Enter를 눌러주세요...")
            
            # 3. 공인인증서 로그인
            if self.perform_certificate_login():
                print("🎉 로그인 성공!")
                
                # 4. 세금계산서 발급 페이지로 이동 (3단계 프로세스)
                if self.navigate_to_tax_invoice_page():
                    print("🎯 세금계산서 발급 준비 완료!")
                else:
                    print("⚠️ 세금계산서 페이지 이동 중 문제가 발생했습니다.")
                
                # 5. 최종 팝업 창 정리 (추가 안전장치)
                print("\n🧹 최종 팝업 창 정리 중...")
                self.close_all_popup_windows()
                
            else:
                print("❌ 로그인에 실패했습니다.")
            
            print("✅ 모든 프로세스 완료")
            input("Enter 키를 눌러 브라우저를 종료하세요...")
            
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
            input("Enter를 눌러 종료하세요...")
        finally:
            if self.driver:
                self.driver.quit()
                print("🚪 브라우저 종료")

if __name__ == "__main__":
    login = HometaxLogin()
    login.run()