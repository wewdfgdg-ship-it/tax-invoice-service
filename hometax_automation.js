const { chromium } = require('playwright');

async function automateHomeTax() {
    // 브라우저 실행
    const browser = await chromium.launch({ 
        headless: false, // 실행 과정을 보기 위해 false로 설정
        slowMo: 1000 // 각 액션 간 1초 대기
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        // 홈택스 전자세금계산서 발행 페이지로 이동
        console.log('홈택스 페이지로 이동 중...');
        await page.goto('https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml', {
            waitUntil: 'networkidle'
        });
        
        console.log('페이지 로딩 완료, 요소 검색 중...');
        
        // 페이지가 완전히 로드될 때까지 대기
        await page.waitForTimeout(5000);
        
        // 사업자등록번호 입력 필드 찾기 (여러 선택자 시도)
        console.log('사업자등록번호 입력 필드 검색 중...');
        let businessNumberInput = null;
        
        // 다양한 선택자로 시도
        const selectors = [
            'input[value="5148700192"]',  // 이미 값이 있는 경우
            'input[placeholder*="등록번호"]',
            'input[name*="bizNo"]',
            'input[id*="bizNo"]',
            'input[maxlength="10"]',  // 사업자등록번호는 보통 10자리
            'input[type="text"]'
        ];
        
        for (const selector of selectors) {
            const element = page.locator(selector);
            if (await element.count() > 0) {
                businessNumberInput = element.first();
                console.log(`입력 필드 발견: ${selector}`);
                break;
            }
        }
        
        if (businessNumberInput) {
            await businessNumberInput.clear();
            await businessNumberInput.fill('5148700192');
            console.log('사업자등록번호 입력 완료: 5148700192');
        } else {
            console.log('사업자등록번호 입력 필드를 찾을 수 없습니다.');
        }
        
        // 확인 버튼 클릭 (여러 선택자 시도)
        console.log('확인 버튼 검색 중...');
        let confirmButton = null;
        
        const buttonSelectors = [
            '#mf_txppWframe_btnDmnrBsnoCnfrTop',  // 정확한 셀렉터
            '[id*="btnDmnrBsnoCnfrTop"]',
            '[id*="BsnoCnfr"]',
            'button:has-text("확인")',
            'input[type="button"][value="확인"]',
            'input[value="확인"]',
            '.btn:has-text("확인")',
            'button[onclick*="확인"]',
            '[role="button"]:has-text("확인")'
        ];
        
        for (const selector of buttonSelectors) {
            const element = page.locator(selector);
            if (await element.count() > 0) {
                confirmButton = element.first();
                console.log(`확인 버튼 발견: ${selector}`);
                break;
            }
        }
        
        if (confirmButton) {
            await confirmButton.click();
            console.log('확인 버튼 클릭 완료');
            
            // 잠시 대기 후 alert 창 처리
            await page.waitForTimeout(2000);
            
            // alert 창이 나타나면 자동으로 확인 클릭
            page.on('dialog', async dialog => {
                console.log(`Alert 메시지: ${dialog.message()}`);
                await dialog.accept(); // 확인 버튼 클릭
                console.log('Alert 창 확인 버튼 클릭 완료');
            });
            
            // alert 창이 뜰 시간을 대기
            await page.waitForTimeout(3000);
            
        } else {
            console.log('확인 버튼을 찾을 수 없습니다.');
        }
        
        console.log('작업 완료!');
        
    } catch (error) {
        console.error('오류 발생:', error);
    }
    
    // 5초 후 브라우저 종료
    setTimeout(async () => {
        await browser.close();
        console.log('브라우저 종료');
    }, 5000);
}

// 실행
automateHomeTax();