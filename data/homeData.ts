export interface HomeData {
    intro: string,
    about: string,
    profilePhoto: string,
    photos: string[],
    linkedin: string,
    github: string,
    resume: string
}

export const homeDefault: HomeData = {
    intro: "Hi, I'm Zakk",
    about: `I'm a Senior Software Engineer at Amazon Fire TV, living in Richmond, Virginia (RVA). I build distributed systems and data platforms running on 100M+ devices, and I'm deep into agentic engineering: most of the code I ship today is built with AI agents I direct and review.

When I'm not shipping code I enjoy home improvement projects, dadding, gardening, sports, cooking, travel, and spending time with my wife, daughter, and dog, Hokie.`,
    profilePhoto: "/zakkprofile.jpg",
    photos: ["/hokie.jpg", "/slidingsands.jpg", "/kw.jpg", "/marco.jpg", "/garden-bed.jpg", "/hokieandme.jpg", "/dr.jpg", "/kayak.jpg"],
    linkedin: "https://www.linkedin.com/in/zakklefkowits/",
    github: "https://github.com/zakkl13",
    resume: "/resume"
}