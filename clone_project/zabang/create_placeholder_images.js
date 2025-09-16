const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Create simple placeholder images using SVG
  const createPlaceholderSVG = (text, color) => {
    return `data:image/svg+xml;base64,${Buffer.from(`
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" fill="${color}"/>
        <text x="15" y="20" font-family="Arial" font-size="12" text-anchor="middle" fill="white">${text}</text>
      </svg>
    `).toString('base64')}`;
  };
  
  // Create placeholder images
  const placeholders = [
    { name: 'tail_sns_01.png', text: 'FB', color: '#3b5998' },
    { name: 'tail_sns_02.png', text: 'IG', color: '#e4405f' },
    { name: 'tail_sns_03.png', text: 'YT', color: '#ff0000' }
  ];
  
  for (const placeholder of placeholders) {
    await page.setContent(`<img src="${createPlaceholderSVG(placeholder.text, placeholder.color)}" width="30" height="30">`);
    await page.screenshot({
      path: `./assets/image/${placeholder.name}`,
      clip: { x: 0, y: 0, width: 30, height: 30 }
    });
    console.log(`Created ${placeholder.name}`);
  }
  
  await browser.close();
})();