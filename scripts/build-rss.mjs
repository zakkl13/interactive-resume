// Build-time RSS 2.0 feed for the writing section.
// Reads content/essays, skips drafts, writes public/rss.xml with absolute URLs.
// Wired as `prebuild`, so `npm run build` always refreshes it.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE = "https://zakk.io";
const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");
const OUT = path.join(process.cwd(), "public", "rss.xml");

const escapeXml = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function loadEssays() {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(ESSAYS_DIR, f), "utf8"));
      return { slug, ...data };
    })
    .filter((e) => !e.draft)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function rfc822(iso) {
  return new Date(`${iso}T12:00:00Z`).toUTCString();
}

function buildFeed(essays) {
  const lastBuild = new Date().toUTCString();
  const items = essays
    .map((e) => {
      const link = `${SITE}/writing/${e.slug}`;
      return `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <description>${escapeXml(e.summary)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zakk Lefkowits: Writing</title>
    <link>${SITE}/writing</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Essays on software engineering, AI engineering, and agents.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const essays = loadEssays();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, buildFeed(essays), "utf8");
console.log(`build-rss: wrote ${essays.length} item(s) to public/rss.xml`);
