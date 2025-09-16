const { chromium } = require('playwright');
const path = require('path');

async function captureFixedScreenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to 1920x1080 for full desktop view
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the fixed index.html
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  console.log('Loading:', filePath);
  
  try {
    await page.goto(filePath, { waitUntil: 'networkidle' });
    
    // Wait a bit for any dynamic content to load
    await page.waitForTimeout(3000);
    
    // Take full page screenshot
    const screenshotPath = path.join(__dirname, 'backup', 'clone_fixed_final_screenshot.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    
    console.log('Screenshot saved to:', screenshotPath);
    
    // Get basic page info for analysis
    const title = await page.title();
    const url = page.url();
    
    // Check if CSS is loaded by looking for styled elements
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return {
        backgroundColor: computedStyle.backgroundColor,
        fontFamily: computedStyle.fontFamily,
        color: computedStyle.color
      };
    });
    
    // Check for visible content
    const hasContent = await page.evaluate(() => {
      const body = document.body;
      return body.innerText.trim().length > 0;
    });
    
    // Check for CSS loading
    const cssLoaded = await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      return links.length > 0;
    });
    
    console.log('Page Analysis:');
    console.log('- Title:', title);
    console.log('- Has content:', hasContent);
    console.log('- CSS links found:', cssLoaded);
    console.log('- Body styles:', JSON.stringify(bodyStyles, null, 2));
    
    // Check for missing images
    const missingImages = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const missing = [];
      images.forEach((img, index) => {
        if (!img.complete || img.naturalHeight === 0) {
          missing.push({
            index,
            src: img.src,
            alt: img.alt || 'no alt'
          });
        }
      });
      return missing;
    });
    
    console.log('Missing images:', missingImages.length);
    if (missingImages.length > 0) {
      console.log('Missing image details:', JSON.stringify(missingImages.slice(0, 5), null, 2));
    }
    
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  } finally {
    await browser.close();
  }
}

captureFixedScreenshot();