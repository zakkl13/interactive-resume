export interface ResumeData {
  name: string,
  location: string,
  github: string,
  email: string,
  linkedin: string,
  website: string,
  summary: string,
  metrics?: Metric[];
  skills: Skill[];
  experience: Experience[],
  education: Education[]
}

export interface Metric {
  value: string;
  label: string;
  note: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  roleSummary?: string;
  projects: Project[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  intro: string;
  bullets: string[];
  techStack?: string;
}

export interface Education {
  school: string;
  degree: string;
  image: string;
}

export const resumeData: ResumeData = {
  name: "Zakk Lefkowits",
  location: "{{hover text='EST' context='Richmond, VA'}}",
  email: "zlefkowits@gmail.com",
  linkedin: "https://www.linkedin.com/in/zakklefkowits/",
  github: "https://github.com/zakkl13",
  website: "https://zakk.io/resume",
  summary: `Senior Software Engineer at {{bold text='Amazon Fire TV'}}. 9 years in distributed systems, mobile-cloud architecture, and data engineering. Launched the Discovery Catalog data platform; previously shipped Continue Watching to {{bold text='100M+ devices'}} as client-side tech lead. Consistent record of championing the harder, better architectural decision to build robust systems at Amazon scale. Pushing agentic engineering practice at Fire TV; built and operate a self-iterating agent orchestrator shipping {{bold text='~3x'}} prior-year output of peer-reviewed code.`,
  metrics: [
    { value: "100M+", label: "devices running my code", note: "Continue Watching client on Fire TV Devices" },
    { value: "3x", label: "code output in 2026", note: "AI-powered Engineering" },
    { value: "$1B", label: "payments / yr", note: "Legacy on-prem platform safely migrated to AWS ECS." },
    { value: "50+", label: "partner launches", note: "Live TV and Continue Watching integration on Fire TV worldwide." },
    { value: "9 yrs", label: "in production", note: "Distributed systems, mobile-cloud, data." },
    { value: "200K", label: "peak TPS", note: "Transactions per second, ingesting Fire TV customer watch activity and consent" }
  ],
  skills: [
    {
      category: "Languages & Technologies",
      items: [
        "Rust",
        "Java",
        "Kotlin",
        "TypeScript",
        "Python",
        "SQL",
        "Android",
        "Spring Boot",
        "Apache Spark",
        "RocksDB",
        "MCP"
      ]
    },
    {
      category: "AWS, Cloud & Infrastructure",
      items: [
        "EC2",
        "ECS",
        "Lambda",
        "DynamoDB",
        "SQS",
        "Bedrock",
        "CDK",
        "S3",
        "CloudWatch",
        "CodeDeploy",
        "Terraform (IaC)"
      ]
    },
    {
      category: "Architecture & Core Competencies",
      items: [
        "Distributed Systems",
        "Data Engineering",
        "Mobile-Cloud Architecture",
        "Agentic Workflow Automation",
        "LLM Applications & Evaluation"
      ]
    }
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Amazon, {{hover text='Fire TV' context='Fire TV is a leading streaming media platform having sold over 200 million devices to date.'}}",
      duration: "April 2020 - Present",
      roleSummary: "Tech lead for Fire TV Catalog Enrichment, previously client-side tech lead on Fire TV Partner Integrations. Promoted to Sr. Software Engineer (Q4 2022).",
      projects: [
        {
          title: "Discovery Catalog Platform",
          intro: `Designed and built a governed data platform extending the Fire TV Catalog beyond streaming-provider feeds to new enriched data sources (e.g., Wikipedia articles, text scene descriptions), replacing fragmented ad-hoc pulls from multiple downstream teams.`,
          techStack: "Data Engineering, Distributed Systems",
          bullets: [
            `Drove the architectural decision to publish to a separate output stream rather than extending the core catalog unlocking a {{bold text='10x data-volume ceiling'}} and a faster schema-evolution path for novel data types.`,
            `Formalized a platform model where consuming teams own domain-specific extraction logic on Catalog Engineering's governed rails (lifecycle, linking, publication).`,
            `Aligned the Fire TV Search team to build its Prime Video scene-data curation app on the new platform, setting precedent for centralized data governance across downstream teams.`,
            `Delivered to production solo in three months against a documented 4.5-month estimate. Enabled by a production-like integration test harness and agentic engineering.`
          ]
        },
        {
          title: "LLM Genre Classification",
          intro: `LLM enrichment embedded in the Fire TV Catalog's latency-sensitive synchronous stream-processing pipeline, led by a genre classifier that replaced unreliable provider data and the eval methodology (CMAR) that won customer-team adoption.`,
          techStack: "LLM Applications & Evaluation, AWS Bedrock, Data Engineering",
          bullets: [
            `Built an LLM genre classifier embedded in the catalog's synchronous stream-processing pipeline at {{bold text='~$0.001 per entity'}}; engineered an eligibility filter scoping inference to the ~5% of incoming updates most likely to surface on customer screens, keeping long-tail updates off the latency-sensitive critical path.`,
            `Invented {{bold text='CMAR (Catalog Metadata Acceptance Rate)'}} - a measurement methodology using an LLM judge calibrated against PM ratings (>90% agreement on a 10K-entity sample) to validate enrichment quality. Classifier hit {{bold text='95% CMAR vs. 82% baseline'}}; the metric earned PM confidence and unlocked downstream customer-team adoption of LLM-classified genre values.`,
            `Tech lead and design approver on subsequent enrichment features (location extraction from linear-station metadata, image metadata extraction) shipped by mid-level engineers under reduced-headcount conditions; core contributor to the catalog org's shared Bedrock integration library (multi-account rate cycling, prompt construction, JSON parsing, retry, metrics).`
          ]
        },
        {
          title: "3P Continue Watching on Fire TV",
          intro: `Client-side tech lead on the VP-level initiative that gave Fire TV visibility into what customers watched inside partner apps, enabling {{link text='Continue Watching' out='https://www.amazon.com/gp/help/customer/display.html?nodeId=TEIq4vikEIpvh49FW1'}} and contributing to {{bold text='8-figure incremental ad revenue'}}. Owned the full device-to-cloud architecture, partner SDK, and partner-facing technical relationships.`,
          techStack: "Mobile-Cloud Architecture, Rust, Android, Java Services",
          bullets: [
            `Drove the decision to build the on-device middleware in Rust rather than piggyback on existing Android services. Shipped to 100M+ devices at <5MB memory footprint, proving out the native-service pattern subsequently adopted across Fire TV`,
            `Drove the decision to build a custom Amazon SDK rather than adopt Android's standard Watch Next API arguing it would compromise integration quality and partner ergonomics. Owned the entire partner-facing surface end-to-end (SDK, {{link text='integration docs' out='https://developer.amazon.com/docs/fire-tv/get-started-with-firetv-integration-sdk.html'}}, {{link text='reference sample app' out='https://github.com/amzn/ftv-integration-sdk-sample-app'}}); the resulting API surface became a partner-cited deal-closing factor across {{bold text='Disney+, HBO Max, Hulu, Starz, and MGM+'}}.`,
            `Built and operated the cloud ingestion backend handling sensitive customer and partner data, handling up to {{bold text='~200K TPS observed peak'}} in production.`,
            `Owned the privacy/consent surface end-to-end. Opt-in capture, propagation through the pipeline, and statistically-rigorous experimentation that drove {{bold text='opt-in from 30% -> 75%'}} over a few months.`
          ]
        },
        {
          title: "Live TV Integration",
          intro: "Scaled and operated Fire TV's {{link text='Live TV' out='https://amazonfiretv.blog/discovering-live-tv-is-easier-than-ever-on-fire-tv-8415e417bab4'}} integration, supporting 40+ partner launches worldwide and a 2x increase in monthly active users (2020-2023).",
          techStack: "Mobile-Cloud Architecture, Java Services, Android, Kotlin",
          bullets: [
            `Scaled platform capabilities to support launches of 40+ Live TV (e.g., {{link text='DirecTv' out='https://amazonfiretv.blog/fire-tv-launches-new-linear-live-tv-experience-for-directv-stream-subscribers-9d9632e8b518'}}) partners worldwide leading to a 100% increase in Monthly Active Users of the Fire TV Live TV experience from 2020 to 2023.`,
            `Enhanced monitoring capabilities to identify customer-impacting issues in real-time via anomaly detection alarms.`,
            `Built up developer resources including significant improvements to the {{link text='reference app' out='https://github.com/amzn/ftv-livetv-sample-tv-app'}} for developers as well as writing a {{link text='step-by-step integration guide' out='https://developer.amazon.com/docs/fire-tv/linear-tv-integration-guide-overview.html'}}.`
          ]
        },
        {
          title: "Agentic Engineering",
          intro: "Established agentic engineering practice across the ~40-person Catalog org: shared agent tooling and an autonomous, human-gated pipeline that shipped ~3x the prior year's volume of peer-reviewed production code.",
          techStack: "Agentic Workflow Automation, MCP",
          bullets: [
            `Authored and maintain {{bold text='catalog-engineer'}} - a shared agent spec (context + MCP servers + skills) adopted 100% across a 3-team, ~40-person org, cited by VP as a best-practice example, and replicated by sister Fire TV orgs.`,
            `Built and operate an internal {{bold text='human-gated autonomous engineering pipeline'}}. Shipping production code through Amazon's standard peer code review. {{bold text='Q1 2026 alone shipped ~70% as many merged PRs as all of 2025'}} (~3x output multiplier). Shared the system in an org-wide talk to 100+ engineers, driving 10+ direct adopters and two VP follow-ups.`,
            `Trusted by Fire TV VP leadership to help provision a new AI Engineering velocity team; subsequently drove Catalog org adoption of a code package context graph system, landing {{bold text='100 core packages'}} in 30 days, setting the implementation standard, and operating a live adoption-tracking dashboard powered by the context graph traversal MCP.`,
          ]
        }
      ]
    },
    {
      title: "Senior Consultant",
      company: "CapTech Consulting",
      duration: "July 2017 - March 2020",
      roleSummary: "Led cloud modernization initiatives for Global Top 10 insurance client, migrating legacy enterprise systems to AWS serverless and containerized architectures. Promoted to Senior Consultant (Q3 2019).",
      projects: [
        {
          title: "Insurance Cloud Modernization",
          intro: "Cloud modernization for a Global Top 10 insurer: migrated a legacy ~$1bn/year payment platform to AWS and built a multi-tenant framework for hundreds of partner websites.",
          techStack: "AWS ECS, CodeDeploy, Terraform, TypeScript, Angular, Node.js",
          bullets: [
            `Architected {{bold text='AWS ECS'}} migration and {{bold text='CodeDeploy'}}-based CI/CD for a legacy Windows-based Java payment application processing ~$1bn/year; built supporting {{bold text='Terraform'}} IaC and a TypeScript deployment CLI.`,
            `Delivered an {{bold text='Angular'}}/Node.js framework with headless CMS enabling business users to spin up co-branded websites for hundreds of insurance partners.`,
          ]
        }
      ]
    }
  ],
  education: [
    {
      school: "Virginia Polytechnic Institute and State University; Blacksburg, VA; Cum Laude",
      degree: "Bachelor of Science, Computer Science, Mathematics Minor: May 2017",
      image: "/vt.png"
    }
  ],
};
