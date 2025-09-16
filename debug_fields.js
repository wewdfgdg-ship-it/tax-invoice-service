(function() {
    console.log('🔍 페이지 전체 입력 필드 및 버튼 분석 시작...');
    
    console.log('=== 1. 모든 INPUT 필드 확인 ===');
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((input, index) => {
        console.log(`Input ${index}:`, {
            type: input.type,
            id: input.id,
            name: input.name,
            placeholder: input.placeholder,
            value: input.value,
            visible: input.offsetParent !== null
        });
    });
    
    console.log('=== 2. 모든 BUTTON 확인 ===');
    const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
    allButtons.forEach((btn, index) => {
        console.log(`Button ${index}:`, {
            tag: btn.tagName,
            id: btn.id,
            value: btn.value,
            text: btn.textContent,
            onclick: btn.onclick ? btn.onclick.toString().substring(0, 50) + '...' : null,
            visible: btn.offsetParent !== null
        });
    });
    
    console.log('=== 3. 지정된 확인버튼 상세 확인 ===');
    const targetBtn = document.querySelector('#mf_txppWframe_btnDmnrBsnoCnfrTop');
    if (targetBtn) {
        console.log('✅ 지정 확인버튼 존재:', {
            id: targetBtn.id,
            text: targetBtn.textContent,
            value: targetBtn.value,
            disabled: targetBtn.disabled,
            visible: targetBtn.offsetParent !== null,
            onclick: targetBtn.onclick ? targetBtn.onclick.toString() : null,
            parentElement: targetBtn.parentElement
        });
    } else {
        console.log('❌ 지정 확인버튼 (#mf_txppWframe_btnDmnrBsnoCnfrTop) 없음');
    }
    
    console.log('=== 4. 사업자번호 입력 필드 후보들 ===');
    const bizNoFields = document.querySelectorAll('input[type="text"], input[maxlength="10"]');
    bizNoFields.forEach((field, index) => {
        console.log(`사업자번호 후보 ${index}:`, {
            id: field.id,
            name: field.name,
            placeholder: field.placeholder,
            maxlength: field.maxlength,
            value: field.value,
            visible: field.offsetParent !== null
        });
    });
    
    console.log('=== 분석 완료 ===');
    console.log('위 정보를 보고 올바른 입력 필드와 확인버튼을 찾아보세요!');
    
})();