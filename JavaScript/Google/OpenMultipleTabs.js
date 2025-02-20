const { Builder, By, Key } = require('selenium-webdriver');

(async function openMultipleTabs() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Open first tab (default)
        await driver.get('https://www.example.com');
        console.log("Opened first tab: Example.com");

        // Open a new tab
        await driver.switchTo().newWindow('tab');
        await driver.get('https://www.google.com');
        console.log("Opened second tab: Google");

        // Open another new tab
        await driver.switchTo().newWindow('tab');
        await driver.get('https://www.bing.com');
        console.log("Opened third tab: Bing");

        // Get all open window handles
        const tabs = await driver.getAllWindowHandles();
        console.log(`Total tabs open: ${tabs.length}`);

        // Verify that 3 tabs are open
        if (tabs.length === 3) {
            console.log("✅ Test Passed: Three tabs are open.");
        } else {
            console.error("Test Failed: Expected 3 tabs but found " + tabs.length);
        }

        // Switch to each tab and verify the page title
        for (let i = 0; i < tabs.length; i++) {
            await driver.switchTo().window(tabs[i]);
            let title = await driver.getTitle();
            console.log(`Tab ${i + 1} Title: ${title}`);
        }

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit(); // Close the browser
    }
})();
