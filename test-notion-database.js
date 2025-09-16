const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testNotionDatabase() {
  console.log('🚀 Notion 데이터베이스 테스트 시작...');
  
  // 브라우저 시작
  const browser = await chromium.launch({ 
    headless: false,  // 브라우저를 보이게 해서 진행 상황 확인
    slowMo: 1000     // 동작을 천천히 해서 확인하기 쉽게
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📄 1단계: http://localhost:3009/notion-database-test 페이지 열기');
    await page.goto('http://localhost:3009/notion-database-test');
    
    // 페이지 로딩 대기
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // 초기 페이지 스크린샷
    await page.screenshot({ path: 'notion-test-1-initial.png' });
    console.log('📸 초기 페이지 스크린샷 저장: notion-test-1-initial.png');
    
    console.log('🖱️ 2단계: "모든 포스트 가져오기" 버튼 클릭');
    
    // 버튼을 찾고 클릭
    const fetchButton = page.locator('button:has-text("모든 포스트 가져오기")');
    await fetchButton.waitFor({ timeout: 10000 });
    await fetchButton.click();
    
    console.log('⏳ 데이터 로딩 대기 중...');
    await page.waitForTimeout(3000);
    
    // 포스트 카드들이 로딩될 때까지 대기
    await page.waitForSelector('[class*="card"], .card, [data-testid*="card"]', { timeout: 15000 });
    
    console.log('📋 3단계: 표시된 포스트 카드들 확인');
    
    // 포스트 카드들 스크린샷
    await page.screenshot({ path: 'notion-test-2-posts-loaded.png' });
    console.log('📸 포스트 로딩 후 스크린샷 저장: notion-test-2-posts-loaded.png');
    
    // 카드들의 정보 수집
    const cards = await page.locator('[class*="card"], .card, [data-testid*="card"]').all();
    console.log(`📊 총 ${cards.length}개의 카드가 발견되었습니다.`);
    
    if (cards.length > 0) {
      // 각 카드의 내용 확인
      for (let i = 0; i < Math.min(cards.length, 3); i++) {
        const card = cards[i];
        const cardText = await card.innerText();
        console.log(`📝 카드 ${i + 1} 내용:`);
        console.log(cardText.substring(0, 200) + '...');
      }
      
      console.log('🖱️ 4단계: 첫 번째 카드의 "상세 보기" 버튼 클릭');
      
      // 첫 번째 카드에서 상세 보기 버튼 찾기
      const firstCard = cards[0];
      
      // 다양한 패턴으로 상세 보기 버튼 찾기
      let detailButton;
      try {
        detailButton = firstCard.locator('button:has-text("상세 보기"), button:has-text("자세히"), a:has-text("상세 보기"), a:has-text("자세히")').first();
        await detailButton.waitFor({ timeout: 5000 });
      } catch (e) {
        // 버튼이 없으면 카드 자체를 클릭
        console.log('ℹ️ 상세 보기 버튼을 찾지 못해 카드 자체를 클릭합니다.');
        detailButton = firstCard;
      }
      
      await detailButton.click();
      console.log('⏳ 상세 페이지 로딩 대기 중...');
      
      await page.waitForTimeout(3000);
      
      console.log('📄 5단계: 상세 콘텐츠가 표시되는지 확인');
      
      // 상세 내용 스크린샷
      await page.screenshot({ path: 'notion-test-3-detail-view.png' });
      console.log('📸 상세 보기 스크린샷 저장: notion-test-3-detail-view.png');
      
      // 상세 내용 확인
      const detailContent = await page.locator('body').innerText();
      console.log('📝 상세 페이지 콘텐츠 (처음 500자):');
      console.log(detailContent.substring(0, 500) + '...');
      
    } else {
      console.log('⚠️ 카드가 발견되지 않았습니다. 로딩에 실패했거나 페이지 구조가 예상과 다를 수 있습니다.');
    }
    
    console.log('📸 6단계: 최종 스크린샷 캡처');
    await page.screenshot({ 
      path: 'notion-test-final.png',
      fullPage: true  // 전체 페이지 캡처
    });
    console.log('📸 최종 전체 페이지 스크린샷 저장: notion-test-final.png');
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error);
    await page.screenshot({ path: 'notion-test-error.png' });
    console.log('📸 오류 상황 스크린샷 저장: notion-test-error.png');
  } finally {
    await browser.close();
    console.log('✅ 테스트 완료!');
  }
}

// 테스트 실행
testNotionDatabase().catch(console.error);