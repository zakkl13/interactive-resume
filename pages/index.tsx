import React from "react";
import Head from "next/head";
import HomePage from "@/components/homepage";
import { homeDefault } from "@/data/homeData";

const SITE = "https://zakk.io";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Zakk Lefkowits",
  url: SITE,
  image: `${SITE}/zheadshot.png`,
  jobTitle: "Senior Software Engineer",
  description:
    "Senior Software Engineer at Amazon Fire TV: distributed systems and data platforms running on 100M+ devices, agentic engineering.",
  worksFor: {
    "@type": "Organization",
    name: "Amazon",
    url: "https://www.amazon.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Virginia Tech",
  },
  sameAs: [homeDefault.linkedin, homeDefault.github],
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

const ResumePage: React.FC = () => {

  return (
    <div className="bg-gradient-to-r from-yellow-200 to-yellow-500 dark:from-gray-900 dark:to-indigo-900">
      <Head>
        <title>Zakk Lefkowits | zakk.io</title>
        <meta name="description" content="Zakk Lefkowits: Senior Software Engineer at Amazon Fire TV. Distributed systems, data platforms, and agentic engineering." />
        <link rel="canonical" href={SITE} />
        <meta property="og:title" content="Zakk Lefkowits | zakk.io" />
        <meta property="og:description" content="Senior Software Engineer at Amazon Fire TV. Distributed systems, data platforms, and agentic engineering." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE} />
        <meta property="og:image" content={`${SITE}/zheadshot.png`} />
        <meta name="twitter:card" content="summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>
      <div className="max-w-5xl mx-auto">
        <HomePage data={homeDefault} />
      </div>
    </div>
  );
};

export default ResumePage;