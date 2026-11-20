// Draws the meme: scene.jpg + the make.fun ghost (paths from make.fun/press/mark.svg) + every word, rendered by
// headless Chrome. Writes meme/meme.png (1080x1080) and meme/meme-480.png (the judge's view size).
// Run: PUPPETEER=<dir with node_modules/puppeteer> CHROME_PATH=<chrome> node meme/render.mjs
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const puppeteer = createRequire(join(process.env.PUPPETEER, 'package.json'))('puppeteer-core');
const scene = 'data:image/jpeg;base64,' + readFileSync(join(here, 'scene.jpg')).toString('base64');

const INK = '#191419', MAGENTA = '#c41c83';
const BODY = 'M6.2 13a8.2 8.2 0 0 1 16.4 0v4.6c1 .2 1.8.8 2 2-.2 1.2-1 1.9-2 2.2V25a2.6 2.6 0 0 1-2.6 2.6c-2 0-4.6 0-5.7-.7-1.1.7-3.7.7-5.5.7A2.6 2.6 0 0 1 6.2 25v-.7c-1.2.3-3.5.1-3.6-1.9-.1-2.1 1.3-4.8 3.6-6.2z';
const sparkle = (x, y) => `M${x} ${y}Q${x + .432} ${y + 1.368} ${x + 1.8} ${y + 1.8}Q${x + .432} ${y + 2.232} ${x} ${y + 3.6}Q${x - .432} ${y + 2.232} ${x - 1.8} ${y + 1.8}Q${x - .432} ${y + 1.368} ${x} ${y}z`;

// The official ghost, untouched in shape: body, feet lines, two sparkle eyes, magenta star coin, round hand.
const ghost = `
  <path d="${BODY}" fill="${INK}" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
  <path d="${BODY}" fill="#fff"/>
  <path d="M6.3 24.1v-2.5m8 5.8v-1.5" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linecap="round"/>
  <path d="${sparkle(13.2, 10.6)}" fill="${INK}"/><path d="${sparkle(19.3, 9.8)}" fill="${INK}"/>
  <circle cx="26.5" cy="13.4" r="5.5" fill="${INK}"/><circle cx="26.5" cy="13.4" r="3.8" fill="${MAGENTA}"/>
  <path d="M26.926 11.395L27.154 12.811L28.539 13.186L27.262 13.84L27.334 15.273L26.317 14.261L24.977 14.772L25.625 13.492L24.725 12.375L26.142 12.596z" fill="#fff" stroke="#fff" stroke-width=".5" stroke-linejoin="round"/>
  <circle cx="24.9" cy="19.6" r="4" fill="${INK}"/><circle cx="24.9" cy="19.6" r="2.3" fill="#fff"/>`;

const html = `<!doctype html><html><head><style>
  html,body{margin:0;width:1080px;height:1080px;overflow:hidden}
  svg{display:block}
  .meme{font-family:'Nimbus Sans';font-weight:700;paint-order:stroke;stroke:${INK};stroke-linejoin:round}
  .gta{font-family:'Nimbus Sans Narrow';font-weight:700;paint-order:stroke;stroke:${INK};stroke-linejoin:round}
</style></head><body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur18"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="rim" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="6" dy="0" stdDeviation="6" flood-color="#ffb347" flood-opacity=".9"/>
      <feDropShadow dx="-5" dy="0" stdDeviation="8" flood-color="#ff3fa4" flood-opacity=".8"/>
    </filter>
    <linearGradient id="dim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <image href="${scene}" width="1080" height="1080"/>
  <rect width="1080" height="1080" fill="url(#dim)"/>

  <!-- headline: the setup (13-year wait + launch-day sick day) -->
  <text class="meme" x="540" y="92" text-anchor="middle" font-size="68" fill="#fff" stroke-width="14">ME: WAITED 13 YEARS</text>
  <text class="meme" x="540" y="168" text-anchor="middle" font-size="68" fill="#fff" stroke-width="14">TO CALL IN SICK FOR GTA 6</text>

  <!-- GTA mission banner: the payoff -->
  <text class="gta" x="540" y="330" text-anchor="middle" font-size="128" fill="#f5b300" stroke-width="16" letter-spacing="2">MISSION PASSED!</text>
  <text class="gta" x="540" y="408" text-anchor="middle" font-size="72" fill="#fff" stroke-width="12">GAME PAID FOR</text>
  <rect x="215" y="430" width="650" height="74" rx="37" fill="${INK}" stroke="#ff7ad1" stroke-width="4"/>
  <text class="gta" x="540" y="486" text-anchor="middle" font-size="60" fill="#fff" stroke-width="0">+$100 make.fun BOUNTY</text>

  <!-- label pointing at the ghost: the ghost is the agent -->
  <text class="meme" x="250" y="700" text-anchor="middle" font-size="56" fill="#ffe14d" stroke-width="12">MY AI</text>
  <text class="meme" x="250" y="760" text-anchor="middle" font-size="56" fill="#ffe14d" stroke-width="12">AGENT</text>
  <path d="M330 800 Q 400 850 470 820" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
  <path d="M330 800 Q 400 850 470 820" fill="none" stroke="#ffe14d" stroke-width="8" stroke-linecap="round"/>
  <path d="M450 798 L482 816 L456 846" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M450 798 L482 816 L456 846" fill="none" stroke="#ffe14d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- ghost standing on the boardwalk: contact shadow, then the mark lit by the sunset -->
  <ellipse cx="720" cy="1018" rx="210" ry="34" fill="#3a0f2a" opacity=".6" filter="url(#blur18)"/>
  <g filter="url(#rim)"><svg x="490" y="530" width="500" height="490" viewBox="1.5 3.6 32 26.6">${ghost}</svg></g>
</svg></body></html>`;

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] });
const page = await browser.newPage();
for (const [size, file] of [[1080, 'meme.png'], [480, 'meme-480.png']]) {
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: size / 1080 });
  await page.setContent(html, { waitUntil: 'load' });
  // self-check: no caption line may run off the canvas (24 px margin)
  const over = await page.evaluate(() => [...document.querySelectorAll('text')]
    .map((t) => ({ s: t.textContent, b: t.getBBox() })).filter(({ b }) => b.x < 24 || b.x + b.width > 1056).map(({ s }) => s));
  if (over.length) throw new Error('text overflows: ' + over.join(' | '));
  await page.screenshot({ path: join(here, file), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
}
await browser.close();
