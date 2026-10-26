import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'https://creatora-sr.github.io/gyanora-hub/';
const OUT = path.resolve('test-evidence', '07-live-github-pages.png');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const res = await page.goto(URL, { waitUntil: 'load' });
await page.waitForTimeout(2500); // CDN + canvas init
await page.screenshot({ path: OUT, fullPage: false });
await browser.close();

console.log(JSON.stringify({ url: URL, httpStatus: res.status(), screenshot: OUT, ok: res.ok() }));
