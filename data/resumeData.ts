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
  }
  
  export const resumeData: Resume = {
    name: "Zakk Lefkowits",
    email: "zakk@example.com",
    linkedin: "https://www.linkedin.com/in/zakklefkowits/",
    github: "https://github.com/zakkl13",
    summary: `{{hover text=\"Tech Lead\" context=\"6 years of professional experience as a software developer\"}} at Amazon experienced in building products at scale to solve business problems and delight customers. 
              Demonstrated ability to lead teams, solve hard problems, learn quickly and communicate with clarity. 
              Passionate about efficiency over process, team over individual and automation over assumption. 
              Skilled in System Design, Rust, Android, Web Development, Typescript, {{hover text=\"AWS architecture\" context=\"Services include EC2, SQS, DynamoDB, S3\"}}, and Java services.`,
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Amazon, {{hover text=\"Fire TV\" context=\"Fire TV is a leading streaming media platform having sold over 200 million devices to date.\"}}",
        duration: "April 2020 - Present",
        descriptions: [{
          intro: `I am the tech lead for the Fire TV Partner Integrations team of 10 engineers. 
                  The team builds deep integrations with 3P content partners (e.g., Hulu) to enhance the Fire TV experience for millions of users. 
                  I was promoted to Sr. Engineer and designated formal technical lead in Q4 2022`,
          subDescriptions: [
            {
              title: "Continue Watching Integration Project",
              intro: `As technical lead I shepherded the [Continue Watching](https://www.androidpolice.com/amazon-fire-tv-continue-watching/) integration from requirements to MVP launch.`,
              bullets: [
                `Led technical design of system to collect data from partner apps and upload for use in Fire TV experiences, aligned diverse set of stakeholders on critical trade-off decisions.`,
                `Designed the partner facing Java API contract to collect users\’ in-app data`,
                `Led development of on-device Rust service to efficiently process data and handle new features on commodity consumer hardware with less than 3MB memory footprint`,
                `Built a cost-efficient distributed backend system on AWS leveraging up to 300,000 transactions per second while handling sensitive user and partner data`,
                `Worked closely with product team to hone requirements and influence product design`
              ]
            },
            {
              title: "Live TV Integration",
              intro: "I improved and operating the existing [Live TV](https://amazonfiretv.blog/discovering-live-tv-is-easier-than-ever-on-fire-tv-8415e417bab4) integration on Fire TV",
              bullets: [
                `Oversaw launches of 20+ partners`,
                `Improved latency by 50% in “tune to channel” voice command`,
                `Built up developer resources including significant improvements to the [sample app](https://github.com/amzn/ftv-livetv-sample-tv-app) as well as writing a [step-by-step integration guide](https://developer.amazon.com/docs/fire-tv/linear-tv-integration-guide-overview.html).`
              ]
            },
            {
              title: "Team Leadership & Responsibilities",
              intro: "As team lead ",
              bullets: [
                `Acted as technical expert for Amazon in meetings with top US content providers (e.g., Netflix, HBO, Youtube TV, etc.) business and engineering teams to drive adoption of integrations`,
                `Raised team technical quality bar through individual mentorship, leading by example and building {{hover text=\"mechanisms\" context=\"On my current team I established a weekly Engineering Sync. This is a few hours per week to gather the engineers in a room and have an open forum to break down problems, pair program, de-bug and discuss design trade-offs.\"}} to foster healthy engineering culture`,
                `Mentored individual engineers leading to two promotions from junior to mid-level`
              ]
            }
          ]
        }]
        // description: `I am the tech lead for the Fire TV Partner Integrations team of 10 engineers. 
        //               The team builds deep integrations with 3P content partners (e.g., Hulu) to enhance the Fire TV experience for millions of users.
                      
        //               I served as the technical lead for Building a new [Continue Watching](https://www.androidpolice.com/amazon-fire-tv-continue-watching/) integration.
        //               * Led technical design of system to collect data from partner apps and upload for use in Fire TV experiences, aligned diverse set of stakeholders on critical trade-off decisions `,
      },
    ],
    education: [
      {
        school: "Virginia Polytechnic Institute and State University; Blacksburg, VA; Cum Laude",
        degree: "Bachelor of Science, Computer Science, Mathematics Minor: May 2017",
        duration: "2016 - 2020",
      },
      // More education objects...
    ],
  };