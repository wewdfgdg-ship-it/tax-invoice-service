(function() {
    console.log('홈택스 자동화 스크립트 시작...');
    
    // 1단계: 사업자등록번호 입력
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
    
    // 사업자등록번호 입력
    if (businessNumberInput) {
        businessNumberInput.focus(); // 포커스 먼저
        businessNumberInput.value = '';
        businessNumberInput.value = '5148700192';
        
        // 다양한 이벤트 발생
        businessNumberInput.dispatchEvent(new Event('input', { bubbles: true }));
        businessNumberInput.dispatchEvent(new Event('change', { bubbles: true }));
        businessNumberInput.dispatchEvent(new Event('blur', { bubbles: true }));
        
        console.log('1단계: 사업자등록번호 입력 완료: 5148700192');
        
        // 입력 완료 후 3초 대기한 다음 확인 버튼 클릭
        setTimeout(() => {
            clickConfirmButton();
        }, 3000);
        
    } else {
        console.log('사업자등록번호 입력 필드를 찾을 수 없습니다.');
        return;
    }
    
    // 추가 정보 데이터 (테스트용)
    const formData = {
        companyName: '임시',      
        representativeName: '임시',     
        emailId: 'test',              
        emailDomain: 'naver.com'         
    };
    
    // 확인 버튼 클릭 함수
    function clickConfirmButton() {
        console.log('2단계: 확인 버튼 검색 중...');
        
        let confirmButton = null;
        
        // 정확한 셀렉터로 먼저 시도
        confirmButton = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
        
        if (confirmButton) {
            console.log('확인 버튼 발견 (정확한 셀렉터)');
        } else {
            console.log('정확한 셀렉터로 찾지 못함, 대체 방법 시도...');
            
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
        
        if (confirmButton) {
            // Alert 창 자동 확인 처리 미리 설정
            setupAlertHandlers();
            
            // 확인 버튼 클릭
            confirmButton.click();
            console.log('2단계: 확인 버튼 클릭 완료');
            
        } else {
            console.log('확인 버튼을 찾을 수 없습니다.');
        }
    }
    
    // Alert 처리 및 추가 정보 입력 설정
    function setupAlertHandlers() {
        const originalAlert = window.alert;
        const originalConfirm = window.confirm;
        
        window.alert = function(message) {
            console.log('Alert 메시지:', message);
            
            if (message.includes('입력하세요')) {
                console.log('입력 오류 Alert - 재시도 필요');
                // 원래 함수로 복원하고 다시 시도
                window.alert = originalAlert;
                window.confirm = originalConfirm;
                return true;
            } else {
                console.log('Alert 창 자동 확인 처리 완료');
                // 3단계: Alert 확인 후 추가 정보 입력
                setTimeout(() => {
                    fillAdditionalInfo();
                }, 2000);
                return true;
            }
        };
        
        window.confirm = function(message) {
            console.log('Confirm 메시지:', message);
            console.log('Confirm 창 자동 확인 처리 완료');
            // 3단계: Confirm 확인 후 추가 정보 입력
            setTimeout(() => {
                fillAdditionalInfo();
            }, 2000);
            return true;
        };
        
        // Alert/Confirm 창이 없을 경우 7초 후 추가 정보 입력 시도
        setTimeout(() => {
            if (document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop')) {
                fillAdditionalInfo();
            }
            // 15초 후 원래 함수로 복원
            window.alert = originalAlert;
            window.confirm = originalConfirm;
        }, 7000);
    }
    
    // 추가 정보 입력 함수
    function fillAdditionalInfo() {
        console.log('3단계: 추가 정보 입력 시작...');
        
        // 상호명 입력
        const companyNameInput = document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop');
        if (companyNameInput) {
            companyNameInput.focus();
            companyNameInput.value = formData.companyName;
            companyNameInput.dispatchEvent(new Event('input', { bubbles: true }));
            companyNameInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('상호명 입력 완료:', formData.companyName);
        }
        
        // 성명 입력
        setTimeout(() => {
            const nameInput = document.querySelector('#mf_txppWframe_edtDmnrRprsFnmTop');
            if (nameInput) {
                nameInput.focus();
                nameInput.value = formData.representativeName;
                nameInput.dispatchEvent(new Event('input', { bubbles: true }));
                nameInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('성명 입력 완료:', formData.representativeName);
            }
        }, 500);
        
        // 이메일 앞부분 입력
        setTimeout(() => {
            const emailIdInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlIdTop');
            if (emailIdInput) {
                emailIdInput.focus();
                emailIdInput.value = formData.emailId;
                emailIdInput.dispatchEvent(new Event('input', { bubbles: true }));
                emailIdInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('이메일 앞부분 입력 완료:', formData.emailId);
            }
        }, 1000);
        
        // 이메일 뒷부분 입력
        setTimeout(() => {
            const emailDomainInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlDmanTop');
            if (emailDomainInput) {
                emailDomainInput.focus();
                emailDomainInput.value = formData.emailDomain;
                emailDomainInput.dispatchEvent(new Event('input', { bubbles: true }));
                emailDomainInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('이메일 뒷부분 입력 완료:', formData.emailDomain);
                console.log('✅ 모든 정보 입력 완료!');
            }
        }, 1500);
    }
})();