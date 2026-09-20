import React from "react";
import Head from "next/head";
import HomePage from "@/components/homepage";
import { homeData } from "@/data/homeData";

const SITE = "https://zakk.io";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Zakk Lefkowits",
  url: SITE,
  image: `${SITE}/zheadshot.png`,
  description: homeData.description,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Virginia Tech",
  },
  sameAs: [homeData.linkedin, homeData.github, homeData.x],
  knowsAbout: [
    "Distributed Systems",
    "Data Engineering",
    "Mobile-Cloud Architecture",
    "Agentic Engineering",
    "LLM Applications & Evaluation",
    "Rust",
    "Java",
    "Kotlin",
    "TypeScript",
    "AWS",
  ],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Zakk Lefkowits | zakk.io</title>
        <meta name="description" content={homeData.description} />
        <link rel="canonical" href={SITE} />
        <meta property="og:title" content="Zakk Lefkowits | zakk.io" />
        <meta property="og:description" content={homeData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE} />
        <meta property="og:image" content={`${SITE}/zheadshot.png`} />
        <meta name="twitter:card" content="summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>
      <HomePage />
    </>
  );
}
