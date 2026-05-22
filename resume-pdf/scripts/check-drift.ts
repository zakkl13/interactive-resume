/**
 * Resume drift gate.
 *
 * Compares the canonical web resume (data/resumeData.ts) against the PDF source
 * (resume-pdf/resume.typ) and flags places that are supposed to match but have
 * drifted. The two files are intentionally NOT one source of truth: the PDF is a
 * curated one-page subset (it drops project intros, omits some projects, trims
 * bullets). So this checker does not demand the files be identical. It checks a
 * focused set of invariants where divergence is almost always a mistake:
 *
 *   - the summary paragraph
 *   - skill categories and their items
 *   - each experience header (company, role, duration) and its role summary
 *   - project titles and tech stacks (matched by title)
 *   - every number / metric (catches a stat updated in one file but not the other)
 *
 * Intentional divergences (e.g. the Live TV project living only on the web, or a
 * number that only appears in a web-only intro) are recorded once in
 * drift-accepted.json. The gate stays silent on accepted divergences and re-trips
 * only if the underlying text changes (the stored fingerprint stops matching).
 *
 * Usage (see package.json):
 *   npm run resume:drift          # check; exits 1 on unaccepted drift
 *   npm run resume:drift:accept   # record current drift as intentional
 *
 * Run with Node's native TS stripping (no ts-node/tsx needed):
 *   node --experimental-strip-types resume-pdf/scripts/check-drift.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { resumeData } from '../../data/resumeData.ts';

const here = import.meta.dirname;
const TYP_PATH = join(here, '..', 'resume.typ');
const BASELINE_PATH = join(here, '..', 'drift-accepted.json');
const BASELINE_COMMENT =
  'Accepted, intentional divergences between data/resumeData.ts (web, canonical) ' +
  'and resume-pdf/resume.typ (PDF subset). Regenerate with: npm run resume:drift:accept. ' +
  "If the underlying text changes, the fingerprint won't match and the gate re-trips. " +
  'Add a "note" to any entry to document why it diverges.';

// ---------------------------------------------------------------------------
// Normalization: reduce both markup dialects to comparable plain text.
// ---------------------------------------------------------------------------

/** Strip web resume {{...}} tokens to their visible text. */
function stripWeb(s: string): string {
  return s
    .replace(/\{\{hover\s+text='([^']*)'(?:\s+context='([^']*)')?\}\}/g, '$1')
    .replace(/\{\{bold\s+text='([^']*)'\}\}/g, '$1')
    .replace(/\{\{link\s+text='([^']*)'(?:\s+out='([^']*)')?\}\}/g, '$1');
}

