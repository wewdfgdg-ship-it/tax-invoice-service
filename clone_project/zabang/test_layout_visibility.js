const { chromium } = require('playwright');
const path = require('path');

async function testLayoutVisibility() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  
  // Check for hidden elements that might become visible
  const hiddenElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const hidden = [];
    const visible = [];
    
    elements.forEach((el, index) => {
      if (index < 100) { // Check first 100 elements
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        const info = {
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: el.className || '',
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          width: rect.width,
          height: rect.height,
          hasContent: el.textContent ? el.textContent.trim().length > 0 : false
        };
        
        if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
          hidden.push(info);
        } else if (rect.width > 0 && rect.height > 0) {
          visible.push(info);
        }
      }
    });
    
    return { hidden: hidden.slice(0, 10), visible: visible.slice(0, 10) };
  });
  
  console.log('=== VISIBLE ELEMENTS ===');
  console.log(JSON.stringify(hiddenElements.visible, null, 2));
  
  console.log('\n=== HIDDEN ELEMENTS (first 10) ===');
  console.log(JSON.stringify(hiddenElements.hidden, null, 2));
  
  // Check main sections
  const mainSections = await page.evaluate(() => {
    const sections = ['header', 'main', 'nav', '#wrap', '.container', 'body > div'];
    return sections.map(selector => {
      const el = document.querySelector(selector);
      if (el) {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          selector,
          exists: true,
          display: style.display,
          width: rect.width,
          height: rect.height,
          children: el.children.length
        };
      }
      return { selector, exists: false };
    });
  });
  
  console.log('\n=== MAIN SECTIONS ===');
  console.log(JSON.stringify(mainSections, null, 2));
  
  await browser.close();
}

testLayoutVisibility();