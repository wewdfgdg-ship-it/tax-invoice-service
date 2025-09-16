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
    await page.waitForTimeout(3000);
    
    // Get detailed element analysis
    const analysis = await page.evaluate(() => {
      const body = document.body;
      const allElements = document.querySelectorAll('*');
      
      // Check main containers
      const containers = [
        { selector: '#wrap', name: 'Main Wrapper' },
        { selector: '.container', name: 'Container' },
        { selector: 'header', name: 'Header' },
        { selector: 'main', name: 'Main Content' },
        { selector: '.content', name: 'Content Area' },
        { selector: '.main-visual', name: 'Main Visual' }
      ];
      
      const containerInfo = containers.map(container => {
        const el = document.querySelector(container.selector);
        if (!el) return { ...container, exists: false };
        
        const style = window.getComputedStyle(el);
        return {
          ...container,
          exists: true,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          height: el.offsetHeight,
          width: el.offsetWidth,
          childCount: el.children.length
        };
      });
      
      // Check for elements with actual content
      const elementsWithText = [];
      allElements.forEach((el, index) => {
        if (index < 20) { // Check first 20 elements
          const text = el.textContent?.trim();
          if (text && text.length > 0) {
            const style = window.getComputedStyle(el);
            elementsWithText.push({
              tag: el.tagName,
              text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
              display: style.display,
              visibility: style.visibility,
              opacity: style.opacity,
              height: el.offsetHeight
            });
          }
        }
      });
      
      return {
        bodyHeight: body.scrollHeight,
        bodyWidth: body.scrollWidth,
        bodyChildren: body.children.length,
        totalElements: allElements.length,
        containers: containerInfo,
        elementsWithText: elementsWithText.slice(0, 10),
        bodyStyle: {
          display: window.getComputedStyle(body).display,
          visibility: window.getComputedStyle(body).visibility,
          overflow: window.getComputedStyle(body).overflow
        }
      };
    });
    
    console.log('=== LAYOUT ANALYSIS ===');
    console.log('Body dimensions:', analysis.bodyHeight, 'x', analysis.bodyWidth);
    console.log('Total elements:', analysis.totalElements);
    console.log('Body style:', analysis.bodyStyle);
    console.log('\n=== CONTAINERS ===');
    analysis.containers.forEach(container => {
      console.log(`${container.name} (${container.selector}):`);
      if (container.exists) {
        console.log(`  ✓ EXISTS - Display: ${container.display}, Visibility: ${container.visibility}`);
        console.log(`  Size: ${container.width}x${container.height}, Children: ${container.childCount}`);
      } else {
        console.log(`  ✗ NOT FOUND`);
      }
    });
    
    console.log('\n=== ELEMENTS WITH TEXT ===');
    analysis.elementsWithText.forEach((el, i) => {
      console.log(`${i+1}. ${el.tag}: "${el.text}"`);
      console.log(`   Display: ${el.display}, Visibility: ${el.visibility}, Height: ${el.height}`);
    });
    
    // Force make everything visible and try again
    await page.addStyleTag({
      content: `
        body, body * {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: static !important;
          height: auto !important;
        }
        
        /* Force show common hidden elements */
        .hidden, .hide, [style*="display: none"], [style*="visibility: hidden"] {
          display: block !important;
          visibility: visible !important;
        }
        
        /* Add basic styling to ensure content is visible */
        body {
          background: white !important;
          color: #333 !important;
          line-height: 1.4 !important;
          padding: 20px !important;
        }
      `
    });
    
    await page.waitForTimeout(2000);
    
    // Take screenshot after forcing visibility
    await page.screenshot({
      path: './backup/debug_forced_visible.png',
      fullPage: true
    });
    
    console.log('\n=== DEBUG SCREENSHOT SAVED ===');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();