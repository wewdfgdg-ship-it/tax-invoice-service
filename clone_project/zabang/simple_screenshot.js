const puppeteer = require('puppeteer');
const fs = require('fs');

async function captureScreenshots() {
    console.log('📸 Starting screenshot capture...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Desktop view
        await page.setViewport({ width: 1280, height: 900 });
        await page.goto('http://localhost:8081/index.html', { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        console.log('📸 Capturing desktop screenshot...');
        await page.screenshot({
            path: './screenshots/enhanced_desktop.png',
            fullPage: true
        });
        
        // Tablet view
        console.log('📱 Capturing tablet screenshot...');
        await page.setViewport({ width: 768, height: 1024 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.screenshot({
            path: './screenshots/enhanced_tablet.png',
            fullPage: true
        });
        
        // Mobile view  
        console.log('📱 Capturing mobile screenshot...');
        await page.setViewport({ width: 375, height: 667 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.screenshot({
            path: './screenshots/enhanced_mobile.png',
            fullPage: true
        });
        
        console.log('✅ Screenshots completed successfully!');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

captureScreenshots();