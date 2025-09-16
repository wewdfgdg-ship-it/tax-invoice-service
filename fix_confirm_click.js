(function() {
    console.log('확인버튼 클릭 테스트 시작...');
    
    // 1단계: 사업자번호 입력 (이미 잘 되고 있다고 하니 간단히)
    const bizNoInput = document.querySelector('input[type="text"]');
    if (bizNoInput) {
        bizNoInput.focus();
        bizNoInput.value = '5148700192';
        bizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        bizNoInput.dispatchEvent(new Event('change', { bubbles: true }));
        bizNoInput.blur();
        console.log('✅ 사업자번호 입력 완료');
        
        // 3초 대기 후 확인버튼 클릭 (더 확실하게)
        setTimeout(() => {
            console.log('확인버튼 클릭 시도...');
            
            const confirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
            
            if (confirmBtn) {
                console.log('확인버튼 발견:', confirmBtn);
                console.log('버튼 상태:', {
                    disabled: confirmBtn.disabled,
                    style: confirmBtn.style.display,
                    visible: confirmBtn.offsetParent !== null
                });
                
                // 다양한 방법으로 클릭 시도
                try {
                    // 방법 1: 직접 클릭
                    confirmBtn.click();
                    console.log('방법 1: click() 실행됨');
                } catch (e) {
                    console.log('방법 1 실패:', e);
                }
                
                try {
                    // 방법 2: 마우스 이벤트로 클릭
                    confirmBtn.dispatchEvent(new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    }));
                    console.log('방법 2: MouseEvent 실행됨');
                } catch (e) {
                    console.log('방법 2 실패:', e);
                }
                
                try {
                    // 방법 3: focus 후 클릭
                    confirmBtn.focus();
                    setTimeout(() => {
                        confirmBtn.click();
                        console.log('방법 3: focus 후 click() 실행됨');
                    }, 100);
                } catch (e) {
                    console.log('방법 3 실패:', e);
                }
                
                // Alert 처리
                const originalAlert = window.alert;
                window.alert = function(msg) {
                    console.log('Alert 발생:', msg);
                    if (msg.includes('입력하세요')) {
                        console.log('❌ 여전히 입력 오류 발생');
                    } else {
                        console.log('✅ 정상 처리됨');
                    }
                    return true;
                };
                
                setTimeout(() => {
                    window.alert = originalAlert;
                }, 5000);
                
            } else {
                console.log('❌ 확인버튼을 찾을 수 없습니다');
                
                // 비슷한 버튼들 찾아보기
                console.log('페이지의 모든 버튼 확인:');
                const allButtons = document.querySelectorAll('button, input[type="button"]');
                allButtons.forEach((btn, index) => {
                    if (btn.id || btn.textContent.includes('확인')) {
                        console.log(`버튼 ${index}:`, {
                            id: btn.id,
                            text: btn.textContent,
                            value: btn.value,
                            tag: btn.tagName
                        });
                    }
                });
            }
        }, 3000);
        
    } else {
        console.log('❌ 사업자번호 입력필드 없음');
    }
})();