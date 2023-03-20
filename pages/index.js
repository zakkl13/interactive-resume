import React from 'react';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import homeStyles from '@/styles/Home.module.css';
import { Link as ScrollLink } from 'react-scroll';
import Experience from './experience';


const Home = () => {
  return (
    <div className={homeStyles.container}>
      <section className={homeStyles.bannerSection}>
        <h1 className={homeStyles.banner}>
          <span>Zakk Lefkowits</span>
        </h1>
        <div className={homeStyles.icons}>
          <Link href="https://github.com/">
            <div className={homeStyles.iconLink}>
              <Image src="/github-icon.png" alt="GitHub" width={48} height={48} />
            </div>
          </Link>
          <Link href="https://linkedin.com/">
            <div className={homeStyles.iconLink}>
              <Image src="/linkedin-icon.png" alt="LinkedIn" width={48} height={48} />
            </div>
          </Link>
        </div>
        <ScrollLink
          to="experienceSection"
          smooth={true}
          duration={800}
          className={homeStyles.experienceButton}
        >
          <span>Experience</span>

          <div className={homeStyles.arrowDown}></div>
        </ScrollLink>
      </section>
      <section id="experienceSection" className={homeStyles.experienceSection}>

        <Experience></Experience>
      </section>
    </div>
  );
};
export default Home;