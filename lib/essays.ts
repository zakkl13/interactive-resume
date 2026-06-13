import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Source of truth for essays: one markdown file per essay in content/essays.
// The filename (without .md) is the slug and the URL. Never rename after publishing.
export const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");

export interface EssayFrontmatter {
  title: string;
  date: string; // ISO, e.g. "2026-06-10"
  summary: string;
  tags?: string[];
  originalUrl?: string;
  coverImage?: string; // optional header image rendered above the title
  coverAlt?: string;
  draft?: boolean;
}

export interface EssayMeta extends EssayFrontmatter {
  slug: string;
  readingTime: number; // minutes, rounded, min 1
  number: number; // chronological index, oldest = 1
  dateDisplay: string; // "June 10, 2026"
}

export interface Essay extends EssayMeta {
  content: string; // raw markdown body
}

// Drafts are visible in dev, excluded from prod builds, the list, and RSS.
const includeDrafts = process.env.NODE_ENV !== "production";

// Reading time at a reflective 200 wpm, plus ~12s of dwell per image (inline
// markdown images + an optional cover), rounded up. Images carry real reading
// effort that a pure word count ignores.
const WORDS_PER_MINUTE = 200;
const SECONDS_PER_IMAGE = 12;

function readingTimeFor(body: string, extraImages = 0): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const inlineImages = (body.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length;
  const seconds = (words / WORDS_PER_MINUTE) * 60 + (inlineImages + extraImages) * SECONDS_PER_IMAGE;
  return Math.max(1, Math.ceil(seconds / 60));
}

function formatDate(iso: string): string {
  // Parse as UTC noon to avoid timezone day-shift, then format in en-US.
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function listSlugs(): string[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

interface ParsedEssay {
  slug: string;
  data: EssayFrontmatter;
  content: string;
}

function parseAll(): ParsedEssay[] {
  return listSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(ESSAYS_DIR, `${slug}.md`), "utf8");
    const { data, content } = matter(raw);
    return { slug, data: data as EssayFrontmatter, content };
  });
}

// All published essays, oldest first, with derived numbering attached.
function publishedChronological(): Array<ParsedEssay & { number: number }> {
  const visible = parseAll().filter((e) => includeDrafts || !e.data.draft);
  return visible
    .sort((a, b) => a.data.date.localeCompare(b.data.date))
    .map((e, i) => ({ ...e, number: i + 1 }));
}

function toMeta(e: ParsedEssay & { number: number }): EssayMeta {
  return {
    ...e.data,
    slug: e.slug,
    number: e.number,
    readingTime: readingTimeFor(e.content, e.data.coverImage ? 1 : 0),
    dateDisplay: formatDate(e.data.date),
  };
}

// List page + RSS: newest first.
export function getAllEssayMeta(): EssayMeta[] {
  return publishedChronological()
    .map(toMeta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEssaySlugs(): string[] {
  return publishedChronological().map((e) => e.slug);
}

export function getEssayBySlug(slug: string): Essay | null {
  const match = publishedChronological().find((e) => e.slug === slug);
  if (!match) return null;
  return { ...toMeta(match), content: match.content };
}
