export interface HomeData {
    intro: string,
    about: string,
    profilePhoto: string,
    photos: string[],
    twitter: string,
    linkedin: string,
    github: string,
    resume: string
}

export const homeDefault: HomeData = {
    intro: "Hi, my name is Zakk",
    about: `
    I am a Software Engineer living in Richmond, Virginia (RVA).

    When I'm not shipping code I enjoy home improvement projects, gardening, rock climbing, cooking, travel and spending time with my wife and dog Hokie. 
    
    Oh and also generally being a nuisance on Twitter.`,
    profilePhoto: "/zakkprofile.jpg",
    photos: ["/hokie.jpg", "/slidingsands.jpg", "/kw.jpg", "/marco.jpg", "/garden-bed.jpg", "/hokieandme.jpg", "/dr.jpg", "/kayak.jpg"],
    twitter: "https://twitter.com/zakktech",
    linkedin: "https://www.linkedin.com/in/zakklefkowits/",
    github: "https://github.com/zakkl13",
    resume: "/resume"
}