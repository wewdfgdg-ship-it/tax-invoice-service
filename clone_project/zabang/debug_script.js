const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to match original
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Capture console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Capture network failures
  const networkErrors = [];
  page.on('response', response => {
    if (!response.ok()) {
      networkErrors.push(`${response.url()} - ${response.status()}`);
    }
  });
  
  try {
    await page.goto('http://localhost:8081', { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    // Wait a bit for any delayed content
    await page.waitForTimeout(3000);
    
    // Get page title and check for content
    const title = await page.title();
    const hasContent = await page.evaluate(() => {
      return document.body.innerHTML.length > 1000;
    });
    
    console.log('=== DEBUG REPORT ===');
    console.log('Page Title:', title);
    console.log('Has Content:', hasContent);
    console.log('Console Errors:');
    errors.forEach(error => console.log('  - ' + error));
    console.log('Network Errors:');
    networkErrors.forEach(error => console.log('  - ' + error));
    
    // Check if CSS is loaded
    const cssLoaded = await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      return Array.from(links).map(link => ({
        href: link.href,
        loaded: link.sheet !== null
      }));
    });
    
    console.log('CSS Files:');
    cssLoaded.forEach(css => console.log(`  - ${css.href}: ${css.loaded ? 'LOADED' : 'FAILED'}`));
    
  } catch (error) {
    console.error('Navigation failed:', error.message);
  }
  
  await browser.close();
})();