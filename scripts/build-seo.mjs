// Build-time sitemap.xml and llms.txt.
// Reads content/essays (skipping drafts) like build-rss.mjs, writes to public/.
// Wired as `prebuild`, so `npm run build` always refreshes both.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE = "https://zakk.io";
const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");
const SITEMAP_OUT = path.join(process.cwd(), "public", "sitemap.xml");
const LLMS_OUT = path.join(process.cwd(), "public", "llms.txt");

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

function buildSitemap(essays) {
  const staticUrls = [`${SITE}/`, `${SITE}/writing`].map(
    (loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`
  );
  const essayUrls = essays.map(
    (e) =>
      `  <url>\n    <loc>${SITE}/writing/${e.slug}</loc>\n    <lastmod>${e.date}</lastmod>\n  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...essayUrls].join("\n")}
</urlset>
`;
}

function buildLlmsTxt(essays) {
  const essayLines = essays
    .map((e) => `- [${e.title}](${SITE}/writing/${e.slug}): ${e.summary}`)
    .join("\n");

  return `# Zakk Lefkowits

> Personal site of Zakk Lefkowits, Senior Software Engineer at Amazon Fire TV. He builds distributed systems and data platforms running on 100M+ devices, and ships most of his code with AI agents he directs and reviews.

## Pages

- [Home](${SITE}/): About Zakk, with links to GitHub and LinkedIn.
- [Writing](${SITE}/writing): Essays on software engineering, AI engineering, and agents. RSS feed at ${SITE}/rss.xml.

## Essays

${essayLines}

## Links

- GitHub: https://github.com/zakkl13
- LinkedIn: https://www.linkedin.com/in/zakklefkowits/
`;
}

const essays = loadEssays();
fs.mkdirSync(path.dirname(SITEMAP_OUT), { recursive: true });
fs.writeFileSync(SITEMAP_OUT, buildSitemap(essays), "utf8");
fs.writeFileSync(LLMS_OUT, buildLlmsTxt(essays), "utf8");
console.log(
  `build-seo: wrote sitemap.xml (${2 + essays.length} urls) and llms.txt (${essays.length} essay(s))`
);
