// One-off generator for the writing section's static OG card.
// Produces public/og-writing.png (1200x630) in the Spec Sheet design language.
// Re-run only if the brand card needs to change: `node scripts/build-og.mjs`.

import { chromium } from "playwright";
import path from "node:path";

const OUT = path.resolve("public", "og-writing.png");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #f7f5f1;
    color: #1d1a14;
    position: relative;
    font-family: "Helvetica Neue", Arial, sans-serif;
    padding: 72px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bar { position: absolute; top: 0; left: 0; right: 0; height: 10px; background: #bc5b3a; }
  .kicker {
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 22px; letter-spacing: 0.18em; text-transform: uppercase; color: #6b6457;
  }
  .title { font-size: 132px; font-weight: 800; letter-spacing: -0.04em; line-height: 0.92; }
  .accent { color: #bc5b3a; }
  .deck { font-family: Georgia, serif; font-size: 30px; line-height: 1.4; color: #3c372d; max-width: 760px; }
  .foot {
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 22px; letter-spacing: 0.16em; text-transform: uppercase; color: #6b6457;
    display: flex; justify-content: space-between;
  }
</style></head><body>
  <div class="bar"></div>
  <div class="kicker">Writing / zakk.io</div>
  <div>
    <div class="title">Zakk<br>Lefkowits</div>
  </div>
  <div class="deck">Essays on software engineering, AI engineering, and agents.</div>
  <div class="foot"><span>Senior Software Engineer</span><span class="accent">zakk.io/writing</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: OUT });
await browser.close();
console.log(`build-og: wrote ${OUT}`);
