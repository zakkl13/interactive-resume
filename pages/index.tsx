import React from "react";
import Head from "next/head";
import HomePage from "@/components/homepage";
import { homeDefault } from "@/data/homeData";

const ResumePage: React.FC = () => {

  return (
    <div className="bg-gradient-to-r from-yellow-200 to-yellow-500 dark:from-gray-900 dark:to-indigo-900">
      <Head>
        <title>Zakk Lefkowits | zakk.io</title>
        <meta name="description" content="Zakk Lefkowits: Senior Software Engineer at Amazon Fire TV. Distributed systems, data platforms, and agentic engineering." />
        <meta property="og:title" content="Zakk Lefkowits | zakk.io" />
        <meta property="og:description" content="Senior Software Engineer at Amazon Fire TV. Distributed systems, data platforms, and agentic engineering." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://zakk.io/zheadshot.jpg" />
      </Head>
      <div className="max-w-5xl mx-auto">
        <HomePage data={homeDefault} />
      </div>
    </div>
  );
};

export default ResumePage;