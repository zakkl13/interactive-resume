import React, { useEffect } from "react";
import Head from "next/head";

// Site chrome links shared across the writing section.
export const LINKS = {
  resume: "/resume",
  writing: "/writing",
  github: "https://github.com/zakkl13",
  linkedin: "https://www.linkedin.com/in/zakklefkowits/",
  rss: "/rss.xml",
};

// Wraps every writing page: seeds dark mode from the same localStorage['theme']
// the resume page uses, renders the accent bar, and carries the scoped wr- CSS.
const WritingShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700&family=JetBrains+Mono:wght@500&display=swap"
        />
        <link rel="alternate" type="application/rss+xml" title="Zakk Lefkowits: Writing" href="/rss.xml" />
      </Head>
      <div className="wr-skin">
        <div className="wr-accent-bar" aria-hidden="true" />
        {children}
      </div>

      <style jsx global>{`
        .wr-skin {
          --wr-paper: #f7f5f1;
          --wr-paper-2: #efece4;
          --wr-ink: #1d1a14;
          --wr-ink-soft: #3c372d;
          --wr-ink-mute: #6b6457;
          --wr-rule-fine: rgba(29, 26, 20, 0.18);
          --wr-rule-soft: rgba(29, 26, 20, 0.08);
          --wr-accent: #bc5b3a;
          --wr-accent-soft: rgba(188, 91, 58, 0.28);
          --wr-tint-strong: rgba(29, 26, 20, 0.04);
          --wr-serif: Georgia, "Iowan Old Style", "Times New Roman", serif;
          --wr-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
          --wr-sans: "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif;
          background: var(--wr-paper);
          color: var(--wr-ink);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          position: relative;
          transition: background-color 200ms ease, color 200ms ease;
        }
        html.dark .wr-skin {
          --wr-paper: #14120d;
          --wr-paper-2: #1d1a13;
          --wr-ink: #ece7dd;
          --wr-ink-soft: #c5bdab;
          --wr-ink-mute: #8f8775;
          --wr-rule-fine: rgba(236, 231, 221, 0.22);
          --wr-rule-soft: rgba(236, 231, 221, 0.09);
          --wr-accent: #e0805a;
          --wr-accent-soft: rgba(224, 128, 90, 0.3);
          --wr-tint-strong: rgba(236, 231, 221, 0.05);
        }
        .wr-skin *::selection {
          background: var(--wr-accent-soft);
          color: var(--wr-ink);
        }
        .wr-skin a {
          color: inherit;
          text-decoration: none;
        }
        .wr-skin :focus-visible {
          outline: 2px solid var(--wr-accent);
          outline-offset: 2px;
        }

        .wr-accent-bar {
          position: sticky;
          top: 0;
          height: 4px;
          background: var(--wr-accent);
          z-index: 5;
        }

        .wr-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 12vh 24px 80px;
        }

        /* mono labels: kickers, dates, reading time, tags, footer */
        .wr-kicker {
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
          font-weight: 500;
        }
        .wr-kicker--accent {
          color: var(--wr-accent);
        }

        .wr-rule {
          height: 1px;
          background: var(--wr-rule-fine);
          border: 0;
          margin: 0;
        }

        /* ===== list page ===== */
        .wr-home-link {
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
          transition: color 120ms ease;
        }
        .wr-home-link:hover {
          color: var(--wr-accent);
        }
        .wr-list-title {
          font-family: var(--wr-sans);
          font-size: clamp(40px, 9vw, 64px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: var(--wr-ink);
          margin: 14px 0 14px;
        }
        .wr-standfirst {
          font-family: var(--wr-serif);
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--wr-ink-soft);
          max-width: 52ch;
        }
        .wr-standfirst .wr-rss {
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--wr-accent);
          border-bottom: 1px solid var(--wr-accent);
          margin-left: 8px;
          white-space: nowrap;
        }
        .wr-list {
          margin-top: 8px;
        }
        .wr-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          column-gap: 16px;
          row-gap: 6px;
          align-items: baseline;
          padding: 26px 12px 26px;
          margin: 0 -12px;
          border-top: 1px solid var(--wr-rule-fine);
          transition: background-color 120ms ease;
        }
        .wr-row:hover {
          background: var(--wr-tint-strong);
        }
        .wr-row-num {
          font-family: var(--wr-mono);
          font-size: 14px;
          font-weight: 500;
          color: var(--wr-accent);
          letter-spacing: 0.02em;
        }
        .wr-row-title {
          font-family: var(--wr-serif);
          font-size: 1.4rem;
          line-height: 1.25;
          font-weight: 700;
          color: var(--wr-ink);
          transition: color 120ms ease;
        }
        .wr-row:hover .wr-row-title {
          color: var(--wr-accent);
        }
        .wr-row-date {
          font-family: var(--wr-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
          text-align: right;
          white-space: nowrap;
        }
        .wr-row-summary {
          grid-column: 2 / 3;
          font-family: var(--wr-serif);
          font-size: 1.0625rem;
          line-height: 1.55;
          color: var(--wr-ink-soft);
          max-width: 56ch;
        }
        .wr-row-read {
          grid-column: 3 / 4;
          font-family: var(--wr-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
          text-align: right;
          white-space: nowrap;
          align-self: end;
        }

        .wr-footer {
          margin-top: 64px;
          padding-top: 20px;
          border-top: 1px solid var(--wr-rule-fine);
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          font-family: var(--wr-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .wr-footer a {
          color: var(--wr-ink-mute);
          border-bottom: 1px solid transparent;
          transition: color 120ms ease, border-color 120ms ease;
        }
        .wr-footer a:hover {
          color: var(--wr-accent);
          border-color: var(--wr-accent);
        }

        /* ===== essay page ===== */
        .wr-back {
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--wr-accent);
          display: inline-block;
          margin-bottom: 48px;
        }
        .wr-back:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .wr-cover {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid var(--wr-rule-fine);
          margin-bottom: 36px;
        }
        .wr-essay-kicker {
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
        }
        .wr-essay-title {
          font-family: var(--wr-serif);
          font-size: clamp(2rem, 6vw, 2.6rem);
          line-height: 1.1;
          font-weight: 700;
          color: var(--wr-ink);
          margin: 14px 0 18px;
          letter-spacing: -0.01em;
        }
        .wr-deck {
          font-family: var(--wr-serif);
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.5;
          color: var(--wr-ink-soft);
          margin-bottom: 28px;
        }

        .wr-prose {
          font-family: var(--wr-serif);
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--wr-ink);
        }
        .wr-prose > * + * {
          margin-top: 1.35em;
        }
        .wr-prose h2 {
          font-family: var(--wr-serif);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--wr-ink);
          margin-top: 2.2em;
          padding-top: 1.1em;
          border-top: 1px solid var(--wr-rule-fine);
        }
        .wr-prose h3 {
          font-family: var(--wr-serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--wr-ink);
          margin-top: 1.8em;
        }
        .wr-prose strong {
          font-weight: 700;
          color: var(--wr-ink);
        }
        .wr-prose em {
          font-style: italic;
        }
        .wr-prose a {
          color: var(--wr-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
        }
        .wr-prose a:hover {
          background: var(--wr-accent-soft);
        }
        .wr-prose ul,
        .wr-prose ol {
          padding-left: 1.4em;
        }
        .wr-prose li + li {
          margin-top: 0.5em;
        }
        .wr-prose li::marker {
          color: var(--wr-ink-mute);
        }
        .wr-prose blockquote {
          border-left: 3px solid var(--wr-accent);
          padding-left: 1em;
          color: var(--wr-ink-soft);
          font-style: italic;
        }
        .wr-prose img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        /* Matte frame so white-background illustrations sit on paper, not as
           bright cards floating on the dark charcoal in dark mode. */
        .wr-figure {
          margin: 2em auto;
          max-width: 460px;
          padding: 16px;
          background: var(--wr-paper-2);
          border: 1px solid var(--wr-rule-fine);
        }
        .wr-figure img {
          border: 1px solid var(--wr-rule-fine);
        }
        .wr-figure figcaption {
          margin-top: 14px;
          font-family: var(--wr-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
          text-align: center;
        }
        .wr-prose code {
          font-family: var(--wr-mono);
          font-size: 0.9em;
          background: var(--wr-paper-2);
          border: 1px solid var(--wr-rule-fine);
          border-radius: 3px;
          padding: 0.1em 0.35em;
        }
        .wr-prose pre {
          font-family: var(--wr-mono);
          font-size: 0.875rem;
          line-height: 1.6;
          background: var(--wr-paper-2);
          border: 1px solid var(--wr-rule-fine);
          border-radius: 4px;
          padding: 16px 18px;
          overflow-x: auto;
        }
        .wr-prose pre code {
          background: none;
          border: 0;
          padding: 0;
          font-size: inherit;
        }
        .wr-prose table {
          border-collapse: collapse;
          width: 100%;
          font-size: 0.95rem;
        }
        .wr-prose th,
        .wr-prose td {
          border: 1px solid var(--wr-rule-fine);
          padding: 8px 12px;
          text-align: left;
        }
        .wr-prose th {
          font-family: var(--wr-sans);
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* highlight.js tokens, tuned to the paper backgrounds (both modes) */
        .wr-prose .hljs-comment,
        .wr-prose .hljs-quote {
          color: var(--wr-ink-mute);
          font-style: italic;
        }
        .wr-prose .hljs-keyword,
        .wr-prose .hljs-selector-tag,
        .wr-prose .hljs-built_in,
        .wr-prose .hljs-name,
        .wr-prose .hljs-tag {
          color: var(--wr-accent);
        }
        .wr-prose .hljs-string,
        .wr-prose .hljs-title,
        .wr-prose .hljs-section,
        .wr-prose .hljs-attribute,
        .wr-prose .hljs-literal,
        .wr-prose .hljs-template-tag,
        .wr-prose .hljs-template-variable,
        .wr-prose .hljs-type,
        .wr-prose .hljs-addition {
          color: var(--wr-ink-soft);
        }
        .wr-prose .hljs-number,
        .wr-prose .hljs-symbol,
        .wr-prose .hljs-bullet,
        .wr-prose .hljs-attr,
        .wr-prose .hljs-variable,
        .wr-prose .hljs-meta {
          color: var(--wr-ink);
        }
        .wr-prose .hljs-emphasis {
          font-style: italic;
        }
        .wr-prose .hljs-strong {
          font-weight: 700;
        }

        .wr-essay-foot {
          margin-top: 56px;
          padding-top: 24px;
          border-top: 1px solid var(--wr-rule-fine);
        }
        .wr-provenance {
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--wr-ink-mute);
        }
        .wr-provenance a {
          color: var(--wr-accent);
          border-bottom: 1px solid var(--wr-accent);
        }
        .wr-tags {
          margin-top: 12px;
          font-family: var(--wr-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
        }
        .wr-bio {
          margin-top: 40px;
          padding: 24px;
          border: 1px solid var(--wr-rule-fine);
          background: var(--wr-paper-2);
        }
        .wr-bio-name {
          font-family: var(--wr-sans);
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--wr-ink);
        }
        .wr-bio-text {
          font-family: var(--wr-serif);
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--wr-ink-soft);
          margin-top: 6px;
        }
        .wr-bio-links {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-family: var(--wr-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .wr-bio-links a {
          color: var(--wr-accent);
          border-bottom: 1px solid transparent;
          transition: border-color 120ms ease;
        }
        .wr-bio-links a:hover {
          border-color: var(--wr-accent);
        }
        .wr-all-writing {
          display: inline-block;
          margin-top: 36px;
          font-family: var(--wr-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--wr-ink-mute);
        }
        .wr-all-writing:hover {
          color: var(--wr-accent);
        }

        @media (max-width: 640px) {
          .wr-wrap {
            padding: 8vh 20px 64px;
          }
          .wr-row {
            grid-template-columns: 1fr auto;
          }
          .wr-row-num {
            grid-column: 1 / -1;
          }
          .wr-row-title {
            grid-column: 1 / 2;
            font-size: 1.25rem;
          }
          .wr-row-date {
            grid-column: 2 / 3;
          }
          .wr-row-summary {
            grid-column: 1 / -1;
          }
          .wr-row-read {
            grid-column: 1 / -1;
            text-align: left;
          }
          .wr-essay-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default WritingShell;
