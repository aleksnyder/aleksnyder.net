const playwright = require("playwright");
const sharp = require("sharp");

async function generateScreenshot() {
  try {
    // Get the URL and the slug segment from it
    const url = process.argv[2];

    if (!url) {
      throw new Error("Valid URL not provided");
    }

    const browser = await playwright.chromium.launch({
      headless: false
    });

    const page = await browser.newPage();
    await page.setViewportSize({ 'width' : 1839, 'height' : 1236 })
    await page.goto(url);
    await page.screenshot({ path: 'static/img/projects/apprenticeship.jpg' });
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

generateScreenshot();
