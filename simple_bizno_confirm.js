(function() {
    console.log('사업자번호 입력 및 확인버튼 클릭 시작...');
    
    // 1단계: 사업자번호 입력
    const bizNoInput = document.querySelector('input[type="text"]');
    if (bizNoInput) {
        bizNoInput.focus();
        bizNoInput.value = '';
        bizNoInput.value = '5148700192';
        bizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        bizNoInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ 사업자번호 입력 완료: 5148700192');
        
        // 2초 대기 후 확인버튼 클릭
        setTimeout(() => {
            console.log('확인버튼 클릭 시도...');
            
            // 정확한 셀렉터로 확인버튼 찾기
            const confirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
            
            if (confirmBtn) {
                confirmBtn.click();
                console.log('✅ 확인버튼 클릭 완료');
                
                // Alert 창 자동 처리
                const originalAlert = window.alert;
                window.alert = function(msg) {
                    console.log('Alert 메시지:', msg);
                    console.log('Alert 창 자동 확인 완료');
                    return true;
                };
                
                // 5초 후 원래대로 복원
                setTimeout(() => {
                    window.alert = originalAlert;
                    console.log('작업 완료!');
                }, 5000);
                
            } else {
                console.log('❌ 확인버튼을 찾을 수 없습니다.');
                console.log('셀렉터: #mf_txppWframe_btnDmnrBsnoCnfrTop');
            }
        }, 2000);
        
    } else {
        console.log('❌ 사업자번호 입력필드를 찾을 수 없습니다.');
    }
})();