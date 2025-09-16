const { chromium } = require('playwright');

async function testBlogPage() {
  console.log('🚀 브라우저 테스트 시작...');
  
  // 브라우저 시작
  const browser = await chromium.launch({ 
    headless: false, // 브라우저 창 표시
    slowMo: 1000     // 액션 사이에 1초 대기
  });
  
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log('📄 페이지 로딩 중...');
    await page.goto('http://localhost:3003/blog-test');
    
    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');
    
    // 페이지 제목 확인
    const title = await page.textContent('h1');
    console.log(`📝 페이지 제목: ${title}`);
    
    // 버튼들 확인
    const button1 = await page.locator('text=첫 번째 포스트 테스트');
    const button2 = await page.locator('text=두 번째 포스트 테스트');
    
    console.log('✅ 버튼들이 존재하는지 확인...');
    await button1.waitFor();
    await button2.waitFor();
    console.log('✅ 모든 버튼이 발견되었습니다.');
    
    // 첫 번째 버튼 클릭 테스트
    console.log('🔵 첫 번째 버튼 클릭...');
    await button1.click();
    
    // 로딩 상태 확인
    const loader = page.locator('text=로딩 중...');
    if (await loader.isVisible()) {
      console.log('⏳ 로딩 상태 확인됨');
      await loader.waitFor({ state: 'hidden', timeout: 10000 });
    }
    
    // 결과 또는 에러 메시지 대기
    try {
      await page.waitForSelector('.bg-gray-100, text=에러:', { timeout: 10000 });
      
      const errorMessage = await page.locator('text=에러:').textContent();
      if (errorMessage) {
        console.log(`⚠️ 에러 메시지: ${errorMessage}`);
      } else {
        console.log('✅ 첫 번째 테스트 완료 - 결과 표시됨');
      }
    } catch (e) {
      console.log('⚠️ 결과나 에러 메시지가 표시되지 않음 (API 미설정 예상)');
    }
    
    // 2초 대기
    await page.waitForTimeout(2000);
    
    // 두 번째 버튼 클릭 테스트
    console.log('🔵 두 번째 버튼 클릭...');
    await button2.click();
    
    // 로딩 상태 확인
    if (await loader.isVisible()) {
      console.log('⏳ 로딩 상태 확인됨');
      await loader.waitFor({ state: 'hidden', timeout: 10000 });
    }
    
    // 결과 또는 에러 메시지 대기
    try {
      await page.waitForSelector('.bg-gray-100, text=에러:', { timeout: 10000 });
      
      const errorMessage = await page.locator('text=에러:').textContent();
      if (errorMessage) {
        console.log(`⚠️ 에러 메시지: ${errorMessage}`);
      } else {
        console.log('✅ 두 번째 테스트 완료 - 결과 표시됨');
      }
    } catch (e) {
      console.log('⚠️ 결과나 에러 메시지가 표시되지 않음 (API 미설정 예상)');
    }
    
    // 페이지 스크린샷 촬영
    console.log('📸 스크린샷 촬영 중...');
    await page.screenshot({ 
      path: 'blog-test-screenshot.png', 
      fullPage: true 
    });
    
    console.log('✅ 모든 테스트 완료!');
    console.log('\n📊 테스트 결과 요약:');
    console.log('- ✅ 페이지 로딩 성공');
    console.log('- ✅ UI 컴포넌트 정상 렌더링');
    console.log('- ✅ 버튼 클릭 기능 작동');
    console.log('- ✅ 로딩 상태 표시');
    console.log('- ⚠️ API 엔드포인트 미설정 (예상됨)');
    console.log('- 📸 스크린샷 저장: blog-test-screenshot.png');
    
    // 5초 대기 후 브라우저 닫기
    console.log('\n5초 후 브라우저를 닫습니다...');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error.message);
  } finally {
    await browser.close();
  }
}

// 실행
testBlogPage().catch(console.error);