import React, { useState } from "react";
import Head from "next/head";
import { ResumeSkinProps } from "./types";
import { ResumeData, Experience, Project } from "@/data/resumeData";

const TOKEN_REGEX = /{{(hover|bold|link) text='(.*?)'( context='(.*?)')?( out='(.*?)')?}}/g;

const renderFormatted = (input: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = TOKEN_REGEX.exec(input)) !== null) {
        const [full, type, text, , context, , out] = match;
        if (match.index > lastIndex) {
            parts.push(input.slice(lastIndex, match.index));
        }
        if (type === "hover") {
            parts.push(<HoverTerm key={key++} text={text} context={context || ""} />);
        } else if (type === "bold") {
            parts.push(
                <strong key={key++} className="rz-strong">
                    {text}
                </strong>
            );
        } else if (type === "link") {
            parts.push(
                <a
                    key={key++}
                    href={out}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rz-link"
                >
                    {text}
                </a>
            );
        }
        lastIndex = match.index + full.length;
    }
    if (lastIndex < input.length) {
        parts.push(input.slice(lastIndex));
    }
    TOKEN_REGEX.lastIndex = 0;
    return parts;
};

const HoverTerm: React.FC<{ text: string; context: string }> = ({ text, context }) => {
    const [open, setOpen] = useState(false);
    return (
        <span
            className="rz-hover"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            tabIndex={0}
        >
            {text}
            <span className="rz-tooltip" role="tooltip" aria-hidden={!open} data-open={open}>
                {context}
            </span>
        </span>
    );
};

const compactDuration = (duration: string): string => {
    const norm = duration.replace(/\s+/g, " ").trim();
    const yearMatches = norm.match(/\b(19|20)\d{2}\b/g) || [];
    const hasPresent = /present/i.test(norm);
    const start = yearMatches[0];
    const end = hasPresent ? "PRESENT" : yearMatches[yearMatches.length - 1];
    if (!start) return norm.toUpperCase();
    if (!end || end === start) return start;
    return `${start} — ${end}`;
};

const pad2 = (n: number): string => n.toString().padStart(2, "0");

