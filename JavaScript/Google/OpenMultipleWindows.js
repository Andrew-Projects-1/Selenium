const { Builder } = require('selenium-webdriver');

(async function openMultipleWindows() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Open the first window (default)
        await driver.get('https://www.example.com');
        console.log("Opened first window: Example.com");

        // Open a new window
        let firstWindow = await driver.getWindowHandle();
        let newWindow1 = await driver.switchTo().newWindow('window');
        await driver.get('https://www.google.com');
        console.log("Opened second window: Google");

        // Open another new window
        let newWindow2 = await driver.switchTo().newWindow('window');
        await driver.get('https://www.bing.com');
        console.log("Opened third window: Bing");

        // Get all open window handles
        const windows = await driver.getAllWindowHandles();
        console.log(`Total windows open: ${windows.length}`);

        // Verify that 3 windows are open
        if (windows.length === 3) {
            console.log("Test Passed: Three windows are open.");
        } else {
            console.error("Test Failed: Expected 3 windows but found " + windows.length);
        }

        // Switch to each window and verify the page title
        for (let i = 0; i < windows.length; i++) {
            await driver.switchTo().window(windows[i]);
            let title = await driver.getTitle();
            console.log(`Window ${i + 1} Title: ${title}`);
        }

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit(); // Close the browser
    }
})();
