(function() {
    console.log('🚀 홈택스 테스트 자동화 시작...');
    
    // 테스트 데이터
    const testData = {
        bizNo: '5148700192',
        companyName: '임시',
        representativeName: '임시', 
        emailId: 'test',
        emailDomain: 'naver.com'
    };
    
    console.log('📝 테스트 데이터:', testData);
    
    // 1단계: 사업자등록번호 입력
    function step1_enterBizNo() {
        console.log('1️⃣ 사업자등록번호 입력 시작...');
        
        const bizNoInput = document.querySelector('input[type="text"]');
        if (bizNoInput) {
            bizNoInput.focus();
            bizNoInput.value = '';
            bizNoInput.value = testData.bizNo;
            bizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
            bizNoInput.dispatchEvent(new Event('change', { bubbles: true }));
            bizNoInput.dispatchEvent(new Event('blur', { bubbles: true }));
            
            console.log('✅ 사업자등록번호 입력 완료:', testData.bizNo);
            
            // 3초 후 확인 버튼 클릭
            setTimeout(step2_clickConfirm, 3000);
        } else {
            console.log('❌ 사업자등록번호 입력 필드를 찾을 수 없습니다.');
        }
    }
    
    // 2단계: 확인 버튼 클릭
    function step2_clickConfirm() {
        console.log('2️⃣ 확인 버튼 클릭 시작...');
        
        const confirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop') 
                        || document.querySelector('[id*="btnDmnrBsnoCnfrTop"]')
                        || document.querySelector('input[value="확인"]');
        
        if (confirmBtn) {
            // Alert 처리 설정
            const originalAlert = window.alert;
            window.alert = function(msg) {
                console.log('📢 Alert 메시지:', msg);
                if (!msg.includes('입력하세요')) {
                    setTimeout(step3_fillAdditionalInfo, 2000);
                }
                return true;
            };
            
            confirmBtn.click();
            console.log('✅ 확인 버튼 클릭 완료');
            
            // Alert 없을 경우 5초 후 다음 단계
            setTimeout(() => {
                if (document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop')) {
                    step3_fillAdditionalInfo();
                }
                window.alert = originalAlert;
            }, 5000);
            
        } else {
            console.log('❌ 확인 버튼을 찾을 수 없습니다.');
        }
    }
    
    // 3단계: 추가 정보 입력
    function step3_fillAdditionalInfo() {
        console.log('3️⃣ 추가 정보 입력 시작...');
        
        // 상호명
        const companyInput = document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop');
        if (companyInput) {
            companyInput.focus();
            companyInput.value = testData.companyName;
            companyInput.dispatchEvent(new Event('input', { bubbles: true }));
            console.log('✅ 상호명 입력:', testData.companyName);
        }
        
        // 성명 (0.5초 후)
        setTimeout(() => {
            const nameInput = document.querySelector('#mf_txppWframe_edtDmnrRprsFnmTop');
            if (nameInput) {
                nameInput.focus();
                nameInput.value = testData.representativeName;
                nameInput.dispatchEvent(new Event('input', { bubbles: true }));
                console.log('✅ 성명 입력:', testData.representativeName);
            }
        }, 500);
        
        // 이메일 앞부분 (1초 후)
        setTimeout(() => {
            const emailIdInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlIdTop');
            if (emailIdInput) {
                emailIdInput.focus();
                emailIdInput.value = testData.emailId;
                emailIdInput.dispatchEvent(new Event('input', { bubbles: true }));
                console.log('✅ 이메일 앞부분 입력:', testData.emailId);
            }
        }, 1000);
        
        // 이메일 뒷부분 (1.5초 후)
        setTimeout(() => {
            const emailDomainInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlDmanTop');
            if (emailDomainInput) {
                emailDomainInput.focus();
                emailDomainInput.value = testData.emailDomain;
                emailDomainInput.dispatchEvent(new Event('input', { bubbles: true }));
                console.log('✅ 이메일 뒷부분 입력:', testData.emailDomain);
                console.log('🎉 모든 테스트 입력 완료!');
                console.log('📧 완성된 이메일:', testData.emailId + '@' + testData.emailDomain);
            }
        }, 1500);
    }
    
    // 시작
    step1_enterBizNo();
    
})();