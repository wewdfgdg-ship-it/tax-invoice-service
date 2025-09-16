(function() {
    console.log('정확한 확인버튼만 클릭 시작...');
    
    // 1단계: 사업자번호 입력
    const bizNoInput = document.querySelector('input[type="text"]');
    if (bizNoInput) {
        bizNoInput.value = '5148700192';
        bizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('사업자번호 입력 완료: 5148700192');
        
        // 3초 후 정확한 확인버튼만 클릭
        setTimeout(() => {
            console.log('정확한 확인버튼 찾는 중...');
            
            // 오직 이 셀렉터만 사용
            const exactConfirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
            
            if (exactConfirmBtn) {
                console.log('✅ 정확한 확인버튼 발견');
                console.log('버튼 정보:', exactConfirmBtn);
                
                // 오직 이 버튼만 클릭
                exactConfirmBtn.click();
                console.log('✅ 지정된 확인버튼 클릭 완료');
                
                // Alert 확인
                window.alert = function(msg) {
                    if (msg === '사업자등록번호를 입력하세요') {
                        console.log('❌ 여전히 오류: 다른 버튼을 클릭했거나 입력이 안됨');
                    } else {
                        console.log('✅ 성공: Alert 메시지 -', msg);
                    }
                    return true;
                };
                
            } else {
                console.log('❌ 셀렉터 #mf_txppWframe_btnDmnrBsnoCnfrTop 로 버튼을 찾을 수 없음');
                
                // 정확히 이 ID를 가진 요소가 있는지 확인
                const allElements = document.querySelectorAll('*');
                let found = false;
                allElements.forEach(el => {
                    if (el.id && el.id.includes('btnDmnrBsnoCnfrTop')) {
                        console.log('비슷한 ID 발견:', el.id, el);
                        found = true;
                    }
                });
                
                if (!found) {
                    console.log('해당 ID를 가진 요소가 페이지에 없습니다');
                }
            }
            
        }, 3000);
        
    } else {
        console.log('❌ 사업자번호 입력필드 없음');
    }
})();