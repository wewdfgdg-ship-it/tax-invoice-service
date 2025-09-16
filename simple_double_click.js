(function() {
    console.log('간단한 2번 클릭 시작...');
    
    // 사업자번호 입력
    const bizNoInput = document.querySelector('input[type="text"]');
    if (bizNoInput) {
        bizNoInput.value = '5148700192';
        bizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('사업자번호 입력: 5148700192');
    }
    
    let step = 1;
    
    // Alert 자동 처리
    const originalAlert = window.alert;
    window.alert = function(msg) {
        console.log(`${step}번째 Alert:`, msg);
        
        if (msg.includes('사업자등록번호를 입력하세요')) {
            console.log(`${step}번째 Alert 확인 완료`);
            
            if (step === 1) {
                step = 2;
                // 1번째 Alert 후 바로 2번째 확인버튼 클릭
                setTimeout(() => {
                    console.log('🔄 2번째 확인버튼 클릭!');
                    document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop').click();
                }, 500);
            } else if (step === 2) {
                console.log('🎉 2번째 Alert도 완료!');
                window.alert = originalAlert;
            }
        }
        return true;
    };
    
    // 3초 후 1번째 확인버튼 클릭
    setTimeout(() => {
        console.log('🔄 1번째 확인버튼 클릭!');
        document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop').click();
    }, 3000);
    
})();