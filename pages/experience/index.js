import React from 'react';
import experienceStyles from '@/styles/Experience.module.css';
import { Link as ScrollLink } from 'react-scroll';

const Experience = () => {
  return (
    <div className={experienceStyles.container}>
        <div className={experienceStyles.homeButtonContainer}>
        <ScrollLink
          to="bannerSection"
          smooth={true}
          duration={500}
          className={experienceStyles.homeButton}
        >
          Home&nbsp;
          <div className={experienceStyles.arrowUp}></div>
        </ScrollLink>
        </div>

      <h1 className={experienceStyles.header}>Experience</h1>
      <div className={experienceStyles.resumeBox}>Resume Placeholder</div>
    </div>
  );
};

export default Experience;