export const homeData = {
    name: "Zakk Lefkowits",
    intro: "I build distributed systems for data, ML, and AI. Lately, I’ve been exploring how agents can give engineers more leverage across the entire software development lifecycle.",
    description: "Zakk Lefkowits — distributed systems, data engineering, AI, and machine learning. Writing, projects, and a little background.",
    email: "zlefkowits@gmail.com",
    x: "https://x.com/hexednobility",
    linkedin: "https://www.linkedin.com/in/zakklefkowits/",
    github: "https://github.com/zakkl13",
    photos: [
        { src: "/hokie.jpg", alt: "Hokie wearing a bow tie on the porch" },
        { src: "/slidingsands.jpg", alt: "Zakk and his wife hiking above a volcanic crater" },
        { src: "/backyard-golf.jpeg", alt: "Zakk helping his daughter practice golf in the backyard" },
        { src: "/marco.jpg", alt: "A pelican flying low over the water" },
        { src: "/garden-bed.jpg", alt: "A newly built raised garden bed" },
        { src: "/hokieandme.jpg", alt: "Zakk taking a playful photo with his dog Hokie" },
        { src: "/dr.jpg", alt: "Zakk and his wife smiling together on vacation" },
        { src: "/kayak.jpg", alt: "Zakk kayaking on bright blue water" },
        { src: "/family-outing.png", alt: "Zakk and his wife enjoying a sunny outing with their baby" },
    ],
    education: "Virginia Tech Computer Science · Class of 2017",
    links: [
        { title: "The Coloring Book Method", href: "/writing/coloring-book-method", description: "How to make things with LLMs.", kind: "Essay" },
        { title: "Little Living Apps", href: "https://github.com/zakkl13/little-living-apps", description: "A framework for apps built and maintained by AI agents.", kind: "GitHub" },
    ],
    experience: [
        { years: "2026–Present", company: "To Be Announced", upcoming: true, description: "" },
        {
            years: "2020–2026", company: "Amazon Fire TV", upcoming: false,
            description: [
                "I built infrastructure for Fire TV’s catalog, bringing in new information sources and enriching data with LLM and ML classifiers. Before that, I built ",
                { text: "developer toolkits", href: "https://developer.amazon.com/docs/fire-tv/get-started-with-firetv-integration-sdk.html" },
                ", device software, and distributed cloud systems for Continue Watching and Live TV, reaching 100M+ devices. I also developed coding and operations agents for my team and helped other Fire TV teams do the same.",
            ],
        },
        { years: "2017–2020", company: "CapTech Consulting", upcoming: false, description: "I embedded with clients to build modern web applications and cloud infrastructure. I designed the target architecture for migrating a payment platform processing roughly $1 billion a year to AWS, and built a shared web platform for hundreds of insurance partners." },
    ],
};
