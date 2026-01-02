export interface ResumeData {
  name: string,
  location: string,
  github: string,
  email: string,
  linkedin: string,
  summary: string,
  impactBullets: string[],
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

export interface Project {
  title: string;
  intro: string;
  bullets: string[];
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
  summary: `Product Minded Software Engineer & Tech Lead at {{bold text='Amazon'}} {{hover text='experienced' context='9 years of professional software development experience'}} in building products at scale to solve business problems and delight customers. {{bold text='Trusted with ownership of code deployed to 100+ million devices'}}. Adept in {{bold text='Agentic AI'}} engineering workflows to accelerate delivery.
              Skilled in System Design, Rust, Android, Web Development, Typescript, {{hover text='AWS architecture' context='Services include EC2, ECS, Lambda, SQS, DynamoDB, S3, CodeDeploy'}}, and building dstributed back-end systems.`,
  impactBullets: [
    ""
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
          intro: `Leveraged LLM and classic ML techniques to match and enrich Fire TV Catalog data to build rich customer experiences`,
          bullets: [
            `Designed pipeline to assess content genres with an LLM`,
            'Built evaluation and A/B testing frameworks for working with non-deterministic outputs from LLMs',
            `Enabled cost effective LLM inference mechanism with tight cost controls`
          ]
        },
        {
          title: "Building Fire TV Watch Activity Integration",
          intro: `Built new integration with streaming apps to capture customer watch activity to create a Continue Watching row and personalized experiences.`,
          bullets: [
            `Led technical design of system to collect data from partner apps and upload for use in Fire TV experiences.`,
            `Wrote the SDK and {{link text='integration documentation' out='https://developer.amazon.com/docs/fire-tv/get-started-with-firetv-integration-sdk.html'}}`,
            `Shipped new on-device {{bold text='Rust'}} service to over 100 million devices. Runs on commodity consumer hardware with less than 5MB memory footprint`,
            `Built a cost-efficient distributed backend system on {{bold text='AWS'}} to process up to 300,000 transactions per second while handling sensitive user and partner data`,
          ]
        },
        {
          title: "Live TV Integration",
          intro: "Improved and operated the existing {{link text='Live TV' out='https://amazonfiretv.blog/discovering-live-tv-is-easier-than-ever-on-fire-tv-8415e417bab4'}} integration on Fire TV",
          bullets: [
            `Oversaw launches of 40+ Live TV (e.g., {{link text='DirecTv' out='https://amazonfiretv.blog/fire-tv-launches-new-linear-live-tv-experience-for-directv-stream-subscribers-9d9632e8b518'}}) partners worldwide leading to a 100% increase in Monthly Active Users of the Fire TV Live TV experience from 2020 to 2022`,
            `Enhanced monitoring capabilities to identify customer-impacting issues in real-time`,
            `Improved latency by 50% in Live TV voice commands “{{hover text='tune to channel' context='For example, 'Alexa, tune to ABC' '}}” voice command by optimizing {{bold text='Java'}} services stack.`,
            `Built up developer resources including significant improvements to the {{link text='reference app' out='https://github.com/amzn/ftv-livetv-sample-tv-app'}} for developers as well as writing a {{link text='step-by-step integration guide' out='https://developer.amazon.com/docs/fire-tv/linear-tv-integration-guide-overview.html'}}.`
          ]
        },
        {
          title: "Team Leadership & Responsibilities",
          intro: "",
          bullets: [
            `Developed team-standard context for AI coding tools, defined best practices to accelerate team adoption of Agentic AI coding tools`,
            `Acted as technical expert for Amazon in negotiations with top US content providers (e.g., Netflix, HBO, etc.) business and engineering teams to drive adoption of integrations`,
            `Raised team technical quality bar through individual mentorship, leading by example and building {{hover text='mechanisms' context='Established a weekly Engineering Sync. Time to gather engineers for an open forum to break down problems, pair program, de-bug and discuss design trade-offs.'}} to foster healthy engineering culture`,
            `Mentored individual engineers leading to four promotions from junior to mid-level`,
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
          bullets: [
            `Designed {{bold text='AWS ECS'}} architecture to migrate existing containers`,
            `Designed mature cloud architecture and CI/CD based on {{bold text='AWS CodeDeploy'}} for legacy windows-based Java payment application responsible for processing ~$1bn/year`,
            `Developed command line interface written in {{bold text='Typescript'}} to facilitate common AWS deployments`,
            `Built Infrastructure-as-Code (IaC) {{bold text='Terraform'}} templates for AWS resources`
          ]
        },
        {
          title: "Insurance Web App Refresh",
          intro: "Global Top 10 Insurance Client. Built framework for co-branded insurance websites.",
          bullets: [
            `Delivered client web app framework; built on an {{bold text='Angular'}} front-end and {{bold text='Node.js'}} backend`,
            `Implemented headless CMS system to allow buisness users to create arbitrary websites for 100s of insurance partners.`
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
    },
    // More education objects...
  ],
};
