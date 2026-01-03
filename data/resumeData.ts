export interface ResumeData {
  name: string,
  location: string,
  github: string,
  email: string,
  linkedin: string,
  summary: string,
  skills: Skill[];
  experience: Experience[],
  education: Education[]
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
  summary: `Product Minded Software Engineer & Tech Lead at {{bold text='Amazon'}} building distributed systems at scale to solve business problems and delight customers. 9 years of professional software development experience. {{bold text='Owner of core services deployed to 100+ million devices'}}. Evangelist for {{bold text='AI-augmented engineering'}}, leveraging agentic coding tools to multiply developer velocity and accelerate delivery cycles.`,
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
        "Spring Java",
        "Apache Spark",
        "RocksDB"
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
        "System Design",
        "Distributed Systems",
        "Data Engineering",
        "Mobile-Cloud Architecture",
        "Agentic Workflow Automation",
        "AI-assisted Engineering"
      ]
    }
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Amazon, {{hover text='Fire TV' context='Fire TV is a leading streaming media platform having sold over 200 million devices to date.'}}",
      duration: "April 2020 - Present",
      roleSummary: "Key technical leader across the Fire TV Catalog and Partner Integrations teams. Building features directly leading to increased engagement and revenue. Promoted to Senior Engineer in Q4 2022.",
      projects: [
        {
          title: "Fire TV Catalog Data Enrichment",
          intro: `Architected a new enrichment layer integrating LLMs and unstructured data to power semantic discovery, enabling natural language queries ("Alexa, What's the movie where Tom Hanks talks to a volleyball?").`,
          techStack: "Data Engineering, AWS Bedrock, Apache Spark",
          bullets: [
            `Designed a large-scale enrichment pipeline integrating LLMs into the Fire TV Catalog Graph to categorize and tag content with fine granularity.`,
            `Implemented strict token-budgeting and monitoring controls to achieve viable unit economics (~$0.001 per entity), ensuring the solution is scalable to millions of catalog items.`,
            `Drove organizational alignment to adopt a formal schema review process, creating a gatekeeper mechanism that standardized data model evolution and improved long-term maintainability.`]
        },
        {
          title: "Fire TV Watch Activity Integration",
          intro: `Built new integration with streaming app partners to capture customer watch history to create a {{link text='Continue Watching Row' out='https://amazonfiretv.blog/continue-watching-feature-comes-to-fire-tv-home-screen-00699b5be5a3'}} and personalized experiences.`,
          techStack: "Mobile-Cloud Architecture, Rust, Android, Java Services",
          bullets: [
            `Led technical design of system to collect data from partner apps and upload for use in Fire TV experiences.`,
            `Authored the SDK, {{link text='integration documentation' out='https://developer.amazon.com/docs/fire-tv/get-started-with-firetv-integration-sdk.html'}} and {{link text='reference app' out='https://github.com/amzn/ftv-integration-sdk-sample-app'}}.`,
            `Engineered new on-device high-performance Rust service deployed to 100M+ devices with <5MB memory footprint, optimizing resource constraints on legacy hardware.`,
            `Built a cost-efficient distributed backend system on {{bold text='AWS'}} to process up to 300,000 transactions per second while handling sensitive user and partner data.`,
          ]
        },
        {
          title: "Live TV Integration",
          intro: "Improved and operated the existing {{link text='Live TV' out='https://amazonfiretv.blog/discovering-live-tv-is-easier-than-ever-on-fire-tv-8415e417bab4'}} integration on Fire TV",
          techStack: "Mobile-Cloud Architecture, Java Services, Android",
          bullets: [
            `Scaled platform capabilities to support launches of 40+ Live TV (e.g., {{link text='DirecTv' out='https://amazonfiretv.blog/fire-tv-launches-new-linear-live-tv-experience-for-directv-stream-subscribers-9d9632e8b518'}}) partners worldwide leading to a 100% increase in Monthly Active Users of the Fire TV Live TV experience from 2020 to 2023.`,
            `Enhanced monitoring capabilities to identify customer-impacting issues in real-time.`,
            `Improved latency by 50% for Live TV voice commands (e.g., “{{hover text='tune to channel' context='For example, 'Alexa, tune to ABC' '}}”) by optimizing the {{bold text='Java'}} services stack.`,
            `Built up developer resources including significant improvements to the {{link text='reference app' out='https://github.com/amzn/ftv-livetv-sample-tv-app'}} for developers as well as writing a {{link text='step-by-step integration guide' out='https://developer.amazon.com/docs/fire-tv/linear-tv-integration-guide-overview.html'}}.`
          ]
        },
        {
          title: "Team Leadership & Responsibilities",
          intro: "",
          bullets: [
            `Champion of AI-augmented software development practices; successfully integrated LLM tooling into team workflows to accelerate system design and implementation cycles.`,
            `Acted as technical expert for Amazon in negotiations with top US content providers (e.g., Netflix, HBO, etc.) business and engineering teams to drive adoption of integrations.`,
            `Raised team technical quality bar through individual mentorship, leading by example and building {{hover text='mechanisms' context='Established a weekly Engineering Sync. Time to gather engineers for an open forum to break down problems, pair program, de-bug and discuss design trade-offs.'}} to foster healthy engineering culture.`,
            `Mentored individual engineers leading to four promotions from junior to mid-level.`,
          ]
        }
      ]
    },
    {
      title: "Senior Consultant",
      company: "CapTech Consulting",
      duration: "July 2017 - March 2020",
      roleSummary: "Consultant deployed to clients to execute critical software projects and advise on technical strategy. Promoted to Sr. Consultant Q3 2019.",
      projects: [
        {
          title: "AWS Application Migration",
          intro: "Global Top 10 Insurance Client. Migrated legacy enterprise tech stack to AWS.",
          techStack: "AWS ECS, Terraform, TypeScript, Java",
          bullets: [
            `Designed {{bold text='AWS ECS'}} architecture to migrate existing containers.`,
            `Designed mature cloud architecture and CI/CD based on {{bold text='AWS CodeDeploy'}} for legacy windows-based Java payment application responsible for processing ~$1bn/year.`,
            `Developed command line interface written in {{bold text='Typescript'}} to facilitate common AWS deployments.`,
            `Built Infrastructure-as-Code (IaC) {{bold text='Terraform'}} templates for AWS resources.`
          ]
        },
        {
          title: "Insurance Web App Refresh",
          intro: "Global Top 10 Insurance Client. Built framework for co-branded insurance websites.",
          techStack: "Angular, Node.js, CMS",
          bullets: [
            `Delivered client web app framework; built on an {{bold text='Angular'}} front-end and {{bold text='Node.js'}} backend.`,
            `Implemented headless CMS system to allow business users to create arbitrary websites for 100s of insurance partners.`
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
