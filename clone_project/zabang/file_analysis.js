const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--allow-file-access-from-files', '--disable-web-security']
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const filePath = 'file:///C:/Users/tip12/Documents/세금계산서/clone_project/zabang/index.html';
  
  try {
    await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Page loaded successfully');
    
    // Wait for resources
    await page.waitForTimeout(5000);
    
    // Check CSS loading
    const cssInfo = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      return {
        total: stylesheets.length,
        bodyBgColor: window.getComputedStyle(document.body).backgroundColor,
        bodyDisplay: window.getComputedStyle(document.body).display
      };
    });
    
    console.log('CSS Info:', cssInfo);
    
    // Check content visibility
    const contentInfo = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      let hiddenCount = 0;
      let visibleCount = 0;
      
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') {
          hiddenCount++;
        } else {
          visibleCount++;
        }
      });
      
      return {
        totalElements: allElements.length,
        hiddenElements: hiddenCount,
        visibleElements: visibleCount,
        bodyChildren: document.body.children.length
      };
    });
    
    console.log('Content Info:', contentInfo);
    
    // Force show content
    await page.addStyleTag({
      content: '* { visibility: visible !important; display: block !important; }'
    });
    
    await page.waitForTimeout(2000);
    
    // Take screenshots
    await page.screenshot({ 
      path: './backup/direct_file_screenshot.png', 
      fullPage: true 
    });
    
    await page.screenshot({ 
      path: './backup/direct_file_forced_visible.png', 
      fullPage: true 
    });
    
    console.log('Screenshots captured');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();