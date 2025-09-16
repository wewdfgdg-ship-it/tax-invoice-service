(function(){
    console.log('홈택스 자동화 시작');
    
    // 사업자번호 입력
    const input = document.querySelector('input[type="text"]');
    if(input){
        input.focus();
        input.value = '5148700192';
        input.dispatchEvent(new Event('input', {bubbles: true}));
        input.dispatchEvent(new Event('change', {bubbles: true}));
        console.log('사업자번호 입력 완료: 5148700192');
    }
    
    let clickCount = 0;
    const originalAlert = window.alert;
    
    // Alert 자동 처리
    window.alert = function(message) {
        clickCount++;
        console.log(clickCount + '번째 Alert:', message);
        
        // 공백 제거 후 비교
        if(message.replace(/\s/g, '').includes('사업자등록번호를입력하세요')) {
            console.log(clickCount + '번째 Alert 확인 완료');
            
            if(clickCount === 1) {
                // 1번째 Alert 후 2번째 클릭
                setTimeout(() => {
                    console.log('2번째 확인버튼 클릭 시도');
                    document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop').click();
                }, 500);
            } else if(clickCount === 2) {
                // 2번째 Alert 후 완료
                console.log('2번째 Alert 처리 완료');
                window.alert = originalAlert;
            }
        } else {
            console.log('다른 Alert 메시지:', message);
            window.alert = originalAlert;
        }
        
        return true;
    };
    
    // 3초 후 1번째 확인버튼 클릭
    setTimeout(() => {
        console.log('1번째 확인버튼 클릭 시도');
        const confirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
        if(confirmBtn) {
            confirmBtn.click();
            console.log('1번째 확인버튼 클릭 완료');
        } else {
            console.log('확인버튼을 찾을 수 없습니다');
        }
    }, 3000);
    
})();