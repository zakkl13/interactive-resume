import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllEssayMeta, EssayMeta } from "@/lib/essays";
import WritingShell, { LINKS } from "@/components/writing/WritingShell";

const SITE = "https://zakk.io";

interface WritingIndexProps {
  essays: EssayMeta[];
}

const shortDate = (iso: string): string => {
  const d = new Date(`${iso}T12:00:00Z`);
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
};

const pad2 = (n: number): string => n.toString().padStart(2, "0");

const WritingIndex: React.FC<WritingIndexProps> = ({ essays }) => {
  return (
    <>
      <Head>
        <title>Writing | Zakk Lefkowits</title>
        <meta
          name="description"
          content="Essays on software engineering, AI engineering, and agents, by Zakk Lefkowits."
        />
        <link rel="canonical" href={`${SITE}/writing`} />
        <meta property="og:title" content="Writing | Zakk Lefkowits" />
        <meta
          property="og:description"
          content="Essays on software engineering, AI engineering, and agents."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/writing`} />
        <meta property="og:image" content={`${SITE}/og-writing.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <WritingShell>
        <div className="wr-wrap">
          <header>
            <Link href="/" className="wr-home-link">
              Zakk Lefkowits
            </Link>
            <h1 className="wr-list-title">Writing</h1>
            <p className="wr-standfirst">
              Essays on software engineering, AI engineering, and agents.
              <a className="wr-rss" href={LINKS.rss} target="_blank" rel="noopener noreferrer">
                RSS
              </a>
            </p>
          </header>

          <div className="wr-list">
            {essays.map((essay) => (
              <Link key={essay.slug} href={`/writing/${essay.slug}`} className="wr-row">
                <span className="wr-row-num">{pad2(essay.number)}</span>
                <span className="wr-row-title">{essay.title}</span>
                <span className="wr-row-date">{shortDate(essay.date)}</span>
                <span className="wr-row-summary">{essay.summary}</span>
                <span className="wr-row-read">{essay.readingTime} min read</span>
              </Link>
            ))}
          </div>

          <footer className="wr-footer">
            <Link href={LINKS.resume}>Resume</Link>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={LINKS.rss} target="_blank" rel="noopener noreferrer">
              RSS
            </a>
          </footer>
        </div>
      </WritingShell>
    </>
  );
};

export const getStaticProps: GetStaticProps<WritingIndexProps> = async () => {
  return { props: { essays: getAllEssayMeta() } };
};

export default WritingIndex;
