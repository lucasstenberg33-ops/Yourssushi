import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = './screenshots';

const SCREENSHOTS = [
  { name: '01-homepage-hero', url: '/', fullPage: false },
  { name: '02-homepage-full', url: '/', fullPage: true },
  { name: '03-meny', url: '/meny', fullPage: true },
  { name: '04-om-oss', url: '/om-oss', fullPage: true },
  { name: '05-kontakt', url: '/kontakt', fullPage: true },
];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  for (const shot of SCREENSHOTS) {
    console.log(`Capturing: ${shot.name}`);
    await page.goto(`${BASE_URL}${shot.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/${shot.name}.png`,
      fullPage: shot.fullPage || false,
    });
    console.log(`  Saved: ${shot.name}.png`);
  }

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
