(function() {
    console.log('🎯 확인버튼 2번 클릭 시작...');
    
    // 사업자번호 입력 (일단 해보기)
    const bizNoInput = document.querySelector('input[type="text"]');
    if (bizNoInput) {
        bizNoInput.focus();
        bizNoInput.value = '5148700192';
        bizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        bizNoInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ 사업자번호 입력 완료: 5148700192');
    }
    
    let clickCount = 0;
    
    // Alert 처리 함수
    const originalAlert = window.alert;
    window.alert = function(msg) {
        clickCount++;
        console.log(`📢 ${clickCount}번째 Alert:`, msg);
        
        if (msg.includes('사업자등록번호를 입력하세요')) {
            console.log(`✅ ${clickCount}번째 Alert 확인 완료`);
            
            // 첫번째 Alert 후 다시 확인버튼 클릭
            if (clickCount === 1) {
                console.log('1번째 Alert 처리 완료');
                setTimeout(() => {
                    console.log('🔄 2번째 확인버튼 클릭 시도...');
                    const confirmBtn2 = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
                    if (confirmBtn2) {
                        confirmBtn2.click();
                        console.log('✅ 2번째 확인버튼 클릭 완료');
                    } else {
                        console.log('❌ 2번째 확인버튼 없음');
                    }
                }, 1000);
            }
            // 두번째 Alert 후 완료
            else if (clickCount === 2) {
                console.log('🎉 2번째 Alert도 확인 완료!');
                setTimeout(() => {
                    window.alert = originalAlert;
                }, 2000);
            }
        } else {
            console.log('✅ 다른 Alert 메시지:', msg);
            setTimeout(() => {
                window.alert = originalAlert;
            }, 2000);
        }
        
        return true;
    };
    
    // 확인버튼 클릭 함수
    function clickConfirmButton() {
        const confirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
        
        if (confirmBtn) {
            confirmBtn.click();
            console.log(`✅ ${clickCount + 1}번째 확인버튼 클릭 완료`);
        } else {
            console.log('❌ 확인버튼 없음');
        }
    }
    
    // 3초 후 첫번째 확인버튼 클릭
    setTimeout(() => {
        console.log('🔄 1번째 확인버튼 클릭 시도...');
        clickConfirmButton();
    }, 3000);
    
})();