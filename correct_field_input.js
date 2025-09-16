(function() {
    console.log('우측 공급받는자 등록번호 필드에 입력 시작...');
    
    // 우측 공급받는자구분의 등록번호 필드 찾기
    const rightSideBizNoInput = document.querySelector('#mf_txppWframe_edtDmnrBsnoTop');
    
    if (rightSideBizNoInput) {
        console.log('✅ 우측 등록번호 필드 발견');
        rightSideBizNoInput.focus();
        rightSideBizNoInput.value = '';
        rightSideBizNoInput.value = '5148700192';
        rightSideBizNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        rightSideBizNoInput.dispatchEvent(new Event('change', { bubbles: true }));
        rightSideBizNoInput.blur();
        
        console.log('✅ 우측 등록번호 필드 입력 완료: 5148700192');
        
        // 3초 후 확인버튼 클릭
        setTimeout(() => {
            const confirmBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
            if (confirmBtn) {
                confirmBtn.click();
                console.log('✅ 확인버튼 클릭 완료');
                
                // Alert 처리
                window.alert = function(msg) {
                    if (msg.includes('입력하세요')) {
                        console.log('❌ 여전히 오류:', msg);
                    } else {
                        console.log('✅ 성공! Alert:', msg);
                    }
                    return true;
                };
            } else {
                console.log('❌ 확인버튼 없음');
            }
        }, 3000);
        
    } else {
        console.log('❌ 우측 등록번호 필드를 찾을 수 없습니다');
        
        // 모든 가능한 등록번호 필드들 찾아보기
        console.log('모든 가능한 등록번호 필드 검색...');
        const possibleFields = document.querySelectorAll('input[id*="Bsno"], input[id*="등록번호"], input[placeholder*="등록번호"]');
        possibleFields.forEach((field, index) => {
            console.log(`필드 ${index}:`, {
                id: field.id,
                name: field.name,
                placeholder: field.placeholder,
                value: field.value
            });
        });
    }
})();