const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function takeResponsiveScreenshots() {
  console.log('🚀 Starting responsive design verification...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Load the HTML file directly
  const htmlPath = path.resolve(__dirname, 'index.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log(`📂 Loading file: ${fileUrl}`);
  
  try {
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded successfully');
    
    // Define viewport sizes for testing
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 812 }
    ];
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    for (const viewport of viewports) {
      console.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      // Set viewport size
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });
      
      // Wait for any dynamic content to load
      await page.waitForTimeout(2000);
      
      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `responsive_fixed_${viewport.name}_${timestamp}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      
      console.log(`✅ Screenshot saved: responsive_fixed_${viewport.name}_${timestamp}.png`);
      
      // Get layout analysis
      const layoutAnalysis = await page.evaluate((viewportName) => {
        const results = {
          viewport: viewportName,
          bodyWidth: document.body.scrollWidth,
          bodyHeight: document.body.scrollHeight,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          horizontalOverflow: document.body.scrollWidth > window.innerWidth,
          hasHorizontalScrollbar: window.innerWidth < document.body.scrollWidth,
          overflowElements: []
        };
        
        // Check for elements causing horizontal overflow
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            results.overflowElements.push({
              tagName: el.tagName,
              className: el.className,
              id: el.id,
              rightEdge: Math.round(rect.right),
              overflowAmount: Math.round(rect.right - window.innerWidth)
            });
          }
        });
        
        // Get key sections layout info
        const header = document.querySelector('header, .header, nav');
        const main = document.querySelector('main, .main, .content');
        const footer = document.querySelector('footer, .footer');
        
        if (header) {
          const headerRect = header.getBoundingClientRect();
          results.header = {
            width: Math.round(headerRect.width),
            overflows: headerRect.right > window.innerWidth
          };
        }
        
        if (main) {
          const mainRect = main.getBoundingClientRect();
          results.main = {
            width: Math.round(mainRect.width),
            overflows: mainRect.right > window.innerWidth
          };
        }
        
        return results;
      }, viewport.name);
      
      console.log(`📊 Layout Analysis for ${viewport.name}:`);
      console.log(`   - Horizontal overflow: ${layoutAnalysis.horizontalOverflow ? '❌ YES' : '✅ NO'}`);
      console.log(`   - Body width: ${layoutAnalysis.bodyWidth}px (viewport: ${layoutAnalysis.viewportWidth}px)`);
      if (layoutAnalysis.header) {
        console.log(`   - Header overflow: ${layoutAnalysis.header.overflows ? '❌ YES' : '✅ NO'}`);
      }
      if (layoutAnalysis.overflowElements.length > 0) {
        console.log(`   - Overflow elements: ${layoutAnalysis.overflowElements.length}`);
        layoutAnalysis.overflowElements.slice(0, 3).forEach(el => {
          console.log(`     • ${el.tagName}.${el.className} overflows by ${el.overflowAmount}px`);
        });
      }
      
      console.log('');
    }
    
    console.log('🎉 Responsive verification complete!');
    console.log(`📂 Screenshots saved in: ${screenshotsDir}`);
    
  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the verification
takeResponsiveScreenshots().catch(console.error);