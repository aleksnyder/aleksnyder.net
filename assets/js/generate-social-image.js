const playwright = require("playwright");
const sharp = require("sharp");

async function addTextOnImage() {
  try {
    // Get the URL and the slug segment from it
    const url = process.argv[2];
    const segments = url.split('/');
    const slug = segments[segments.length-1];

    if (!url) {
      throw new Error("Valid URL not provided");
    }

    const browser = await playwright.chromium.launch({
      headless: false
    });

    const page = await browser.newPage();
    await page.goto(url);
    const metadata = await page.$eval("meta[property=\"og:title\"]", (el) => el.getAttribute("content"));
    await page.waitForTimeout(1000);
    await browser.close();

    const width = 1200;
    const height = 630;

    const wordWrapToStringList = (text, maxLength) => {
      var result = [], line = [];
      var length = 0;
      text.split(" ").forEach(function(word) {
          if ((length + word.length) >= maxLength) {
              result.push(line.join(" "));
              line = []; length = 0;
          }
          length += word.length + 1;
          line.push(word);
      });
      if (line.length > 0) {
          result.push(line.join(" "));
      }
      return result;
    };

    const splitTitle = wordWrapToStringList(metadata, 30);
    const text = splitTitle[0]
    let secondLine = "";
    let thirdLine = "";

    if (splitTitle[1]) {
      secondLine = `<text x="10%" y="50%" text-anchor="start" class="title">${splitTitle[1]}</text>`;
    }

    if (splitTitle[2]) {
      thirdLine = `<text x="10%" y="60%" text-anchor="start" class="title">${splitTitle[2]}</text>`;
    }

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #fff; font-size: 70px; font-weight: bold;}
      .name {fill: #fff; font-size: 32px; font-weight: bold;}
      .outline {fill: #141414; stroke: #19a69a; stroke-width: 5px;}
      </style>
      <rect width="1150" height="580" x="25" y="25" class="outline" />
      <text x="10%" y="40%" text-anchor="start" class="title">${text}</text>
      ${secondLine}
      ${thirdLine}
      <text x="80%" y="90%" text-anchor="start" class="name">aleksnyder.net</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp("/var/www/html/portfolio/static/img/social-template.png")
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(`/var/www/html/portfolio/static/img/social-images/${slug}.png`);
  } catch (error) {
    console.log(error);
  }
}

addTextOnImage();
