const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to match original screenshot (1920x1080)
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  try {
    // Navigate to the clone site
    await page.goto('http://localhost:8081', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for any dynamic content to load
    await page.waitForTimeout(3000);
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'backup/clone_final_screenshot.png',
      fullPage: true
    });
    
    console.log('Screenshot saved successfully: backup/clone_final_screenshot.png');
    
    // Also take a viewport screenshot for header comparison
    await page.screenshot({ 
      path: 'backup/clone_viewport_screenshot.png',
      fullPage: false
    });
    
    console.log('Viewport screenshot saved: backup/clone_viewport_screenshot.png');
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
  
  await browser.close();
})();