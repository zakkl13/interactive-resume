# One-page PDF resume (Typst)

A standalone one-page resume built with [Typst](https://typst.app). Styling is a
self-contained local template (`template.typ`) with **no external Typst
packages**; its look is inspired by
[modern-cv](https://github.com/ptsouchlos/modern-cv) / Awesome-CV. This is a
**separate data stack** from the web resume (`data/resumeData.ts`): edit
`resume.typ` directly. (Unifying the two behind a shared data pool is a later
step; for now they are intentionally parallel.)

- `resume.typ` — content (your data + the section layout)
- `template.typ` — all styling: header, fonts, colors, section rules, entries

## Setup (once)

```bash
npm run resume:fonts   # vendors FontAwesome, Source Sans 3, Roboto into fonts/
```

Fonts land in `fonts/` (gitignored) and the build points Typst at them with
`--font-path`, so nothing is installed system-wide. No Typst packages are
downloaded: the template is fully local.

## Iteration loop

```bash
npm run resume:watch   # recompiles out/resume.pdf on every save
```

Open `out/resume.pdf` in a viewer that auto-reloads. macOS Preview does not
refresh reliably; [Skim](https://skim-app.sourceforge.io) does (enable
*Preferences > Sync > Check for file changes*). Then: edit `resume.typ`, save,
watch the PDF update.

## One-off build

```bash
npm run resume:pdf       # -> public/Zakk_Lefkowits_Resume.pdf (the file the web resume links to)
npm run resume:preview   # -> out/preview.png (raster preview at 144 ppi)
```

`resume:pdf` writes straight to `public/`, so the compiled PDF is the exact file
served at `/Zakk_Lefkowits_Resume.pdf` and linked from the resume page's control
bar. Commit the regenerated PDF along with any `resume.typ` change. (`resume:watch`
still writes `out/resume.pdf` for the live-reload iteration loop.)

## Staying in sync with the web resume

This file and `data/resumeData.ts` are intentionally separate (the PDF is a curated
one-page subset). A drift gate guards the parts that *should* match: the summary,
skills, experience headers and role summaries, project titles/stacks, and every
number/metric. It does not require the files be identical.

```bash
npm run resume:drift          # check both files; exits non-zero on unaccepted drift
npm run resume:drift:accept   # record current divergences as intentional
```

Intentional divergences (e.g. the Live TV project living only on the web, numbers
that only appear in a web-only intro) live in `drift-accepted.json`. The gate stays
silent on accepted ones and re-trips only when the underlying text changes. A
scoped `pre-commit` hook (`.githooks/pre-commit`, enabled via
`git config core.hooksPath .githooks`) runs the check automatically whenever
`resumeData.ts` or `resume.typ` is staged; bypass with `git commit --no-verify`.
The checker runs on Node's native TypeScript stripping, so no extra tooling is
needed. `resumeData.ts` is the canonical source when they disagree.

## Notes

- Content lives in `resume.typ`. The `resume.with(...)` block at the top sets the
  header (name, contact items), accent color, fonts, and paper size; sections
  below use `resume-entry`, `resume-item`, and `resume-skill-item`.
- Styling lives in `template.typ`: palette, header layout, contact icons
  (Font Awesome codepoints), section-header rule, entry/skill formatting. Tune
  the format there.
- Keep it to one page: `out/resume.pdf` should stay a single page. If content
  overflows, trim bullets rather than shrinking the whole layout.
