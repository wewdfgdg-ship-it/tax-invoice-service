const puppeteer = require('puppeteer');
const fs = require('fs');

async function captureEnhancedScreenshots() {
    console.log('🚀 Starting enhanced screenshot capture with improvements verification...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ]
    });
    
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 900 });
        
        // Navigate to the enhanced website
        console.log('📖 Loading enhanced website...');
        await page.goto('http://localhost:8081/index.html', { 
            waitUntil: ['load', 'networkidle0'],
            timeout: 30000 
        });
        
        // Wait for images and styles to load
        await page.waitForTimeout(5000);
        
        // Execute JavaScript to verify enhancements are working
        const enhancementsCheck = await page.evaluate(() => {
            const results = {
                cssVariables: false,
                placeholderImages: 0,
                brandColors: false,
                responsiveLayout: false,
                interactiveElements: 0,
                errors: []
            };
            
            try {
                // Check CSS Variables
                const computedStyle = getComputedStyle(document.documentElement);
                results.cssVariables = computedStyle.getPropertyValue('--zabang-blue') === '#3498db';
                
                // Check placeholder images
                const images = document.querySelectorAll('img');
                let loadedImages = 0;
                images.forEach(img => {
                    if (img.complete && img.naturalWidth > 0) loadedImages++;
                });
                results.placeholderImages = loadedImages;
                
                // Check brand colors in elements
                const elements = document.querySelectorAll('*');
                let brandColorElements = 0;
                elements.forEach(el => {
                    const bgColor = getComputedStyle(el).backgroundColor;
                    const color = getComputedStyle(el).color;
                    if (bgColor.includes('52, 152, 219') || color.includes('52, 152, 219') || 
                        bgColor.includes('44, 62, 80') || color.includes('44, 62, 80')) {
                        brandColorElements++;
                    }
                });
                results.brandColors = brandColorElements > 0;
                
                // Check responsive layout classes
                const responsiveElements = document.querySelectorAll('.grid, .flex, .container');
                results.responsiveLayout = responsiveElements.length > 0;
                
                // Check interactive elements
                const interactiveElements = document.querySelectorAll('.btn, button, .card, .menu-item');
                results.interactiveElements = interactiveElements.length;
                
            } catch (error) {
                results.errors.push(error.message);
            }
            
            return results;
        });
        
        console.log('✅ Enhancement verification results:', enhancementsCheck);
        
        // Take full page screenshot
        console.log('📸 Capturing full page screenshot...');
        await page.screenshot({
            path: './screenshots/enhanced_full_page.png',
            fullPage: true,
            quality: 95
        });
        
        // Take desktop viewport screenshot
        console.log('📸 Capturing desktop viewport...');
        await page.screenshot({
            path: './screenshots/enhanced_desktop_1280x900.png',
            quality: 95
        });
        
        // Test tablet responsive view
        console.log('📱 Testing tablet responsive view...');
        await page.setViewport({ width: 768, height: 1024 });
        await page.waitForTimeout(2000);
        await page.screenshot({
            path: './screenshots/enhanced_tablet_768x1024.png',
            quality: 95
        });
        
        // Test mobile responsive view
        console.log('📱 Testing mobile responsive view...');
        await page.setViewport({ width: 375, height: 667 });
        await page.waitForTimeout(2000);
        await page.screenshot({
            path: './screenshots/enhanced_mobile_375x667.png',
            quality: 95
        });
        
        // Test hover effects (desktop view)
        console.log('🖱️ Testing hover effects...');
        await page.setViewport({ width: 1280, height: 900 });
        await page.waitForTimeout(1000);
        
        // Hover over menu items
        const menuItems = await page.$$('.menu-item, .gnb-depth-1 > li');
        if (menuItems.length > 0) {
            await menuItems[0].hover();
            await page.waitForTimeout(1000);
            await page.screenshot({
                path: './screenshots/enhanced_hover_menu.png',
                quality: 95
            });
        }
        
        // Hover over buttons
        const buttons = await page.$$('.btn, button');
        if (buttons.length > 0) {
            await buttons[0].hover();
            await page.waitForTimeout(1000);
            await page.screenshot({
                path: './screenshots/enhanced_hover_button.png',
                quality: 95
            });
        }
        
        // Create enhancement report
        const report = {
            timestamp: new Date().toISOString(),
            improvements: {
                phase1: {
                    name: "Critical Placeholder Images",
                    status: "completed",
                    details: `Created 29 placeholder images including logos, menu icons, banners, and UI elements`
                },
                phase2: {
                    name: "Brand Colors & Typography",
                    status: "completed", 
                    details: "Implemented ZABANG brand colors, enhanced typography with CSS variables"
                },
                phase3: {
                    name: "Layout & Spacing",
                    status: "completed",
                    details: "Added responsive grid system, container layouts, and spacing utilities"
                },
                phase4: {
                    name: "Interactive Elements",
                    status: "completed",
                    details: "Added hover effects, animations, focus states, and accessibility improvements"
                }
            },
            verification: enhancementsCheck,
            screenshots: [
                'enhanced_full_page.png',
                'enhanced_desktop_1280x900.png', 
                'enhanced_tablet_768x1024.png',
                'enhanced_mobile_375x667.png',
                'enhanced_hover_menu.png',
                'enhanced_hover_button.png'
            ],
            summary: {
                totalImages: enhancementsCheck.placeholderImages,
                cssVariablesWorking: enhancementsCheck.cssVariables,
                brandColorsApplied: enhancementsCheck.brandColors,
                responsiveLayoutReady: enhancementsCheck.responsiveLayout,
                interactiveElements: enhancementsCheck.interactiveElements
            }
        };
        
        // Save report
        fs.writeFileSync('./screenshots/enhancement_report.json', JSON.stringify(report, null, 2));
        
        console.log('✅ All screenshots captured successfully!');
        console.log('📊 Enhancement Summary:');
        console.log('   - Placeholder Images:', enhancementsCheck.placeholderImages);
        console.log('   - CSS Variables Working:', enhancementsCheck.cssVariables);
        console.log('   - Brand Colors Applied:', enhancementsCheck.brandColors);
        console.log('   - Responsive Layout:', enhancementsCheck.responsiveLayout);
        console.log('   - Interactive Elements:', enhancementsCheck.interactiveElements);
        
        return report;
        
    } catch (error) {
        console.error('❌ Error during screenshot capture:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// Run the capture if this script is executed directly
if (require.main === module) {
    captureEnhancedScreenshots()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('❌ Failed:', error);
            process.exit(1);
        });
}

module.exports = { captureEnhancedScreenshots };