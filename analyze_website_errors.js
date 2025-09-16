const { chromium } = require('playwright');

async function analyzeWebsiteErrors() {
  console.log('🚀 Starting comprehensive website analysis...\n');
  
  let browser;
  try {
    browser = await chromium.launch({ 
      headless: false,
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Comprehensive error collection
    const errors = {
      console: [],
      network: [],
      javascript: [],
      unhandledRejections: []
    };
    
    // Console monitoring
    page.on('console', (msg) => {
      const level = msg.type();
      if (['error', 'warning'].includes(level)) {
        errors.console.push({
          type: level,
          text: msg.text(),
          location: msg.location(),
          timestamp: new Date().toISOString()
        });
        console.log(`🔸 [${level.toUpperCase()}] ${msg.text()}`);
      }
    });
    
    // Network monitoring
    page.on('response', (response) => {
      if (!response.ok()) {
        const error = {
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          timestamp: new Date().toISOString()
        };
        errors.network.push(error);
        console.log(`🌐 Network Error: ${error.status} ${error.statusText} - ${error.url}`);
      }
    });
    
    // JavaScript errors
    page.on('pageerror', (error) => {
      const jsError = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      errors.javascript.push(jsError);
      console.log(`💥 JavaScript Error: ${error.message}`);
    });
    
    console.log('📍 Attempting to navigate to http://localhost:3000...');
    
    try {
      const startTime = Date.now();
      const response = await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️  Page load time: ${loadTime}ms`);
      console.log(`📊 Response status: ${response.status()}`);
      
      // Wait for any dynamic content
      await page.waitForTimeout(3000);
      
      // Get basic page info
      const pageInfo = await page.evaluate(() => {
        return {
          title: document.title,
          url: window.location.href,
          hasContent: document.body.textContent.trim().length > 0,
          contentLength: document.body.textContent.trim().length,
          hasReactRoot: !!document.getElementById('__next'),
          hasNextScript: !!document.querySelector('script[src*="_next"]'),
          bodyClasses: document.body.className,
          headElements: Array.from(document.head.children).map(el => ({
            tag: el.tagName,
            src: el.src || el.href,
            content: el.textContent?.substring(0, 100)
          }))
        };
      });
      
      console.log('\n📄 Page Analysis Results:');
      console.log('========================');
      console.log(`Title: "${pageInfo.title}"`);
      console.log(`URL: ${pageInfo.url}`);
      console.log(`Has content: ${pageInfo.hasContent}`);
      console.log(`Content length: ${pageInfo.contentLength} characters`);
      console.log(`React root found: ${pageInfo.hasReactRoot}`);
      console.log(`Next.js scripts found: ${pageInfo.hasNextScript}`);
      console.log(`Body classes: ${pageInfo.bodyClasses}`);
      
      // Check for specific error messages in the DOM
      const errorContent = await page.evaluate(() => {
        const bodyText = document.body.textContent || '';
        const checks = {
          hasNextError: bodyText.includes('Application error'),
          hasCompileError: bodyText.includes('Failed to compile'),
          hasMissingComponents: bodyText.includes('missing required error components'),
          hasRefreshMessage: bodyText.includes('refreshing'),
          is404: bodyText.includes('404') || bodyText.includes('This page could not be found'),
          is500: bodyText.includes('500') || bodyText.includes('Internal Server Error')
        };
        
        return {
          ...checks,
          bodyText: bodyText.substring(0, 500),
          errorElements: Array.from(document.querySelectorAll('[data-nextjs-error], .nextjs-error, [class*="error"]')).map(el => ({
            tag: el.tagName,
            className: el.className,
            text: el.textContent?.substring(0, 100)
          }))
        };
      });
      
      console.log('\n🔍 Error Content Analysis:');
      console.log('==========================');
      Object.entries(errorContent).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          console.log(`${key}: ${value ? '❌ YES' : '✅ NO'}`);
        }
      });
      
      if (errorContent.errorElements.length > 0) {
        console.log('\nError Elements Found:');
        errorContent.errorElements.forEach((el, i) => {
          console.log(`  ${i+1}. <${el.tag}> class="${el.className}" - "${el.text}"`);
        });
      }
      
      console.log(`\nPage Content Preview:\n"${errorContent.bodyText}"\n`);
      
      // Take screenshot
      await page.screenshot({
        path: 'page-analysis-screenshot.png',
        fullPage: true
      });
      console.log('📸 Screenshot saved: page-analysis-screenshot.png');
      
    } catch (navigationError) {
      console.log(`\n❌ Navigation failed: ${navigationError.message}`);
      
      if (navigationError.message.includes('ECONNREFUSED')) {
        console.log('💡 The development server appears to be down or not responding.');
      } else if (navigationError.message.includes('timeout')) {
        console.log('⏱️  The page took too long to load (>15s).');
      }
    }
    
    // Summary of all collected errors
    console.log('\n📋 ERROR SUMMARY:');
    console.log('==================');
    console.log(`Console Errors: ${errors.console.length}`);
    console.log(`Network Errors: ${errors.network.length}`);
    console.log(`JavaScript Errors: ${errors.javascript.length}`);
    
    if (errors.console.length > 0) {
      console.log('\n🚨 Console Errors Details:');
      errors.console.forEach((err, i) => {
        console.log(`  ${i+1}. [${err.type.toUpperCase()}] ${err.text}`);
        if (err.location && err.location.url) {
          console.log(`     📍 ${err.location.url}:${err.location.lineNumber || '?'}`);
        }
      });
    }
    
    if (errors.network.length > 0) {
      console.log('\n🌐 Network Errors Details:');
      errors.network.forEach((err, i) => {
        console.log(`  ${i+1}. ${err.status} ${err.statusText}`);
        console.log(`     📍 ${err.url}`);
      });
    }
    
    if (errors.javascript.length > 0) {
      console.log('\n💥 JavaScript Errors Details:');
      errors.javascript.forEach((err, i) => {
        console.log(`  ${i+1}. ${err.message}`);
        if (err.stack) {
          console.log(`     Stack: ${err.stack.split('\n')[0]}`);
        }
      });
    }
    
  } catch (error) {
    console.error(`\n🛑 Analysis failed: ${error.message}`);
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

analyzeWebsiteErrors().catch(console.error);