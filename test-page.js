const { chromium } = require('playwright');

async function testPage() {
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // 콘솔 에러 캐치
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
    
    // 네트워크 에러 캐치
    const networkErrors = [];
    page.on('response', response => {
        if (!response.ok()) {
            networkErrors.push(`${response.url()}: ${response.status()}`);
        }
    });
    
    try {
        console.log('페이지 로딩 시작...');
        await page.goto('http://localhost:3002', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        console.log('페이지 로드 완료');
        
        // 페이지 제목 확인
        const title = await page.title();
        console.log(`페이지 제목: ${title}`);
        
        // HTML 스냅샷 생성
        const html = await page.content();
        console.log(`HTML 길이: ${html.length} 문자`);
        
        // 메인 요소들 확인
        const mainElements = await page.evaluate(() => {
            const elements = [];
            document.querySelectorAll('h1, h2, nav, main, section, div[class*="container"]').forEach(el => {
                elements.push({
                    tag: el.tagName,
                    class: el.className,
                    text: el.textContent?.slice(0, 100) || '',
                    visible: el.offsetWidth > 0 && el.offsetHeight > 0
                });
            });
            return elements;
        });
        
        console.log('\\n=== 페이지 주요 요소들 ===');
        mainElements.forEach((el, i) => {
            console.log(`${i+1}. <${el.tag}> class="${el.class}" visible=${el.visible}`);
            if (el.text) console.log(`   텍스트: ${el.text}`);
        });
        
        // CSS 로딩 상태 확인
        const cssInfo = await page.evaluate(() => {
            return {
                stylesheetCount: document.styleSheets.length,
                styles: Array.from(document.styleSheets).map(sheet => ({
                    href: sheet.href,
                    disabled: sheet.disabled,
                    rules: sheet.cssRules?.length || 0
                }))
            };
        });
        
        console.log('\\n=== CSS 로딩 상태 ===');
        console.log(`스타일시트 수: ${cssInfo.stylesheetCount}`);
        cssInfo.styles.forEach((style, i) => {
            console.log(`${i+1}. ${style.href || 'inline'} - 규칙: ${style.rules}개, 비활성화: ${style.disabled}`);
        });
        
        // JavaScript 에러 확인
        console.log('\\n=== 콘솔 에러 ===');
        if (consoleErrors.length === 0) {
            console.log('콘솔 에러 없음');
        } else {
            consoleErrors.forEach((error, i) => {
                console.log(`${i+1}. ${error}`);
            });
        }
        
        // 네트워크 에러 확인
        console.log('\\n=== 네트워크 에러 ===');
        if (networkErrors.length === 0) {
            console.log('네트워크 에러 없음');
        } else {
            networkErrors.forEach((error, i) => {
                console.log(`${i+1}. ${error}`);
            });
        }
        
        // 페이지 성능 메트릭
        const metrics = await page.evaluate(() => {
            const nav = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: nav.loadEventEnd - nav.fetchStart,
                domContentLoaded: nav.domContentLoadedEventEnd - nav.fetchStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
            };
        });
        
        console.log('\\n=== 성능 메트릭 ===');
        console.log(`총 로딩 시간: ${Math.round(metrics.loadTime)}ms`);
        console.log(`DOM 로딩 시간: ${Math.round(metrics.domContentLoaded)}ms`);
        console.log(`First Paint: ${Math.round(metrics.firstPaint)}ms`);
        console.log(`First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)}ms`);
        
        // 스크린샷 캡처
        await page.screenshot({ 
            path: 'page-screenshot.png', 
            fullPage: true 
        });
        console.log('\\n스크린샷 저장됨: page-screenshot.png');
        
    } catch (error) {
        console.error('페이지 테스트 중 에러 발생:', error.message);
    } finally {
        await browser.close();
    }
}

testPage();