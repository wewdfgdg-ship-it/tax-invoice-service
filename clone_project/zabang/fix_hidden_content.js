const { chromium } = require('playwright');
const path = require('path');

async function fixHiddenContent() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  
  // Force show hidden main content
  await page.addStyleTag({
    content: `
      body > div:first-of-type {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Force show any hidden main containers */
      #wrap, .wrap, .container, .main-content {
        display: block !important;
        visibility: visible !important;
      }
      
      /* Basic layout structure */
      body {
        min-height: 100vh;
        background: white;
      }
    `
  });
  
  // Wait for changes
  await page.waitForTimeout(2000);
  
  // Take new screenshot
  const screenshotPath = path.join(__dirname, 'backup', 'clone_unhidden_screenshot.png');
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });
  
  console.log('Fixed screenshot saved to:', screenshotPath);
  
  // Analyze visible content now
  const visibleContent = await page.evaluate(() => {
    const body = document.body;
    const allDivs = body.querySelectorAll('div');
    let visibleDivs = 0;
    let totalContent = '';
    
    allDivs.forEach(div => {
      const style = window.getComputedStyle(div);
      const rect = div.getBoundingClientRect();
      
      if (style.display !== 'none' && rect.width > 0 && rect.height > 0) {
        visibleDivs++;
        if (div.textContent && div.textContent.trim()) {
          totalContent += div.textContent.trim().substring(0, 100) + '... ';
        }
      }
    });
    
    return {
      visibleDivs,
      contentSample: totalContent.substring(0, 500),
      bodyHeight: body.scrollHeight
    };
  });
  
  console.log('Visible content analysis:');
  console.log('- Visible divs:', visibleContent.visibleDivs);
  console.log('- Body height:', visibleContent.bodyHeight);
  console.log('- Content sample:', visibleContent.contentSample);
  
  await browser.close();
}

fixHiddenContent();