import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope, faCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { resumeData, Experience, Education, ExperienceDescription, ExperienceSubDescription } from "@/data/resumeData";
import { parseFormattedText } from "@/utils/formatter";

const Resume: React.FC = () => {
  const renderExperienceSubDescription = (sd: ExperienceSubDescription) => {
    return (<div className="pt-1">
        <p><span className="font-semibold">{sd.title}</span> - {parseFormattedText(sd.intro)}</p>
        <ul className="list-disc ml-8">
            {sd.bullets.map((b, idx, arr) => ((<li key={idx}>{parseFormattedText(b)}</li>)))}
        </ul>
    </div>);
  }


  const renderExperienceDescription = (ed: ExperienceDescription) => {
    return (
        <div>
            <span className="pl-4 pt-2"><p>{ed.intro}</p></span>
            {ed.subDescriptions.map(renderExperienceSubDescription)}
        </div>
    );
  };


  const renderExperience = (exp: Experience) => {
    return (
      <div className="border-b-2 border-gray-200 py-2">
        <h3 className="text-xl font-bold">{exp.title} | {parseFormattedText(exp.company)}</h3>
        <p className="text-md italic">{exp.duration}</p>
        {exp.descriptions.map(renderExperienceDescription)}
      </div>
    );
  };

  const renderEducation = (edu: Education) => {
    return (
      <div className="py-2 flex justify-between inline-block">
        <div className="align-middle">
            <h3 className="text-xl font-bold">{edu.degree}</h3>
            <p className="text-md">{edu.school}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
    <div className="relative">
      <h1 className="text-6xl font-bold mb-4 text-center">{resumeData.name}</h1>
      <div className="absolute top-0 right-0 p-2 flex items-center inline-block space-x-2">
        <a href="https://github.com/zakkl13/interactive-resume" target="_blank">
            <FontAwesomeIcon icon={faCode} />
        </a>
      </div>
    </div>
    <div className="flex justify-center mb-8">
      <div className="flex items-center mr-4">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
        <a className="flex items-center" href="mailto:zlefkowits@gmail.com">
            <p>Email</p>
        </a>   
      </div>
      <div className="flex items-center mr-4">
        <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
        <a href={resumeData.linkedin}>LinkedIn</a>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        <a href={resumeData.github}>GitHub</a>
      </div>
    </div>
    <p className="mb-8">{parseFormattedText(resumeData.summary)}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {resumeData.experience.map(renderExperience)}
      </div>

      <div className="flex justify-between border-b-2 border-gray-200">
        <span>
        <h2 className="text-2xl font-bold mb-4">Education</h2>        
        {resumeData.education.map(renderEducation)}
        </span>
        <img className="align-top" src={resumeData.education[0].image} height="150px" width="150px" />
      </div>
    </div>
  );
};

export default Resume;