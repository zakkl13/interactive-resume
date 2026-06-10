// One-page PDF resume, built with Typst.
//
// This is an intentionally SEPARATE data stack from the web resume
// (data/resumeData.ts). Content is ported by hand (web-only {{bold}}/{{link}}
// tokens converted to Typst). Styling lives in template.typ (no external Typst
// packages). Build/iterate with:
//   npm run resume:watch   (live recompile on save)
//   npm run resume:pdf     (one-off build to out/resume.pdf)

#import "template.typ": *

#show: resume.with(
  author: (
    firstname: "Zakk",
    lastname: "Lefkowits",
    location: "Richmond, VA (EST)",
    email: "zlefkowits@gmail.com",
    homepage: "https://zakk.io/resume",
    linkedin: "zakklefkowits",
    github: "zakkl13",
    positions: ("Senior Software Engineer",),
  ),
  paper-size: "us-letter",
)

= Summary

#resume-summary[Senior Software Engineer at *Amazon Fire TV*. 9 years in distributed systems, mobile-cloud architecture, and data engineering. Launched the Discovery Catalog data platform; previously shipped Continue Watching to *100M+ devices* as client-side tech lead. Consistent record of championing the harder, better architectural decision to build robust systems at Amazon scale. Pushing agentic engineering practice at Fire TV; built and operate a self-iterating agent orchestrator shipping *\~3x* prior-year output of peer-reviewed code.]

= Experience

#resume-entry(
  title: "Amazon, Fire TV",
  location: "Richmond, VA",
  description: "Senior Software Engineer",
  date: "April 2020 - Present",
)
#resume-lead[Tech lead for Catalog Enrichment, previously client-side tech lead on Partner Integrations. Promoted to Sr. Software Engineer (Q4 2022).]

#resume-project("Discovery Catalog Platform", stack: "Data Engineering, Distributed Systems")
#resume-item[
  - Designed and built a governed data platform extending the Fire TV Catalog beyond streaming-provider feeds to enriched sources (Wikipedia articles, scene descriptions), replacing fragmented ad-hoc pulls by downstream teams.
  - Drove the architectural decision to publish to a separate output stream rather than extending the core catalog, unlocking a *10x data-volume ceiling* and a faster schema-evolution path for novel data types.
  - Aligned the Fire TV Search team to build its Prime Video scene-data curation app on the new platform, setting precedent for centralized data governance across downstream teams.
  - Delivered to production solo in three months against a documented 4.5-month estimate. Enabled by agentic engineering.
]

#resume-project("LLM Genre Classification", stack: "LLM Applications & Evaluation, AWS Bedrock, Data Engineering")
#resume-item[
  - Built an LLM genre classifier that replaced unreliable provider data, embedded in the catalog's streaming pipeline at *\~\$0.001 per entity*; engineered an eligibility filter scoping inference to the \~5% of updates, keeping long-tail content off the latency-sensitive path.
  - Invented *CMAR (Catalog Metadata Acceptance Rate)*: a measurement methodology using an LLM judge calibrated against PM ratings (>90% agreement on a 10K-entity sample) to validate enrichment quality. Classifier hit *95% CMAR vs. 82% baseline*; the metric earned PM confidence and unlocked downstream customer-team adoption of LLM-classified genre values.
  - Tech lead on subsequent enrichment features shipped by mid-level engineers; core contributor to the org's shared Bedrock integration library.
]

#resume-project("Third-Party Continue Watching on Fire TV", stack: "Mobile-Cloud Architecture, Rust, Android, Java Services")
#resume-item[
  - Led the client-side architecture on the VP-level initiative that gave Fire TV visibility into what customers watched inside partner apps, enabling Continue Watching and *8-figure incremental ad revenue*.
  - Drove the decision to build the on-device middleware in Rust rather than piggyback on existing Android services. Shipped to 100M+ devices at \<5MB memory footprint, proving out the native-service pattern subsequently adopted across Fire TV.
  - Drove the decision to build a custom Amazon SDK rather than adopt Android's standard Watch Next API. Owned the entire partner-facing surface end-to-end (SDK, #link("https://developer.amazon.com/docs/fire-tv/get-started-with-firetv-integration-sdk.html")[integration docs], #link("https://github.com/amzn/ftv-integration-sdk-sample-app")[reference sample app]); the resulting API surface became a partner-cited deal-closing factor across *Disney+, HBO Max, Hulu, Starz, and MGM+*.
  - Built and operated the cloud ingestion backend handling sensitive customer and partner data at *\~200K TPS peak*.
  - Owned the privacy/consent surface end-to-end; copy experimentation drove *opt-in from 30% #sym.arrow.r 75%* in months.
]

#resume-project("Agentic Engineering", stack: "Agentic Workflow Automation, MCP")
#resume-item[
  - Authored and maintain *catalog-engineer*: a shared agent spec (context + MCP servers + skills) adopted 100% across a 3-team, \~40-person org, cited by VP as a best-practice example, and replicated by sister Fire TV orgs.
  - Built and operate an internal *human-gated autonomous engineering pipeline*. Shipping production code through Amazon's standard peer code review. *Q1 2026 alone shipped \~70% as many merged PRs as all of 2025* (\~3x output multiplier). Shared the system in an org-wide talk to 100+ engineers, driving 10+ direct adopters and two VP follow-ups.
  - Trusted by Fire TV VP leadership to help provision a new AI Engineering velocity team; subsequently drove Catalog org adoption of a code package context graph system, landing *100 core packages* in 30 days.
]

#resume-entry(
  title: "CapTech Consulting",
  location: "Richmond, VA",
  description: "Senior Consultant",
  date: "July 2017 - March 2020",
)
#resume-lead[Led cloud modernization initiatives for Global Top 10 insurance client. Promoted to Senior Consultant (Q3 2019).]

#resume-project("Insurance Cloud Modernization", stack: "AWS ECS, CodeDeploy, Terraform, TypeScript, Angular, Node.js")
#resume-item[
  - Architected *AWS ECS* migration and *CodeDeploy*-based CI/CD for a legacy Windows-based Java payment application processing \~\$1bn/year; built supporting *Terraform* IaC and a TypeScript deployment CLI.
]

= Skills

#resume-skill-item(
  "Languages & Technologies",
  ("Rust", "Java", "Kotlin", "TypeScript", "Python", "SQL", "Android", "Spring Boot", "Apache Spark", "RocksDB", "MCP"),
)
#resume-skill-item(
  "AWS, Cloud & Infrastructure",
  ("EC2", "ECS", "Lambda", "DynamoDB", "SQS", "Bedrock", "CDK", "S3", "CloudWatch", "CodeDeploy", "Terraform (IaC)"),
)
#resume-skill-item(
  "Architecture & Core Competencies",
  ("Distributed Systems", "Data Engineering", "Mobile-Cloud Architecture", "Agentic Workflow Automation", "LLM Applications & Evaluation"),
)

= Education

#resume-entry(
  title: "Virginia Polytechnic Institute and State University",
  location: "Blacksburg, VA",
  description: "B.S. Computer Science, Mathematics Minor, Cum Laude",
  date: "May 2017",
)
