// Screenshot the app for automated visual review.
//
// Usage:
//   node scripts/screenshot.mjs                 # capture the default set of targets
//   node scripts/screenshot.mjs /resume?s=git   # capture a single path
//   node scripts/screenshot.mjs --url http://localhost:3001
//
// If nothing is already serving the base URL, the script starts `npm run dev`,
// waits for it, captures, then shuts it down. Output goes to ./screenshots/.

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("screenshots");
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

// Parse args: flags + optional positional paths.
const args = process.argv.slice(2);
let baseUrl = "http://localhost:3000";
const paths = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--url") baseUrl = args[++i];
  else paths.push(args[i]);
}

// Default capture set: homepage + every resume skin, light and dark.
const SKINS = ["timeline", "classic", "git", "spec", "terminal"];
const targets = paths.length
  ? paths.map((p) => ({ path: p, name: slug(p), theme: "light", viewport: DESKTOP }))
  : [
      { path: "/", name: "home", theme: "light", viewport: DESKTOP },
      { path: "/", name: "home-mobile", theme: "light", viewport: MOBILE },
      ...SKINS.flatMap((s) => [
        { path: `/resume?s=${s}`, name: `resume-${s}-light`, theme: "light", viewport: DESKTOP },
        { path: `/resume?s=${s}`, name: `resume-${s}-dark`, theme: "dark", viewport: DESKTOP },
        { path: `/resume?s=${s}`, name: `resume-${s}-mobile`, theme: "light", viewport: MOBILE },
      ]),
    ];

function slug(p) {
  return p.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";
}

async function isUp(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isUp(url)) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function main() {
  // Start the dev server only if nothing is already listening.
  let devProc = null;
  if (!(await isUp(baseUrl))) {
    console.log(`No server at ${baseUrl}; starting \`npm run dev\`...`);
    devProc = spawn("npm", ["run", "dev"], { stdio: "ignore", detached: true });
    if (!(await waitForServer(baseUrl))) {
      devProc.kill("SIGTERM");
      throw new Error(`Dev server did not come up at ${baseUrl} within 60s`);
    }
  }

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const t of targets) {
      const context = await browser.newContext({ viewport: t.viewport });
      // Seed theme + reduce motion before any page script runs.
      await context.addInitScript((theme) => {
        try {
          window.localStorage.setItem("theme", theme);
        } catch {}
      }, t.theme);
      const page = await context.newPage();
      await page.emulateMedia({ reducedMotion: "reduce" });
      const url = baseUrl + t.path;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(400); // let entrance animations settle
      const file = path.join(OUT_DIR, `${t.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`  ${t.name.padEnd(22)} ${url}`);
      await context.close();
    }
  } finally {
    await browser.close();
    if (devProc) process.kill(-devProc.pid, "SIGTERM"); // kill the dev process group
  }

  console.log(`\nWrote ${targets.length} screenshot(s) to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
