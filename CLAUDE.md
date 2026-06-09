# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # start dev server (Next.js)
npm run build       # production build
npm run lint        # ESLint via next lint
npm run screenshot  # capture the app to ./screenshots/ for visual review
```

No test suite exists.

### Visual review via screenshots

`npm run screenshot` (script: `scripts/screenshot.mjs`, uses Playwright + Chromium) is the way to *see* the app. Run it after any UI change to verify the result. It:
- Starts `npm run dev` automatically if nothing is already serving the base URL, then shuts it down when done (reuses an existing server if one is up).
- Captures the homepage (desktop + mobile) and every resume skin in three views each: desktop light, desktop dark, and mobile (390px). Theme is seeded via `localStorage['theme']` before page load.
- Writes full-page PNGs to `./screenshots/` (gitignored). Read those files back to inspect the result; a runtime crash shows up as the Next.js error overlay (so an unexpectedly tiny/identical pair of images usually means that skin is throwing).

Capture a single target instead of the full set:
```bash
node scripts/screenshot.mjs "/resume?s=git"   # one path
node scripts/screenshot.mjs --url http://localhost:3001
```

## Architecture

**Next.js Pages Router** app. All resume content lives in two data files:
- `data/resumeData.ts` — experience, skills, education, projects
- `data/homeData.ts` — homepage content, photos, social links

These are passed down to presentational components; editing content means editing only these files.

### Resume Skin System

The resume page (`pages/resume/index.tsx`) renders the same `ResumeData` through interchangeable "skin" components. Skins live in `components/skins/`:
- `ClassicResume.tsx`
- `TimelineResume.tsx` (default)
- `GitResume.tsx`

Each skin is registered in `components/skins/index.ts` via the `ResumeSkinDefinition` interface from `components/skins/types.ts`. Adding a new skin means implementing the interface and adding it to the registry. The active skin is persisted via the `?s=` URL query param.

### PDF Export

`components/PdfDocument.tsx` uses `@react-pdf/renderer` to generate a downloadable PDF from `ResumeData`. The floating control bar in the resume page triggers this.

### API Route

`pages/api/qotd.ts` calls OpenAI (gpt-3.5-turbo) to generate a quote of the day. Requires `OPENAI_API_KEY` environment variable; falls back gracefully when absent.

## TypeScript

Path alias `@/*` maps to the repo root (not `/src`). Dark mode uses Tailwind's `dark:` classes with localStorage persistence.
