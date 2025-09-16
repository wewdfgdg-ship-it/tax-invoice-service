// 현재 열려있는 홈택스 페이지에서 실행할 스크립트
// 개발자 도구(F12) 콘솔에서 직접 실행하세요

(function() {
    console.log('홈택스 자동화 스크립트 시작...');
    
    // 1. 사업자등록번호 입력 필드 찾기
    let businessNumberInput = null;
    
    // 가능한 선택자들
    const inputSelectors = [
        'input[value="5148700192"]',  // 이미 값이 있는 경우
        'input[placeholder*="등록번호"]',
        'input[name*="bizNo"]',
        'input[id*="bizNo"]', 
        'input[maxlength="10"]',
        'input[type="text"]'
    ];
    
    // 입력 필드 검색
    for (const selector of inputSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            businessNumberInput = elements[0];
            console.log(`입력 필드 발견: ${selector}`);
            break;
        }
    }
    
    // 1단계: 사업자등록번호 입력
    if (businessNumberInput) {
        businessNumberInput.value = '5148700192';
        businessNumberInput.dispatchEvent(new Event('input', { bubbles: true }));
        businessNumberInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('1단계: 사업자등록번호 입력 완료: 5148700192');
    } else {
        console.log('사업자등록번호 입력 필드를 찾을 수 없습니다.');
        return;
    }
    
    // 추가 정보 데이터 (나중에 입력할 값들)
    const formData = {
        companyName: '테스트상호명',      // 상호명
        representativeName: '홍길동',     // 성명  
        emailId: 'test123',              // 이메일 앞부분
        emailDomain: 'gmail.com'         // 이메일 뒷부분
    };
    
    // 추가 정보 입력 함수 (확인 버튼 클릭 후 실행됨)
    function fillAdditionalInfo() {
        console.log('3단계: 추가 정보 입력 시작...');
        
        // 상호명 입력
        const companyNameInput = document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop');
        if (companyNameInput) {
            companyNameInput.value = formData.companyName;
            companyNameInput.dispatchEvent(new Event('input', { bubbles: true }));
            companyNameInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('상호명 입력 완료:', formData.companyName);
        }
        
        // 성명 입력
        const nameInput = document.querySelector('#mf_txppWframe_edtDmnrRprsFnmTop');
        if (nameInput) {
            nameInput.value = formData.representativeName;
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
            nameInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('성명 입력 완료:', formData.representativeName);
        }
        
        // 이메일 앞부분 입력
        const emailIdInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlIdTop');
        if (emailIdInput) {
            emailIdInput.value = formData.emailId;
            emailIdInput.dispatchEvent(new Event('input', { bubbles: true }));
            emailIdInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('이메일 앞부분 입력 완료:', formData.emailId);
        }
        
        // 이메일 뒷부분 입력
        const emailDomainInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlDmanTop');
        if (emailDomainInput) {
            emailDomainInput.value = formData.emailDomain;
            emailDomainInput.dispatchEvent(new Event('input', { bubbles: true }));
            emailDomainInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('이메일 뒷부분 입력 완료:', formData.emailDomain);
        }
        
        console.log('✅ 모든 정보 입력 완료!');
    }
    
    // 2. 확인 버튼 찾기 (정확한 셀렉터 사용)
    let confirmButton = null;
    
    // 정확한 셀렉터로 먼저 시도
    confirmButton = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
    
    if (confirmButton) {
        console.log('확인 버튼 발견 (정확한 셀렉터)');
    } else {
        console.log('정확한 셀렉터로 찾지 못함, 대체 방법 시도...');
        
        // 대체 셀렉터들
        const buttonSelectors = [
            '[id*="btnDmnrBsnoCnfrTop"]',
            '[id*="BsnoCnfr"]',
            'button:contains("확인")',
            'input[type="button"][value="확인"]',
            'input[value="확인"]'
        ];
        
        for (const selector of buttonSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                confirmButton = element;
                console.log(`확인 버튼 발견: ${selector}`);
                break;
            }
        }
        
        // 여전히 찾지 못한 경우 텍스트로 검색
        if (!confirmButton) {
            const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
            for (const button of buttons) {
                if (button.textContent.includes('확인') || button.value === '확인') {
                    confirmButton = button;
                    console.log('확인 버튼 발견 (텍스트 검색)');
                    break;
                }
            }
        }
    }
    
    // 2단계: 확인 버튼 클릭
    if (confirmButton) {
        // Alert 창 자동 확인 처리 미리 설정
        const originalAlert = window.alert;
        const originalConfirm = window.confirm;
        
        window.alert = function(message) {
            console.log('Alert 메시지:', message);
            console.log('Alert 창 자동 확인 처리 완료');
            // 3단계: Alert 확인 후 추가 정보 입력
            setTimeout(() => {
                fillAdditionalInfo();
            }, 1000);
            return true;
        };
        
        window.confirm = function(message) {
            console.log('Confirm 메시지:', message);
            console.log('Confirm 창 자동 확인 처리 완료');
            // 3단계: Confirm 확인 후 추가 정보 입력
            setTimeout(() => {
                fillAdditionalInfo();
            }, 1000);
            return true;
        };
        
        setTimeout(() => {
            confirmButton.click();
            console.log('2단계: 확인 버튼 클릭 완료');
            
            // Alert/Confirm 창이 없을 경우 5초 후 추가 정보 입력
            setTimeout(() => {
                if (document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop')) {
                    fillAdditionalInfo();
                }
            }, 5000);
        }, 2000);
        
        // 10초 후 원래 함수로 복원
        setTimeout(() => {
            window.alert = originalAlert;
            window.confirm = originalConfirm;
        }, 10000);
        
    } else {
        console.log('확인 버튼을 찾을 수 없습니다.');
        const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
        console.log('페이지의 모든 버튼들:');
        allButtons.forEach((btn, index) => {
            console.log(`${index}: ${btn.tagName} - ${btn.textContent || btn.value}`);
        });
    }
})();