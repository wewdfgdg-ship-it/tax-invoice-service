const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testResponsiveDesign() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Get absolute path to HTML file
  const htmlPath = path.resolve(__dirname, 'index.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log('Testing responsive design for:', fileUrl);
  
  // Define viewport configurations
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080, label: 'Desktop (1920x1080)' },
    { name: 'tablet', width: 768, height: 1024, label: 'Tablet (768x1024)' },
    { name: 'mobile', width: 375, height: 667, label: 'Mobile (375x667)' }
  ];
  
  const backupDir = path.join(__dirname, 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.label}...`);
    
    // Set viewport
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1
    });
    
    try {
      // Navigate to the HTML file
      await page.goto(fileUrl, { 
        waitUntil: 'networkidle0', 
        timeout: 30000 
      });
      
      // Wait for any dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Take full page screenshot
      const screenshotPath = path.join(backupDir, `responsive_${viewport.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        captureBeyondViewport: true
      });
      
      console.log(`✅ Screenshot saved: responsive_${viewport.name}.png`);
      
      // Analyze layout elements
      const layoutAnalysis = await page.evaluate(() => {
        const analysis = {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          elements: {}
        };
        
        // Check header/navigation
        const header = document.querySelector('header, .header, nav, .nav');
        if (header) {
          const rect = header.getBoundingClientRect();
          analysis.elements.header = {
            visible: rect.width > 0 && rect.height > 0,
            position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            styles: window.getComputedStyle(header)
          };
        }
        
        // Check main content area
        const main = document.querySelector('main, .main-content, .content, #content');
        if (main) {
          const rect = main.getBoundingClientRect();
          analysis.elements.main = {
            visible: rect.width > 0 && rect.height > 0,
            position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
          };
        }
        
        // Check for sidebars
        const sidebar = document.querySelector('.sidebar, .side-menu, aside');
        if (sidebar) {
          const rect = sidebar.getBoundingClientRect();
          analysis.elements.sidebar = {
            visible: rect.width > 0 && rect.height > 0,
            position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
          };
        }
        
        // Check footer
        const footer = document.querySelector('footer, .footer');
        if (footer) {
          const rect = footer.getBoundingClientRect();
          analysis.elements.footer = {
            visible: rect.width > 0 && rect.height > 0,
            position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
          };
        }
        
        // Check for responsive elements
        const responsiveElements = document.querySelectorAll('[class*="responsive"], [class*="mobile"], [class*="tablet"], [class*="desktop"]');
        analysis.elements.responsiveCount = responsiveElements.length;
        
        // Check for media queries
        const mediaQueries = [];
        for (let sheet of document.styleSheets) {
          try {
            for (let rule of sheet.cssRules || sheet.rules || []) {
              if (rule.type === CSSRule.MEDIA_RULE) {
                mediaQueries.push(rule.conditionText || rule.media.mediaText);
              }
            }
          } catch (e) {
            // Skip cross-origin stylesheets
          }
        }
        analysis.mediaQueries = [...new Set(mediaQueries)];
        
        return analysis;
      });
      
      // Save analysis to file
      const analysisPath = path.join(backupDir, `analysis_${viewport.name}.json`);
      fs.writeFileSync(analysisPath, JSON.stringify(layoutAnalysis, null, 2));
      
      console.log(`📊 Layout analysis saved: analysis_${viewport.name}.json`);
      
    } catch (error) {
      console.error(`❌ Error testing ${viewport.label}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('\n✅ Responsive testing completed!');
}

testResponsiveDesign().catch(console.error);