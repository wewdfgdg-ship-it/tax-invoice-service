javascript:(function(){
    // 폼 데이터 (원하는 값으로 수정하세요)
    const data = {
        bizNo: '5148700192',
        companyName: '테스트상호명',
        name: '홍길동',
        emailId: 'test123',
        emailDomain: 'gmail.com'
    };
    
    // 사업자등록번호 입력
    const inputs = document.querySelectorAll('input[type="text"]');
    for(let input of inputs) {
        if(input.placeholder && input.placeholder.includes('등록번호')) {
            input.value = data.bizNo;
            input.dispatchEvent(new Event('input', {bubbles: true}));
            break;
        }
    }
    
    // 상호명 입력
    const companyInput = document.querySelector('#mf_txppWframe_edtDmnrTnmNmTop');
    if(companyInput) {
        companyInput.value = data.companyName;
        companyInput.dispatchEvent(new Event('input', {bubbles: true}));
    }
    
    // 성명 입력
    const nameInput = document.querySelector('#mf_txppWframe_edtDmnrRprsFnmTop');
    if(nameInput) {
        nameInput.value = data.name;
        nameInput.dispatchEvent(new Event('input', {bubbles: true}));
    }
    
    // 이메일 앞부분 입력
    const emailIdInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlIdTop');
    if(emailIdInput) {
        emailIdInput.value = data.emailId;
        emailIdInput.dispatchEvent(new Event('input', {bubbles: true}));
    }
    
    // 이메일 뒷부분 입력
    const emailDomainInput = document.querySelector('#mf_txppWframe_edtDmnrMchrgEmlDmanTop');
    if(emailDomainInput) {
        emailDomainInput.value = data.emailDomain;
        emailDomainInput.dispatchEvent(new Event('input', {bubbles: true}));
    }
    
    // 확인 버튼 클릭 (정확한 셀렉터 사용)
    setTimeout(() => {
        let btn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
        if(!btn) {
            btn = document.querySelector('[id*="btnDmnrBsnoCnfrTop"]');
        }
        if(!btn) {
            const buttons = document.querySelectorAll('button, input[type="button"]');
            for(let button of buttons) {
                if(button.textContent === '확인' || button.value === '확인') {
                    btn = button;
                    break;
                }
            }
        }
        if(btn) btn.click();
    }, 500);
    
    // Alert 자동 확인
    const originalAlert = window.alert;
    window.alert = function(msg) {
        console.log('Auto-confirmed alert:', msg);
        return true;
    };
    setTimeout(() => window.alert = originalAlert, 5000);
})();