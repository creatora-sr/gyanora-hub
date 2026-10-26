// Gyanora Hub — End-to-End Test Suite (Playwright, headless Chromium)
// Chalayein:  node tests/e2e-test.mjs   (localhost:8765 server chalu hona chahiye)
// Evidence screenshots + test-results.json => test-evidence/ folder mein save hote hain.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:8765/index.html';
const OUT = path.resolve('test-evidence');
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const tc = (id, name, pass, detail = '') =>
  results.push({ id, name, pass: !!pass, detail: String(detail) });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

await page.goto(BASE, { waitUntil: 'load' });
await page.waitForTimeout(2000); // CDN scripts + canvas init

// TC-01: page load + title
const title = await page.title();
tc('TC-01', 'Page loads with correct title', title.includes('Gyanora Hub'), title);

// TC-02: favicon (site icon)
tc('TC-02', 'Favicon (site icon) linked to logo.jpeg',
  (await page.locator('link[rel="icon"][href="logo.jpeg"]').count()) === 1);

// TC-03: animated particle background canvas actually painting
const canvasPainted = await page.evaluate(() => {
  const c = document.getElementById('bg-canvas');
  if (!c) return false;
  const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  for (let i = 3; i < d.length; i += 400) if (d[i] > 0) return true;
  return false;
});
tc('TC-03', 'Animated particle background renders on canvas', canvasPainted);

// TC-04: hero floating glow orbs
tc('TC-04', 'Hero floating glow orbs present (2)', (await page.locator('.orb').count()) === 2);

// TC-05: custom cursor active + follows mouse
await page.mouse.move(640, 300);
await page.mouse.move(700, 340, { steps: 6 });
const cursorOk = await page.evaluate(() => {
  const dot = document.querySelector('.cursor-dot');
  return document.documentElement.classList.contains('custom-cursor') &&
    !!dot && !!document.querySelector('.cursor-ring') &&
    dot.style.transform.includes('700px');
});
tc('TC-05', 'Custom cursor (gold dot + ring) active and follows mouse', cursorOk);

// TC-06: sparkle trail
tc('TC-06', 'Sparkle trail particles spawn on mouse move', (await page.locator('.sparkle').count()) > 0);

// TC-07: ring grows on interactive hover
await page.hover('nav a[href="#about"]');
tc('TC-07', 'Cursor ring grows on link hover',
  await page.evaluate(() => document.querySelector('.cursor-ring').classList.contains('hovering')));

// TC-08: every phone/email/WhatsApp is a direct-open link WITH icon
const counts = await page.evaluate(() => {
  const q = (s) => [...document.querySelectorAll(s)];
  const icon = (el) => !!el.querySelector('i.fa-solid, i.fa-brands, svg');
  const t = q('a[href^="tel:"]'), m = q('a[href^="mailto:"]'), w = q('a[href^="https://wa.me/"]');
  return {
    tel: t.length, telIcon: t.filter(icon).length,
    mail: m.length, mailIcon: m.filter(icon).length,
    wa: w.length, waIcon: w.filter(icon).length,
  };
});
tc('TC-08', 'Phone/Email/WhatsApp direct-open links all have icons',
  counts.tel > 0 && counts.tel === counts.telIcon &&
  counts.mail > 0 && counts.mail === counts.mailIcon &&
  counts.wa >= 4 && counts.wa === counts.waIcon,
  JSON.stringify(counts));

// Evidence 01: hero + background + custom cursor
await page.mouse.move(640, 320);
await page.screenshot({ path: path.join(OUT, '01-hero-background-cursor.png') });

// TC-09: services tab switching
await page.click('#services-tabs button:nth-child(2)');
tc('TC-09', 'Services tabs switch content (Web Dev tab)',
  await page.evaluate(() =>
    !document.getElementById('tab-web').classList.contains('hidden') &&
    document.getElementById('tab-ai').classList.contains('hidden')));
await page.locator('#services').scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(OUT, '02-services-tab-switch.png') });
await page.click('#services-tabs button:nth-child(1)');

// TC-10: mobile menu toggle (mobile viewport)
const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mp.goto(BASE, { waitUntil: 'load' });
await mp.waitForTimeout(1500);
await mp.click('#mobile-menu-btn');
const open1 = await mp.evaluate(() => !document.getElementById('mobile-menu').classList.contains('hidden'));
await mp.screenshot({ path: path.join(OUT, '03-mobile-menu-open.png') });
await mp.click('#mobile-menu-btn');
const open2 = await mp.evaluate(() => !document.getElementById('mobile-menu').classList.contains('hidden'));
tc('TC-10', 'Mobile menu opens and closes', open1 && !open2);
await mp.close();

// TC-11: contact form -> Formspree live submission
await page.locator('#contact').scrollIntoViewIfNeeded();
await page.fill('[name=name]', 'Automated Test TC-11');
await page.fill('[name=phone]', '9999999999');
await page.fill('[name=email]', 'test@example.com');
await page.selectOption('[name=service]', 'web');
await page.fill('[name=message]', 'TEST TC-11 (Playwright): Formspree verification. Delete this entry.');
const [response] = await Promise.all([
  page.waitForResponse((r) => r.url().includes('formspree.io/f/'), { timeout: 20000 }),
  page.click('#contactForm button[type=submit]'),
]);
const status = response.status();
await page.waitForSelector('#formSuccess:not(.hidden)', { timeout: 10000 });
tc('TC-11', `Contact form submits to Formspree (HTTP ${status}) + success message shows`, status === 200);
await page.screenshot({ path: path.join(OUT, '04-form-success-formspree.png') });

// Evidence 05: contact direct-open icons
await page.evaluate(() => document.querySelector('#contact .glass-card').scrollIntoView());
await page.screenshot({ path: path.join(OUT, '05-contact-direct-icons.png') });

// TC-12: footer — every number/email has own direct-open icon
await page.evaluate(() => document.querySelector('footer').scrollIntoView());
await page.screenshot({ path: path.join(OUT, '06-footer-icons.png') });
const footerIcons = await page.evaluate(() =>
  document.querySelectorAll('footer a[href^="tel:"] i, footer a[href^="mailto:"] i, footer a[href^="https://wa.me/"] i').length);
tc('TC-12', 'Footer: every number/email has its own direct-open icon', footerIcons >= 5, 'icons=' + footerIcons);

// TC-13: logoFallback icon function
tc('TC-13', 'logoFallback() icon replacement function defined',
  await page.evaluate(() => typeof window.logoFallback === 'function'));

// TC-14: no JS console errors
const realErrors = consoleErrors.filter((e) => !e.includes('404'));
tc('TC-14', 'No JavaScript console errors', realErrors.length === 0, realErrors.join(' | ') || 'none');

await browser.close();

fs.writeFileSync(
  path.join(OUT, 'test-results.json'),
  JSON.stringify({ ranAt: new Date().toISOString(), baseUrl: BASE, allPass: results.every((r) => r.pass), results }, null, 2)
);
console.log(JSON.stringify(results, null, 2));
process.exit(results.every((r) => r.pass) ? 0 : 1);
