import { chromium } from 'playwright';

// Local production lab check: cold browser cache, 4x CPU slowdown,
// 150ms latency and 1.6Mbps download. Not a field Core Web Vitals score.
const url = process.argv[2] || 'http://localhost:3001';
const browser = await chromium.launch();
try {
  for (let run = 1; run <= 3; run++) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    await session.send('Network.enable');
    await session.send('Network.setCacheDisabled', { cacheDisabled: true });
    await session.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
    await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      window.homeMetrics = { lcp: 0, cls: 0, element: '' };
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) {
          window.homeMetrics.lcp = e.startTime;
          window.homeMetrics.element = e.element?.tagName || '';
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.homeMetrics.cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    console.log(JSON.stringify(await page.evaluate(run => ({
      run,
      ...window.homeMetrics,
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
      resources: performance.getEntriesByType('resource').map(r => ({ name: new URL(r.name).pathname, host: new URL(r.name).host, bytes: r.transferSize, type: r.initiatorType })),
    }), run)));
    await context.close();
  }
} finally {
  await browser.close();
}
