export interface Resume {
  name: string,
  github: string,
  email: string,
  linkedin: string,
  summary: string,
  experience: Experience[],
  education: Education[]
}

export interface Experience {
    title: string;
    company: string;
    duration: string;
    descriptions: ExperienceDescription[];
  }

export interface ExperienceDescription {
  intro: string;
  subDescriptions: ExperienceSubDescription[];
}

export interface ExperienceSubDescription {
  title: string;
  intro: string;
  bullets: string[];
}
  
  export interface Education {
    school: string;
    degree: string;
    duration: string;
    image: string;
  }
  
  export const resumeData: Resume = {
    name: "Zakk Lefkowits",
    email: "zlefkowits@gmail.com",
    linkedin: "https://www.linkedin.com/in/zakklefkowits/",
    github: "https://github.com/zakkl13",
    summary: `Software Engineer at Amazon {{hover text=\"experienced\" context=\"6 years of professional software development experience\"}} in building products at scale to solve business problems and delight customers. 
              Demonstrated ability to lead teams, solve hard problems, learn quickly and communicate with clarity. 
              Passionate about efficiency over process, team over individual and automation over assumption. 
              Skilled in System Design, Rust, Android, Web Development, Typescript, {{hover text=\"AWS architecture\" context=\"Services include EC2, SQS, DynamoDB, S3\"}}, and Java services.`,
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Amazon, {{hover text=\"Fire TV\" context=\"Fire TV is a leading streaming media platform having sold over 200 million devices to date.\"}}",
        duration: "April 2020 - Present",
        descriptions: [{
          intro: `Tech lead for the Fire TV Partner Integrations team of 10 engineers. Responsible for enabling deep integrations with Third Party content partners to enhance the Fire TV experience for millions of users. 
                  Promoted to Senior Engineer in Q4 2022`,
          subDescriptions: [
            {
              title: "Continue Watching Integration Project",
              intro: `Built new [Continue Watching](https://www.androidpolice.com/amazon-fire-tv-continue-watching/) integration to enable critical customer use case.`,
              bullets: [
                `Led technical design of system to collect data from partner apps and upload for use in Fire TV experiences, aligned diverse set of stakeholders on critical trade-off decisions.`,
                `Led development of on-device Rust service to efficiently process data and handle new features on commodity consumer hardware with less than 3MB memory footprint`,
                `Built a cost-efficient distributed backend system on AWS to process up to 300,000 transactions per second while handling sensitive user and partner data`,
              ]
            },
            {
              title: "Live TV Integration",
              intro: "Improved and operated the existing [Live TV](https://amazonfiretv.blog/discovering-live-tv-is-easier-than-ever-on-fire-tv-8415e417bab4) integration on Fire TV",
              bullets: [
                `Oversaw launches of 20+ partners`,
                `Improved latency by 50% in Live TV voice commands “{{hover text=\"tune to channel\" context=\"For example, \"Alexa, tune to ABC\" \"}}” voice command`,
                `Built up developer resources including significant improvements to the [reference app](https://github.com/amzn/ftv-livetv-sample-tv-app) for developers as well as writing a [step-by-step integration guide](https://developer.amazon.com/docs/fire-tv/linear-tv-integration-guide-overview.html).`
              ]
            },
            {
              title: "Team Leadership & Responsibilities",
              intro: "",
              bullets: [
                `Acted as technical expert for Amazon in negotiations with top US content providers (e.g., Netflix, HBO, etc.) business and engineering teams to drive adoption of integrations`,
                `Raised team technical quality bar through individual mentorship, leading by example and building {{hover text=\"mechanisms\" context=\"Established a weekly Engineering Sync. Few hours per week to gather engineers and have an open forum to break down problems, pair program, de-bug and discuss design trade-offs.\"}} to foster healthy engineering culture`,
                `Mentored individual engineers leading to two promotions from junior to mid-level`,
                `Whittled down unnecessary process to boost team productivity`
              ]
            }
          ]
        }]
      },
      {
        title: "Senior Consultant",
        company: "CapTech Consulting",
        duration: "July 2017 - March 2020",
        descriptions: [
          {
            intro: "Consultant deployed to clients to execute critical software projects and advise on technical strategy.",
            subDescriptions: [
              {
                title: "AWS Application Migration",
                intro: "Global Top 10 Insturance Client. Migrated legacy enterprise tech stack to AWS",
                bullets: [
                  `Designed AWS Elastic Container Service (ECS) architecture to migrate existing containers`,
                  `Designed mature cloud architecture and CI/CD based on AWS CodeDeploy for legacy windows-based Java payment application responsible for processing ~$1bn/year`,
                  `Developed command line interface written in Typescript to facilitate common AWS deployments`,
                  `Built Infrastructure-as-Code (IaC) templates for AWS resources`
                ]
              },
              {
                title: "Insurance Web App Refresh",
                intro: "Global Top 10 Insturance Client. Built framework for co-branded insurance websites.",
                bullets: [
                  `Delivered client web app framework; built on an Angular front-end and Node.js backend`,
                  `Implemented headless CMS system to allow buisness users to create arbitrary websites for 100s of insurance partners.`
                ]
              }
            ]
          },
        ]

      }
    ],
    education: [
      {
        school: "Virginia Polytechnic Institute and State University; Blacksburg, VA; Cum Laude",
        degree: "Bachelor of Science, Computer Science, Mathematics Minor: May 2017",
        duration: "2016 - 2020",
        image: "/vt.png"
      },
      // More education objects...
    ],
  };