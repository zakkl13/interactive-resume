import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getEssayBySlug, getEssaySlugs, Essay } from "@/lib/essays";
import WritingShell, { LINKS } from "@/components/writing/WritingShell";

const SITE = "https://zakk.io";

interface EssayPageProps {
  essay: Essay;
}

const pad2 = (n: number): string => n.toString().padStart(2, "0");

// Render markdown images as captioned figures (alt text doubles as the caption),
// and unwrap the paragraph react-markdown would otherwise nest the figure inside.
const markdownComponents = {
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="wr-figure">
      <img src={src} alt={alt ?? ""} loading="lazy" />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  ),
  p: ({ node, children }: { node?: any; children?: React.ReactNode }) => {
    const kids = node?.children;
    if (kids?.length === 1 && kids[0].type === "element" && kids[0].tagName === "img") {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
};

const EssayPage: React.FC<EssayPageProps> = ({ essay }) => {
  const url = `${SITE}/writing/${essay.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.summary,
    datePublished: essay.date,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: "Zakk Lefkowits",
      url: SITE,
    },
  };

  const kicker = `ESSAY ${pad2(essay.number)} · ${essay.dateDisplay.toUpperCase()} · ${essay.readingTime} MIN READ`;

  return (
    <>
      <Head>
        <title>{essay.title} | Zakk Lefkowits</title>
        <meta name="description" content={essay.summary} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={essay.title} />
        <meta property="og:description" content={essay.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}/og-writing.png`} />
        <meta property="article:published_time" content={essay.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={essay.title} />
        <meta name="twitter:description" content={essay.summary} />
        <meta name="twitter:image" content={`${SITE}/og-writing.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <WritingShell>
        <article className="wr-wrap">
          <Link href="/writing" className="wr-back">
            &larr; Writing
          </Link>

          {essay.coverImage && (
            <img
              className="wr-cover"
              src={essay.coverImage}
              alt={essay.coverAlt ?? ""}
            />
          )}

          <div className="wr-essay-kicker">{kicker}</div>
          <h1 className="wr-essay-title">{essay.title}</h1>
          <p className="wr-deck">{essay.summary}</p>
          <hr className="wr-rule" />

          <div className="wr-prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {essay.content}
            </ReactMarkdown>
          </div>

          <div className="wr-essay-foot">
            {essay.originalUrl && (
              <div className="wr-provenance">
                Originally published on{" "}
                <a href={essay.originalUrl} target="_blank" rel="noopener noreferrer">
                  X &rarr;
                </a>
              </div>
            )}
            {essay.tags && essay.tags.length > 0 && (
              <div className="wr-tags">TAGS: {essay.tags.join(" · ").toUpperCase()}</div>
            )}

            <div className="wr-bio">
              <div className="wr-bio-name">Zakk Lefkowits</div>
              <div className="wr-bio-text">
                Senior software engineer at Amazon Fire TV, building distributed systems and data
                platforms on 100M+ devices, and shipping most of it with AI agents he directs and
                reviews.
              </div>
              <div className="wr-bio-links">
                <Link href={LINKS.resume}>Resume</Link>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>

            <Link href="/writing" className="wr-all-writing">
              &larr; All writing
            </Link>
          </div>
        </article>
      </WritingShell>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getEssaySlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EssayPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const essay = getEssayBySlug(slug);
  if (!essay) return { notFound: true };
  return { props: { essay } };
};

export default EssayPage;
