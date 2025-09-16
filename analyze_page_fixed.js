const { chromium } = require("playwright");

async function analyzePage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console errors
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleErrors.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location()
      });
    }
  });
  
  // Collect network errors
  const networkErrors = [];
  page.on("response", (response) => {
    if (\!response.ok()) {
      networkErrors.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });
  
  // Collect JavaScript errors
  const jsErrors = [];
  page.on("pageerror", (error) => {
    jsErrors.push({
      message: error.message,
      stack: error.stack
    });
  });
  
  try {
    console.log("🔍 Navigating to http://localhost:3000...");
    await page.goto("http://localhost:3000", { 
      waitUntil: "networkidle",
      timeout: 10000 
    });
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    // Get page title and URL
    const title = await page.title();
    const url = page.url();
    
    console.log("📄 Page Analysis Results:");
    console.log("========================");
    console.log(`Title: ${title}`);
    console.log(`URL: ${url}`);
    
    // Check for visible content
    const bodyText = await page.textContent("body");
    const hasContent = bodyText && bodyText.trim().length > 0;
    
    console.log(`Has content: ${hasContent}`);
    console.log(`Content length: ${bodyText ? bodyText.length : 0} characters`);
    
    // Check for React/Next.js specific elements
    const nextScript = await page.$("script[src*=\"_next\"]");
    const hasNextJS = \!\!nextScript;
    console.log(`Next.js detected: ${hasNextJS}`);
    
    // Analyze DOM structure
    const elementsCount = {
      divs: await page.$$eval("div", els => els.length),
      scripts: await page.$$eval("script", els => els.length),
      links: await page.$$eval("link", els => els.length),
      images: await page.$$eval("img", els => els.length)
    };
    
    console.log("\n🏗️  DOM Structure:");
    console.log("==================");
    Object.entries(elementsCount).forEach(([tag, count]) => {
      console.log(`${tag}: ${count}`);
    });
    
    // Report console errors
    console.log("\n🚨 Console Errors:");
    console.log("==================");
    if (consoleErrors.length === 0) {
      console.log("✅ No console errors found");
    } else {
      consoleErrors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.type.toUpperCase()}] ${error.text}`);
        if (error.location) {
          console.log(`   Location: ${error.location.url}:${error.location.lineNumber}`);
        }
      });
    }
    
    // Report network errors  
    console.log("\n🌐 Network Errors:");
    console.log("==================");
    if (networkErrors.length === 0) {
      console.log("✅ No network errors found");
    } else {
      networkErrors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.status} ${error.statusText} - ${error.url}`);
      });
    }
    
    // Report JavaScript errors
    console.log("\n💥 JavaScript Errors:");
    console.log("=====================");
    if (jsErrors.length === 0) {
      console.log("✅ No JavaScript errors found");
    } else {
      jsErrors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.message}`);
        if (error.stack) {
          console.log(`   Stack: ${error.stack}`);
        }
      });
    }
    
    // Take a screenshot for visual analysis
    await page.screenshot({
      path: "page-screenshot.png",
      fullPage: true
    });
    console.log("\n📸 Screenshot saved as page-screenshot.png");
    
    // Check for specific error indicators in the DOM
    const errorIndicators = await page.evaluate(() => {
      const indicators = [];
      
      // Check for Next.js error boundary
      const errorBoundary = document.querySelector("[data-nextjs-error]");
      if (errorBoundary) {
        indicators.push("Next.js error boundary detected");
      }
      
      // Check for 404 or error pages
      const pageContent = document.body.textContent || "";
      if (pageContent.includes("404") || pageContent.includes("Page not found")) {
        indicators.push("404/Not Found content detected");
      }
      
      if (pageContent.includes("500") || pageContent.includes("Internal Server Error")) {
        indicators.push("500/Server Error content detected");
      }
      
      // Check for empty/minimal content
      if (pageContent.trim().length < 100) {
        indicators.push("Very minimal content (possibly blank page)");
      }
      
      return indicators;
    });
    
    console.log("\n🔍 Page Analysis:");
    console.log("==================");
    if (errorIndicators.length === 0) {
      console.log("✅ No obvious error indicators found");
    } else {
      errorIndicators.forEach((indicator, index) => {
        console.log(`${index + 1}. ${indicator}`);
      });
    }
    
  } catch (error) {
    console.log("\n❌ Navigation Error:");
    console.log("====================");
    console.log(`Failed to load page: ${error.message}`);
    
    if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 Suggestion: The development server might not be running.");
      console.log("   Try running: npm run dev");
    }
  }
  
  await browser.close();
}

analyzePage().catch(console.error);