const ProjectRow: React.FC<{ project: Project; index: number; defaultOpen?: boolean }> = ({
    project,
    index,
    defaultOpen = false,
}) => {
    const [open, setOpen] = useState(defaultOpen);
    const tags = (project.techStack || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    return (
        <div className={`rz-project${open ? " rz-project--open" : ""}`}>
            <button
                type="button"
                className="rz-project-row"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span className="rz-project-num">{pad2(index + 1)}</span>
                <span className="rz-project-title">
                    <span className="rz-project-title-text">{project.title}</span>
                    {tags.length > 0 && (
                        <span className="rz-tag-row">
                            {tags.map((t, i) => (
                                <span key={i} className="rz-tag">
                                    {t}
                                </span>
                            ))}
                        </span>
                    )}
                </span>
                <span className="rz-project-intro">{renderFormatted(project.intro)}</span>
                <span className="rz-project-toggle" aria-hidden="true">
                    {open ? "–" : "+"}
                </span>
            </button>
            <div className="rz-project-body" data-open={open}>
                <div className="rz-bullets">
                    {project.bullets.map((b, i) => (
                        <div key={i} className="rz-bullet">
                            <span className="rz-bullet-num">{pad2(i + 1)}</span>
                            <span className="rz-bullet-text">{renderFormatted(b)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ExperienceRecord: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
    const isFirstRole = index === 0;
    return (
        <article className="rz-exp">
            <header className="rz-exp-banner">
                <div className="rz-exp-num">{pad2(index + 1)}</div>
                <div className="rz-exp-meta">
                    <div className="rz-kicker">EXP / {pad2(index + 1)}</div>
                    <div className="rz-exp-titleline">
                        <h3 className="rz-exp-title">{exp.title}</h3>
                        <span className="rz-exp-company">{renderFormatted(exp.company)}</span>
                    </div>
                </div>
                <div className="rz-exp-range">{compactDuration(exp.duration)}</div>
            </header>
            {exp.roleSummary && <p className="rz-exp-summary">{renderFormatted(exp.roleSummary)}</p>}
            <div className="rz-ledger">
                <div className="rz-ledger-head">
                    <span>#</span>
                    <span>PROJECT</span>
                    <span>SUMMARY</span>
                    <span aria-hidden="true"></span>
                </div>
                {exp.projects.map((p, i) => (
                    <ProjectRow key={i} project={p} index={i} defaultOpen={isFirstRole && i === 0} />
                ))}
            </div>
        </article>
    );
};

const SectionHead: React.FC<{ num: string; name: string }> = ({ num, name }) => (
    <div className="rz-section-head">
        <span className="rz-section-num">{num}</span>
        <span className="rz-section-name">{name}</span>
        <span className="rz-section-rule" aria-hidden="true" />
    </div>
);

const SpecSheetResume: React.FC<ResumeSkinProps> = ({ data }) => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700;800&family=JetBrains+Mono:wght@500&display=swap"
                />
            </Head>
            <div className="rz-skin">
                <div className="rz-accent-bar" aria-hidden="true" />

                <div className="rz-page">
                    <div className="rz-meta-strip">
                        <span>SPEC SHEET</span>
                        <span className="rz-meta-sep" aria-hidden="true">/</span>
                        <span>REV. 26.05</span>
                        <span className="rz-meta-sep" aria-hidden="true">/</span>
                        <span>SR. SOFTWARE ENGINEER</span>
                        <span className="rz-spacer" aria-hidden="true" />
                        <span>PG. 01 / 01</span>
                    </div>

                    <section className="rz-hero">
                        <div className="rz-hero-id">
                            <div className="rz-kicker rz-kicker--accent">SUBJECT</div>
                            <h1 className="rz-name">
                                {data.name.split(" ").map((part, i) => (
                                    <span key={i}>{part}</span>
                                ))}
                            </h1>
                            <div className="rz-subject-line">
                                SR. SOFTWARE ENGINEER &middot; 9 YRS IN PROD &middot; BASE:{" "}
                                {renderFormatted(data.location)}
                            </div>
                        </div>
                        <div className="rz-hero-right">
                            <div className="rz-portrait">
                                <img
                                    src="/zheadshot.png"
                                    alt="Zakk Lefkowits, portrait"
                                    className="rz-portrait-img"
                                />
                            </div>
                            <div className="rz-caption">FIG. 01 — SUBJECT, PORTRAIT.</div>
                        </div>
                    </section>

                    <section className="rz-abstract-row">
                        <div className="rz-abstract">
                            <SectionHead num="§ 01" name="ABSTRACT" />
                            <p className="rz-abstract-body">{renderFormatted(data.summary)}</p>
                        </div>
                        <div className="rz-numbers">
                            <SectionHead num="§ 02" name="BY THE NUMBERS" />
                            <div className="rz-metric-grid">
                                {(data.metrics || []).map((m, i) => (
                                    <div key={i} className="rz-metric">
                                        <span className="rz-metric-idx">{pad2(i + 1)}</span>
                                        <span className="rz-metric-val">{m.value}</span>
                                        <span className="rz-metric-label">{m.label}</span>
                                        <span className="rz-metric-note">{m.note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="rz-exp-section">
                        <SectionHead num="§ 03" name="EXPERIENCE" />
                        <div className="rz-exp-list">
                            {data.experience.map((exp, i) => (
                                <ExperienceRecord key={i} exp={exp} index={i} />
                            ))}
                        </div>
                    </section>

                    {data.skills && data.skills.length > 0 && (
                        <section className="rz-skills-section">
                            <SectionHead num="§ 04" name="SPECIFICATIONS" />
                            <div className="rz-skills-grid">
                                {data.skills.map((s, i) => (
                                    <div key={i} className="rz-skill-col">
                                        <div className="rz-skill-head">
                                            <span className="rz-skill-num">{pad2(i + 1)}</span>
                                            <span className="rz-skill-cat">{s.category.toUpperCase()}</span>
                                        </div>
                                        <ul className="rz-skill-list">
                                            {s.items.map((it, j) => (
                                                <li key={j} className="rz-skill-item">
                                                    <span className="rz-skill-idx">{pad2(j + 1)}</span>
                                                    <span>{it}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="rz-edu-section">
                        <SectionHead num="§ 05" name="EDUCATION" />
                        {data.education.map((edu, i) => {
                            const schoolParts = edu.school.split(";").map((p) => p.trim());
                            const schoolName = schoolParts[0] || edu.school;
                            const rest = schoolParts.slice(1);
                            return (
                                <div key={i} className="rz-edu-row">
                                    <div className="rz-edu-left">
                                        <div className="rz-edu-school">{schoolName}</div>
                                        <div className="rz-edu-degree">{edu.degree}</div>
                                    </div>
                                    <div className="rz-edu-right">
                                        {rest.map((r, j) => (
                                            <div key={j}>{r.toUpperCase()}</div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    <footer className="rz-footer">
                        <div className="rz-footer-left">
                            <div className="rz-signoff">{data.name.toUpperCase()}</div>
                            <div className="rz-contact">
                                <a className="rz-contact-link" href={`mailto:${data.email}`}>
                                    {data.email}
                                </a>
                                <span aria-hidden="true">&middot;</span>
                                <a className="rz-contact-link" href={data.github} target="_blank" rel="noopener noreferrer">
                                    GITHUB
                                </a>
                                <span aria-hidden="true">&middot;</span>
                                <a className="rz-contact-link" href={data.linkedin} target="_blank" rel="noopener noreferrer">
                                    LINKEDIN
                                </a>
                                <span aria-hidden="true">&middot;</span>
                                <a className="rz-contact-link" href={data.website}>
                                    ZAKK.IO
                                </a>
                            </div>
                        </div>
                        <div className="rz-footer-right">
                            <div className="rz-end">END OF SPEC</div>
                            <div className="rz-doc">REV. 26.05 &middot; DOC.001</div>
                        </div>
                    </footer>
                </div>
            </div>

            <style jsx global>{`
                .rz-skin {
                    --rz-paper: #f7f5f1;
                    --rz-paper-2: #efece4;
                    --rz-ink: #1d1a14;
                    --rz-ink-soft: #3c372d;
                    --rz-ink-mute: #6b6457;
                    --rz-rule-fine: rgba(29, 26, 20, 0.18);
                    --rz-rule-soft: rgba(29, 26, 20, 0.08);
                    --rz-accent: #bc5b3a;
                    --rz-accent-soft: rgba(188, 91, 58, 0.28);
                    --rz-tint-strong: rgba(29, 26, 20, 0.03);
                    --rz-tint-soft: rgba(29, 26, 20, 0.02);
                    --rz-density-pad: 1;
                    --rz-fs: 1;
                    background: var(--rz-paper);
                    color: var(--rz-ink);
                    min-height: 100vh;
                    font-family: "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif;
                    font-feature-settings: "ss01", "cv11";
                    -webkit-font-smoothing: antialiased;
                    position: relative;
                    transition: background-color 200ms ease, color 200ms ease;
                }
                /* Dark mode: warm charcoal paper, same terracotta accent. */
                html.dark .rz-skin {
                    --rz-paper: #14120d;
                    --rz-paper-2: #1d1a13;
                    --rz-ink: #ece7dd;
                    --rz-ink-soft: #c5bdab;
                    --rz-ink-mute: #8f8775;
                    --rz-rule-fine: rgba(236, 231, 221, 0.22);
                    --rz-rule-soft: rgba(236, 231, 221, 0.09);
                    --rz-accent: #e0805a;
                    --rz-accent-soft: rgba(224, 128, 90, 0.3);
                    --rz-tint-strong: rgba(236, 231, 221, 0.05);
                    --rz-tint-soft: rgba(236, 231, 221, 0.03);
                }
                .rz-skin a { color: inherit; text-decoration: none; }
                .rz-skin button { font-family: inherit; background: none; border: 0; padding: 0; cursor: pointer; color: inherit; }
                .rz-skin h1, .rz-skin h2, .rz-skin h3, .rz-skin p, .rz-skin ul { margin: 0; padding: 0; list-style: none; }
                .rz-skin *::selection { background: var(--rz-accent-soft); color: var(--rz-ink); }

                .rz-accent-bar {
                    position: sticky;
                    top: 0;
                    height: 4px;
                    background: var(--rz-accent);
                    z-index: 5;
                }

                .rz-page {
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: calc(36px * var(--rz-density-pad)) calc(56px * var(--rz-density-pad));
                }

                .rz-meta-strip {
                    display: flex;
                    align-items: baseline;
                    gap: 24px;
                    border-bottom: 1px solid var(--rz-ink);
                    padding: 16px 0 24px;
                    font-size: calc(10.5px * var(--rz-fs));
                    font-weight: 600;
                    letter-spacing: 0.16em;
                    color: var(--rz-ink-mute);
                    text-transform: uppercase;
                }
                .rz-spacer { flex: 1; }

                .rz-kicker {
                    font-size: calc(10.5px * var(--rz-fs));
                    letter-spacing: 0.18em;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: var(--rz-ink-mute);
                }
                .rz-kicker--accent { color: var(--rz-accent); letter-spacing: 0.18em; }

                .rz-meta-sep { color: var(--rz-rule-fine); font-weight: 400; }

                .rz-hero {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 32px;
                    padding: 24px 0 20px;
                }
                .rz-hero-id { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
                .rz-name {
                    display: flex;
                    flex-direction: column;
                    font-size: clamp(calc(56px * var(--rz-fs)), 11vw, calc(132px * var(--rz-fs)));
                    line-height: 0.88;
                    letter-spacing: -0.04em;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: var(--rz-ink);
                }
                .rz-subject-line {
                    font-size: calc(11px * var(--rz-fs));
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: var(--rz-ink-mute);
                }
                .rz-hero-right { display: flex; flex-direction: column; gap: 6px; width: 210px; flex: none; }
                .rz-portrait {
                    aspect-ratio: 4 / 5;
                    width: 100%;
                    border: 1px solid var(--rz-ink);
                    background: var(--rz-paper-2);
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .rz-portrait-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.02); }
                .rz-caption {
                    font-size: 9.5px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--rz-ink-mute);
                    font-weight: 600;
                }

                .rz-section-head {
                    display: flex;
                    align-items: baseline;
                    gap: 12px;
                    margin-bottom: 14px;
                }
                .rz-section-num {
                    font-size: 11px;
                    letter-spacing: 0.12em;
                    font-weight: 700;
                    color: var(--rz-accent);
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                .rz-section-name {
                    font-size: 13px;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    font-weight: 700;
                    color: var(--rz-ink);
                    white-space: nowrap;
                }
                .rz-section-rule {
                    flex: 1;
                    height: 1px;
                    background: var(--rz-ink);
                }

                .rz-abstract-row {
                    display: grid;
                    grid-template-columns: 1fr 1.4fr;
                    gap: 48px;
                    margin-top: 40px;
                    align-items: stretch;
                }
                .rz-abstract { display: flex; flex-direction: column; }
                .rz-abstract-body {
                    font-size: calc(17.5px * var(--rz-fs));
                    line-height: 1.5;
                    letter-spacing: -0.005em;
                    color: var(--rz-ink);
                    flex: 1;
                }
                .rz-numbers { display: flex; flex-direction: column; }
                .rz-metric-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    border-top: 2px solid var(--rz-ink);
                    border-left: 2px solid var(--rz-ink);
                    flex: 1;
                }
                .rz-metric {
                    border-right: 2px solid var(--rz-ink);
                    border-bottom: 2px solid var(--rz-ink);
                    padding: 20px 12px 10px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    background: var(--rz-paper);
                }
                .rz-metric-idx {
                    position: absolute;
                    top: 8px;
                    left: 10px;
                    font-size: 9.5px;
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    color: var(--rz-ink-mute);
                }
                .rz-metric-val {
                    margin-top: 0;
                    font-size: clamp(calc(28px * var(--rz-fs)), 3.4vw, calc(40px * var(--rz-fs)));
                    line-height: 0.95;
                    letter-spacing: -0.035em;
                    font-weight: 800;
                    color: var(--rz-ink);
                    text-transform: uppercase;
                }
                .rz-metric-label {
                    font-size: 10px;
                    letter-spacing: 0.12em;
                    font-weight: 700;
                    color: var(--rz-accent);
                    text-transform: uppercase;
                }
                .rz-metric-note {
                    font-size: 11px;
                    color: var(--rz-ink-mute);
                    line-height: 1.35;
                }

                .rz-exp-section { margin-top: 56px; }
                .rz-exp-list { display: flex; flex-direction: column; }
                .rz-exp {
                    border-top: 2px solid var(--rz-ink);
                    padding-top: 14px;
                    padding-bottom: 32px;
                }
                .rz-exp-banner {
                    display: grid;
                    grid-template-columns: 64px 1fr auto;
                    gap: 16px;
                    align-items: baseline;
                }
                .rz-exp-num {
                    font-size: 52px;
                    font-weight: 800;
                    line-height: 0.9;
                    letter-spacing: -0.04em;
                    color: var(--rz-ink);
                }
                .rz-exp-meta { display: flex; flex-direction: column; gap: 6px; }
                .rz-exp-titleline {
                    display: flex;
                    align-items: baseline;
                    flex-wrap: wrap;
                    gap: 6px 14px;
                }
                .rz-exp-title {
                    font-size: 27px;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                    color: var(--rz-ink);
                }
                .rz-exp-company { font-size: 16px; color: var(--rz-ink-soft); }
                .rz-exp-range {
                    font-size: 12.5px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    color: var(--rz-ink-mute);
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                .rz-exp-summary {
                    font-size: 15px;
                    color: var(--rz-ink-mute);
                    line-height: 1.5;
                    margin: 10px 0 22px;
                }

                .rz-ledger { display: flex; flex-direction: column; }
                .rz-ledger-head {
                    display: grid;
                    grid-template-columns: 48px 220px 1fr 36px;
                    gap: 16px;
                    padding: 8px 0;
                    border-bottom: 1px solid var(--rz-ink);
                    font-size: 11px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    font-weight: 700;
                    color: var(--rz-ink-mute);
                }
                .rz-project {
                    border-bottom: 1px solid var(--rz-rule-fine);
                    padding: 12px 0 14px;
                }
                .rz-project--open { border-bottom: 1px solid var(--rz-ink); background: var(--rz-tint-strong); }
                .rz-project-row {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 48px 220px 1fr 36px;
                    gap: 16px;
                    align-items: start;
                    text-align: left;
                    transition: background-color 120ms ease;
                }
                .rz-project-row:hover { background: var(--rz-tint-soft); }
                .rz-project-num {
                    font-size: 27px;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: var(--rz-ink);
                    line-height: 1.1;
                }
                .rz-project-title { display: flex; flex-direction: column; gap: 10px; }
                .rz-project-title-text {
                    font-size: 16.5px;
                    font-weight: 700;
                    line-height: 1.25;
                    color: var(--rz-ink);
                }
                .rz-tag-row { display: flex; flex-wrap: wrap; gap: 4px; }
                .rz-tag {
                    font-size: 9.5px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--rz-ink-mute);
                    border: 1px solid var(--rz-rule-fine);
                    padding: 2px 6px;
                }
                .rz-project-intro {
                    font-size: 14.5px;
                    line-height: 1.5;
                    color: var(--rz-ink-soft);
                }
                .rz-project-toggle {
                    font-size: 27px;
                    font-weight: 700;
                    line-height: 1;
                    color: var(--rz-ink);
                    justify-self: end;
                    transition: color 120ms ease;
                }
                .rz-project--open .rz-project-toggle { color: var(--rz-accent); }

                .rz-project-body {
                    overflow: hidden;
                    max-height: 0;
                    transition: max-height 400ms cubic-bezier(0.22, 1, 0.36, 1);
                }
                .rz-project-body[data-open="true"] {
                    max-height: 2000px;
                }
                .rz-bullets {
                    padding: 4px 0 22px 64px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .rz-bullet {
                    display: grid;
                    grid-template-columns: 36px 1fr;
                    gap: 8px;
                    align-items: baseline;
                }
                .rz-bullet-num {
                    font-size: 13.5px;
                    font-weight: 700;
                    color: var(--rz-accent);
                    letter-spacing: 0.04em;
                }
                .rz-bullet-text {
                    font-size: 14.5px;
                    line-height: 1.55;
                    color: var(--rz-ink-soft);
                }

                .rz-skills-section { margin-top: 56px; }
                .rz-skills-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0;
                    border-top: 1px solid var(--rz-ink);
                }
                .rz-skill-col {
                    padding: 16px 18px 8px 0;
                    border-right: 1px solid var(--rz-rule-soft);
                }
                .rz-skill-col:nth-child(3n) { border-right: 0; }
                .rz-skill-col + .rz-skill-col { padding-left: 18px; }
                .rz-skill-head {
                    display: flex;
                    align-items: baseline;
                    gap: 12px;
                    margin-bottom: 10px;
                }
                .rz-skill-num {
                    font-size: 24px;
                    font-weight: 800;
                    color: var(--rz-ink);
                    line-height: 1;
                }
                .rz-skill-cat {
                    font-size: 10.5px;
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: var(--rz-ink);
                }
                .rz-skill-list { display: flex; flex-direction: column; }
                .rz-skill-item {
                    display: grid;
                    grid-template-columns: 24px 1fr;
                    gap: 6px;
                    align-items: baseline;
                    padding: 6px 0;
                    border-bottom: 1px solid var(--rz-rule-soft);
                    font-size: 12.5px;
                    color: var(--rz-ink);
                }
                .rz-skill-item:last-child { border-bottom: 0; }
                .rz-skill-idx {
                    font-size: 10px;
                    color: var(--rz-ink-mute);
                    font-weight: 600;
                    letter-spacing: 0.06em;
                }

                .rz-edu-section { margin-top: 56px; }
                .rz-edu-row {
                    display: grid;
                    grid-template-columns: 1fr 220px;
                    gap: 24px;
                    border-top: 1px solid var(--rz-ink);
                    padding: 16px 0;
                }
                .rz-edu-school { font-size: 18px; font-weight: 800; color: var(--rz-ink); line-height: 1.2; }
                .rz-edu-degree { font-size: 13px; color: var(--rz-ink-soft); margin-top: 4px; }
                .rz-edu-right {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    color: var(--rz-ink-mute);
                }

                .rz-footer {
                    margin-top: 48px;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 24px;
                    border-top: 2px solid var(--rz-ink);
                    padding-top: 16px;
                }
                .rz-signoff {
                    font-size: 14px;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--rz-ink);
                    margin-bottom: 6px;
                }
                .rz-contact {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    gap: 8px;
                    font-size: 11.5px;
                    color: var(--rz-ink-soft);
                }
                .rz-contact-link {
                    border-bottom: 1px solid var(--rz-rule-fine);
                    padding-bottom: 1px;
                    transition: border-color 120ms ease, color 120ms ease;
                }
                .rz-contact-link:hover { border-color: var(--rz-accent); color: var(--rz-accent); }
                .rz-footer-right { text-align: right; display: flex; flex-direction: column; gap: 4px; }
                .rz-end {
                    font-size: 10.5px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    color: var(--rz-ink);
                    text-transform: uppercase;
                }
                .rz-doc {
                    font-size: 10.5px;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    color: var(--rz-ink-mute);
                    text-transform: uppercase;
                }

                .rz-strong {
                    font-weight: 700;
                    background-image: linear-gradient(transparent 60%, var(--rz-accent-soft) 60%);
                    background-repeat: no-repeat;
                    color: var(--rz-ink);
                }
                .rz-link {
                    color: var(--rz-accent);
                    border-bottom: 1px solid var(--rz-accent);
                    transition: background-color 120ms ease;
                    padding: 0 1px;
                }
                .rz-link:hover { background: var(--rz-accent-soft); }

                .rz-hover {
                    position: relative;
                    border-bottom: 1px dotted currentColor;
                    cursor: help;
                    outline: none;
                }
                .rz-hover:focus { box-shadow: 0 0 0 2px var(--rz-accent-soft); }
                .rz-tooltip {
                    position: absolute;
                    bottom: calc(100% + 8px);
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--rz-ink);
                    color: var(--rz-paper);
                    padding: 6px 10px;
                    font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
                    font-size: 11px;
                    line-height: 1.4;
                    white-space: nowrap;
                    border-radius: 4px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 140ms ease;
                    z-index: 30;
                }
                .rz-tooltip[data-open="true"] { opacity: 1; }
                .rz-tooltip::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -4px;
                    border: 4px solid transparent;
                    border-top-color: var(--rz-ink);
                }

                @media (max-width: 900px) {
                    .rz-page { padding: calc(28px * var(--rz-density-pad)) calc(20px * var(--rz-density-pad)); }
                    .rz-hero { align-items: flex-start; gap: 20px; }
                    .rz-hero-right { width: 120px; }
                    .rz-abstract-row { grid-template-columns: 1fr; gap: 32px; }
                    .rz-metric-grid { grid-template-columns: repeat(2, 1fr); }
                    .rz-meta-strip { flex-wrap: wrap; gap: 8px 16px; }
                    .rz-exp-banner { grid-template-columns: 48px 1fr; }
                    .rz-exp-range { grid-column: 1 / -1; padding-left: 56px; }
                    .rz-exp-summary { margin-left: 0; }
                    .rz-ledger-head, .rz-project-row { grid-template-columns: 36px 1fr 36px; }
                    .rz-ledger-head > :nth-child(3) { display: none; }
                    .rz-project-row > .rz-project-intro { grid-column: 2 / 4; padding-top: 8px; }
                    .rz-project-row > .rz-project-toggle { grid-column: 1; justify-self: start; }
                    .rz-bullets { padding-left: 36px; }
                    .rz-skills-grid { grid-template-columns: 1fr; }
                    .rz-skill-col { border-right: 0; border-bottom: 1px solid var(--rz-rule-soft); padding: 16px 0; }
                    .rz-edu-row { grid-template-columns: 1fr; }
                    .rz-edu-right { text-align: left; }
                    .rz-tooltip { white-space: normal; max-width: 220px; }
                }

                @media (max-width: 540px) {
                    .rz-hero { flex-direction: column; align-items: flex-start; gap: 22px; }
                    .rz-hero-right { width: 120px; }
                    .rz-name {
                        font-size: clamp(calc(42px * var(--rz-fs)), 15vw, calc(80px * var(--rz-fs)));
                        overflow-wrap: anywhere;
                    }
                }
            `}</style>
        </>
    );
};

export default SpecSheetResume;
