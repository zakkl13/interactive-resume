# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # start dev server (Next.js)
npm run build  # production build
npm run lint   # ESLint via next lint
```

No test suite exists.

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
