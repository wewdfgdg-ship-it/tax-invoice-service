const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright test...');
  
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Set up console logging to capture errors
  const consoleMessages = [];
  const errors = [];
  
  page.on('console', msg => {
    console.log(`CONSOLE [${msg.type()}]: ${msg.text()}`);
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  page.on('pageerror', error => {
    console.log(`PAGE ERROR: ${error}`);
    errors.push(error.toString());
  });

  try {
    console.log('1. Opening http://localhost:3009/notion-database-test');
    await page.goto('http://localhost:3009/notion-database-test', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Take initial screenshot
    await page.screenshot({ path: 'test-screenshots/01-initial-page.png', fullPage: true });

    console.log('2. Looking for "모든 포스트 가져오기" button');
    const fetchButton = page.locator('button:has-text("모든 포스트 가져오기")');
    await fetchButton.waitFor({ timeout: 10000 });
    
    console.log('3. Clicking "모든 포스트 가져오기" button');
    await fetchButton.click();
    
    // Wait for cards to load
    console.log('4. Waiting for cards to load...');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-screenshots/02-after-fetch.png', fullPage: true });

    // Look for first card with "자동 추가 테스트 페이지"
    console.log('5. Looking for all "상세 보기" buttons');
    const detailButtons = page.locator('button:has-text("상세 보기")');
    const buttonCount = await detailButtons.count();
    console.log(`Found ${buttonCount} "상세 보기" buttons`);
    
    // Click the first "상세 보기" button
    console.log('6. Clicking first "상세 보기" button');
    const firstDetailButton = detailButtons.first();
    
    console.log('7. Clicking "상세 보기" button');
    await firstDetailButton.click();
    
    // Wait for detail content to load
    console.log('8. Waiting for detail content to load...');
    await page.waitForTimeout(3000);
    
    // Check if htmlContent area exists and has content
    console.log('9. Checking htmlContent area...');
    const htmlContentArea = page.locator('[data-testid="html-content"], .html-content, div:has-text("HTML 콘텐츠")');
    
    let htmlContentExists = false;
    let htmlContentText = '';
    
    try {
      await htmlContentArea.waitFor({ timeout: 5000 });
      htmlContentExists = true;
      htmlContentText = await htmlContentArea.textContent();
      console.log(`HTML Content found: "${htmlContentText}"`);
    } catch (e) {
      console.log('HTML Content area not found or empty');
      
      // Check all divs for content
      const allDivs = await page.locator('div').all();
      for (let i = 0; i < Math.min(allDivs.length, 20); i++) {
        const text = await allDivs[i].textContent();
        if (text && text.includes('HTML') || text.includes('콘텐츠')) {
          console.log(`Div ${i}: ${text.substring(0, 100)}...`);
        }
      }
    }

    // Take screenshot of detail view
    await page.screenshot({ path: 'test-screenshots/03-detail-view.png', fullPage: true });

    // Check for selected post data in JavaScript context
    console.log('10. Checking selectedPost data...');
    const selectedPostData = await page.evaluate(() => {
      // Try various ways to access the selected post data
      const results = {
        windowVars: Object.keys(window).filter(key => key.toLowerCase().includes('post') || key.toLowerCase().includes('selected')),
        reactState: null,
        consoleLog: null
      };
      
      // Try to access React component state if available
      try {
        const rootElement = document.querySelector('#__next, #root, [data-reactroot]');
        if (rootElement && rootElement._reactInternalFiber) {
          results.reactState = 'React fiber found but cannot access state safely';
        }
      } catch (e) {
        results.reactState = 'React state access failed: ' + e.message;
      }
      
      return results;
    });
    
    console.log('Selected post data:', JSON.stringify(selectedPostData, null, 2));

    // Summary
    console.log('\n=== TEST SUMMARY ===');
    console.log(`Errors found: ${errors.length}`);
    console.log(`Console messages: ${consoleMessages.length}`);
    console.log(`HTML Content area exists: ${htmlContentExists}`);
    console.log(`HTML Content text: "${htmlContentText}"`);
    
    if (errors.length > 0) {
      console.log('\nErrors:');
      errors.forEach((error, index) => console.log(`${index + 1}. ${error}`));
    }
    
    if (consoleMessages.length > 0) {
      console.log('\nConsole Messages:');
      consoleMessages.forEach((msg, index) => {
        if (msg.type === 'error' || msg.type === 'warning') {
          console.log(`${index + 1}. [${msg.type.toUpperCase()}] ${msg.text}`);
        }
      });
    }

    // Final screenshot
    await page.screenshot({ path: 'test-screenshots/04-final.png', fullPage: true });

  } catch (error) {
    console.error('Test failed:', error);
    await page.screenshot({ path: 'test-screenshots/error.png', fullPage: true });
  }

  // Keep browser open for 10 seconds for manual inspection
  console.log('\nKeeping browser open for 10 seconds for manual inspection...');
  await page.waitForTimeout(10000);

  await browser.close();
  console.log('Test completed.');
})();