/** Strip Typst markup (bold, links, escapes) to plain text. */
function stripTypst(s: string): string {
  return s
    .replace(/#strong\[([^\]]*)\]/g, '$1')
    .replace(/#link\("[^"]*"\)\[([^\]]*)\]/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\\([~$<>#*_@])/g, '$1');
}

const norm = (s: string): string => s.replace(/\s+/g, ' ').trim();
const unq = (s: string): string => s.replace(/\\(.)/g, '$1');

/** Extract metric-like tokens (anything containing a digit) as a set. */
function extractNumbers(text: string): Set<string> {
  const out = new Set<string>();
  for (const m of text.matchAll(/[~<>$]*\d[\d.,]*[A-Za-z%]*\+?/g)) {
    const t = m[0].replace(/[.,]+$/, '');
    if (t) out.add(t);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Typst parsing: the .typ structure is regular enough for targeted regex.
// ---------------------------------------------------------------------------

function parseSections(typ: string): Record<string, string> {
  const out: Record<string, string> = {};
  const heads = [...typ.matchAll(/^=\s+(.+?)\s*$/gm)];
  heads.forEach((h, i) => {
    const start = h.index! + h[0].length;
    const end = i + 1 < heads.length ? heads[i + 1].index! : typ.length;
    out[h[1].trim()] = typ.slice(start, end);
  });
  return out;
}

function parseTypSkills(body: string): { category: string; items: string[] }[] {
  const re = /#resume-skill-item\(\s*"((?:[^"\\]|\\.)*)"\s*,\s*\(([\s\S]*?)\)\s*,?\s*\)/g;
  return [...body.matchAll(re)].map((m) => ({
    category: unq(m[1]),
    items: [...m[2].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => unq(x[1])),
  }));
}

function parseTypEntries(body: string): { title: string; description: string; date: string }[] {
  return [...body.matchAll(/#resume-entry\(([\s\S]*?)\)/g)].map((m) => {
    const get = (k: string): string =>
      m[1].match(new RegExp(k + ':\\s*"((?:[^"\\\\]|\\\\.)*)"'))?.[1] ?? '';
    return { title: unq(get('title')), description: unq(get('description')), date: unq(get('date')) };
  });
}

const parseTypLeads = (body: string): string[] =>
  [...body.matchAll(/#resume-lead\[([^\]]*)\]/g)].map((m) => m[1]);

function parseTypProjects(body: string): { title: string; stack: string }[] {
  const re = /#resume-project\(\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*stack:\s*"((?:[^"\\]|\\.)*)")?\s*\)/g;
  return [...body.matchAll(re)].map((m) => ({ title: unq(m[1]), stack: unq(m[2] ?? '') }));
}

// ---------------------------------------------------------------------------
// Build the drift list.
// ---------------------------------------------------------------------------

type Drift = { key: string; label: string; web: string; pdf: string };

const drifts: Drift[] = [];
const compare = (key: string, label: string, web: string, pdf: string): void => {
  const w = norm(web);
  const p = norm(pdf);
  if (w !== p) drifts.push({ key, label, web: w, pdf: p });
};

const typ = readFileSync(TYP_PATH, 'utf8');
const sec = parseSections(typ);
const secSummary = sec['Summary'] ?? '';
const secExperience = sec['Experience'] ?? '';
const secSkills = sec['Skills'] ?? '';

// Summary
compare('summary', 'Summary text', stripWeb(resumeData.summary), stripTypst(secSummary));

// Skills
const webSkills = resumeData.skills;
const typSkills = parseTypSkills(secSkills);
compare(
  'skills:categories',
  'Skill category list',
  webSkills.map((s) => s.category).join(' | '),
  typSkills.map((s) => s.category).join(' | '),
);
for (const cat of new Set([...webSkills, ...typSkills].map((s) => s.category))) {
  const w = webSkills.find((s) => s.category === cat);
  const p = typSkills.find((s) => s.category === cat);
  compare(
    `skills:${cat}`,
    `Skills under "${cat}"`,
    w ? w.items.join(', ') : '(absent)',
    p ? p.items.join(', ') : '(absent)',
  );
}

// Experience headers + role summaries (Typst maps: title=company, description=role, date=duration)
const typEntries = parseTypEntries(secExperience);
const typLeads = parseTypLeads(secExperience);
resumeData.experience.forEach((exp, i) => {
  const e = typEntries[i];
  const tag = `Experience #${i + 1}`;
  if (!e) {
    compare(`exp:${i}`, tag, stripWeb(exp.company), '(absent)');
    return;
  }
  compare(`exp:${i}:company`, `${tag} company`, stripWeb(exp.company), stripTypst(e.title));
  compare(`exp:${i}:role`, `${tag} role`, exp.title, stripTypst(e.description));
  compare(`exp:${i}:duration`, `${tag} duration`, exp.duration, stripTypst(e.date));
  if (exp.roleSummary) {
    compare(`exp:${i}:summary`, `${tag} role summary`, stripWeb(exp.roleSummary), stripTypst(typLeads[i] ?? '(absent)'));
  }
});

// Projects matched by title; stacks compared. Title-only-on-one-side is recorded.
const titleKey = (t: string): string => norm(t).toLowerCase();
const webProjects = new Map(
  resumeData.experience
    .flatMap((e) => e.projects)
    .map((p) => [titleKey(stripWeb(p.title)), { title: stripWeb(p.title), stack: p.techStack ?? '' }]),
);
const typProjects = new Map(
  parseTypProjects(secExperience).map((p) => [
    titleKey(stripTypst(p.title)),
    { title: stripTypst(p.title), stack: stripTypst(p.stack) },
  ]),
);
for (const k of new Set([...webProjects.keys(), ...typProjects.keys()])) {
  const w = webProjects.get(k);
  const p = typProjects.get(k);
  if (!w) compare(`project:${k}`, `Project "${p!.title}" (PDF only)`, '(absent)', p!.title);
  else if (!p) compare(`project:${k}`, `Project "${w.title}" (web only)`, w.title, '(absent)');
  else compare(`project:${k}:stack`, `Tech stack for "${w.title}"`, w.stack, p.stack);
}

// Metrics: every number must appear on both sides (or be explicitly accepted).
const webText = [
  resumeData.summary,
  ...resumeData.experience.flatMap((e) => [
    e.company,
    e.title,
    e.duration,
    e.roleSummary ?? '',
    ...e.projects.flatMap((p) => [p.title, p.intro, p.techStack ?? '', ...p.bullets]),
  ]),
]
  .map(stripWeb)
  .join(' ');
const pdfText = stripTypst(`${secSummary} ${secExperience}`);
const webNums = extractNumbers(webText);
const pdfNums = extractNumbers(pdfText);
for (const n of webNums) if (!pdfNums.has(n)) compare(`metric:web-only:${n}`, `Number "${n}" only in web`, n, '(absent)');
for (const n of pdfNums) if (!webNums.has(n)) compare(`metric:pdf-only:${n}`, `Number "${n}" only in PDF`, '(absent)', n);

// ---------------------------------------------------------------------------
// Baseline + reporting.
// ---------------------------------------------------------------------------

type Accepted = { fingerprint: string; web: string; pdf: string; note?: string };
type Baseline = { _comment?: string; accepted: Record<string, Accepted> };

const fp = (web: string, pdf: string): string =>
  createHash('sha256').update(`${web} ${pdf}`).digest('hex').slice(0, 12);

function readBaseline(): Baseline {
  try {
    const b = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as Baseline;
    return { accepted: b.accepted ?? {} };
  } catch {
    return { accepted: {} };
  }
}

const tty = process.stdout.isTTY;
const paint = (code: string, s: string): string => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
const red = (s: string): string => paint('31', s);
const green = (s: string): string => paint('32', s);
const yellow = (s: string): string => paint('33', s);
const dim = (s: string): string => paint('2', s);
const trunc = (s: string, n = 140): string => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

const baseline = readBaseline();
const isAccepted = (d: Drift): boolean => baseline.accepted[d.key]?.fingerprint === fp(d.web, d.pdf);
const accept = process.argv.includes('--accept');

if (accept) {
  const next: Baseline = { _comment: BASELINE_COMMENT, accepted: {} };
  for (const d of drifts) {
    const prev = baseline.accepted[d.key];
    next.accepted[d.key] = {
      fingerprint: fp(d.web, d.pdf),
      web: d.web,
      pdf: d.pdf,
      ...(prev?.note ? { note: prev.note } : {}),
    };
  }
  const before = new Set(Object.keys(baseline.accepted));
  const after = new Set(Object.keys(next.accepted));
  const added = [...after].filter((k) => !before.has(k)).length;
  const pruned = [...before].filter((k) => !after.has(k)).length;
  writeFileSync(BASELINE_PATH, `${JSON.stringify(next, null, 2)}\n`);
  console.log(green(`✓ Accepted ${after.size} divergence(s) into drift-accepted.json`));
  console.log(dim(`  ${added} new, ${pruned} pruned. Review and commit the file.`));
  process.exit(0);
}

const unaccepted = drifts.filter((d) => !isAccepted(d));
const acceptedCount = drifts.length - unaccepted.length;
const staleKeys = Object.keys(baseline.accepted).filter((k) => !drifts.some((d) => d.key === k));

if (unaccepted.length === 0) {
  console.log(green('✓ resume web / PDF in sync') + dim(` (${acceptedCount} intentional divergence(s) accepted)`));
  if (staleKeys.length) {
    console.log(yellow(`  note: ${staleKeys.length} accepted entr(ies) no longer drift; run resume:drift:accept to prune.`));
  }
  process.exit(0);
}

console.log(red(`✖ resume drift: ${unaccepted.length} unaccepted divergence(s)`));
console.log(dim(`  web = data/resumeData.ts (canonical)   pdf = resume-pdf/resume.typ\n`));
for (const d of unaccepted) {
  console.log(`  ${red('✖')} ${d.label} ${dim(`[${d.key}]`)}`);
  console.log(`      web: ${trunc(d.web)}`);
  console.log(`      pdf: ${trunc(d.pdf)}`);
}
console.log();
console.log('  Align the files, or record these as intentional with:');
console.log(`    ${yellow('npm run resume:drift:accept')}`);
process.exit(1);
