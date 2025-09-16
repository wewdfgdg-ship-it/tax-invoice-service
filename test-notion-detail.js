const { chromium } = require('playwright');

async function testNotionDetail() {
  console.log('🚀 Notion 상세 보기 테스트 시작...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📄 페이지 접근');
    await page.goto('http://localhost:3009/notion-database-test');
    await page.waitForLoadState('networkidle');
    
    console.log('🖱️ "모든 포스트 가져오기" 버튼 클릭');
    const fetchButton = page.locator('button:has-text("모든 포스트 가져오기")');
    await fetchButton.click();
    await page.waitForTimeout(3000);
    
    console.log('📋 포스트 카드들 확인');
    // 실제 DOM 구조에 맞는 선택자 사용
    const posts = await page.locator('div').filter({ hasText: '상세 보기' }).all();
    console.log(`📊 발견된 포스트 수: ${posts.length}`);
    
    if (posts.length > 0) {
      console.log('🖱️ 첫 번째 포스트의 "상세 보기" 버튼 클릭');
      
      // 첫 번째 포스트의 상세 보기 버튼 클릭
      const firstDetailButton = page.locator('button:has-text("상세 보기")').first();
      await firstDetailButton.click();
      
      console.log('⏳ 상세 페이지 로딩 대기...');
      await page.waitForTimeout(3000);
      
      // 상세 내용 확인
      const pageContent = await page.locator('body').innerText();
      console.log('📝 상세 페이지 콘텐츠:');
      console.log('==================================================');
      console.log(pageContent);
      console.log('==================================================');
      
      // 최종 스크린샷
      await page.screenshot({ 
        path: 'notion-detail-success.png',
        fullPage: true
      });
      console.log('📸 상세 보기 성공 스크린샷 저장: notion-detail-success.png');
      
      // 페이지 제목도 확인
      const title = await page.title();
      console.log(`📄 페이지 제목: ${title}`);
      
    } else {
      console.log('⚠️ 포스트를 찾을 수 없습니다.');
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류:', error);
    await page.screenshot({ path: 'notion-detail-error.png' });
  } finally {
    await browser.close();
    console.log('✅ 테스트 완료!');
  }
}

testNotionDetail().catch(console.error);