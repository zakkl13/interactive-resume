import Image from "next/image";
import { homeData } from "@/data/homeData";
import styles from "@/styles/homepage.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <header>
          <h1>{homeData.name}</h1>
          <p className={styles.intro}>{homeData.intro}</p>
          <nav className={styles.contact} aria-label="Contact and profiles">
            <a href={`mailto:${homeData.email}`}>Email</a>
            <a href={homeData.x}>X</a>
            <a href={homeData.linkedin}>LinkedIn</a>
            <a href={homeData.github}>GitHub</a>
          </nav>
        </header>

        <section className={styles.section} aria-labelledby="writing-projects">
          <h2 id="writing-projects">Writing &amp; projects</h2>
          <ul className={styles.links}>
            {homeData.links.map((item) => (
              <li key={item.href}>
                <div className={styles.linkTitle}>
                  <a href={item.href}>{item.title}</a>
                  <span>{item.kind}</span>
                </div>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="work">
          <h2 id="work">Previously &amp; now</h2>
          <div className={styles.experience}>
            {homeData.experience.map((entry) => (
              <article key={entry.company}>
                <h3 className={styles.jobHeading}>
                  <span>{entry.years}</span>
                  {entry.upcoming ? <em>{entry.company}</em> : <span>{entry.company}</span>}
                </h3>
                {entry.description && <p>{typeof entry.description === "string"
                  ? entry.description
                  : entry.description.map((part, index) => typeof part === "string"
                    ? part
                    : <a key={index} href={part.href}>{part.text}</a>)}
                </p>}
              </article>
            ))}
            <p>{homeData.education}</p>
          </div>
        </section>

        <div className={styles.photos} aria-label="A few personal snapshots">
          {homeData.photos.map((moment) => (
            <div key={moment.src} className={styles.photo}>
              <Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 640px) calc((100vw - 62px) / 3), (max-width: 680px) calc((100vw - 68px) / 3), 204px" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
