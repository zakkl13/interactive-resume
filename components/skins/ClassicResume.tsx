import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faLocationDot, faCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Experience, Education, Project, ResumeData } from "@/data/resumeData";
import { parseFormattedText } from "@/utils/formatter";
import Link from "next/link";

export interface ResumeProps {
    data: ResumeData
}

const Resume: React.FC<ResumeProps> = ({data}) => {
  const renderProject = (proj: Project, idx: number) => {
    return (<div key={idx} className="pt-2 mb-2">
        <div className="mb-1"><span className="font-semibold">{proj.title}</span> {proj.intro && <span>- {parseFormattedText(proj.intro)}</span>}</div>
        <ul className="list-disc ml-8">
            {proj.bullets.map((b, idx, arr) => ((<li key={idx}>{parseFormattedText(b)}</li>)))}
        </ul>
    </div>);
  }

  const renderExperience = (exp: Experience, idx: number) => {
    return (
      <div key={idx} className="border-b-2 border-gray-200 py-4">
        <h3 className="text-xl font-bold">{exp.title} | {parseFormattedText(exp.company)}</h3>
        <p className="text-md italic mb-2">{exp.duration}</p>
        
        {exp.roleSummary && (
            <div className="pl-4 mb-4 text-gray-700 dark:text-gray-300">
                {parseFormattedText(exp.roleSummary)}
            </div>
        )}

        <div className="pl-2">
            {exp.projects.map((proj, i) => renderProject(proj, i))}
        </div>
      </div>
    );
  };

  const renderEducation = (edu: Education, idx: number) => {
    return (
      <div key={idx} className="py-2 flex justify-between inline-block">
        <div className="align-middle">
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p className="text-md">{edu.school}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
    <div className="relative">
      <h1 className="text-6xl font-bold mb-4 text-center">{data.name}</h1>
      <div className="absolute top-0 right-0 p-2 flex items-center inline-block space-x-2">
        <a href="https://github.com/zakkl13/interactive-resume" target="_blank">
            <FontAwesomeIcon icon={faCode} />
        </a>
      </div>
    </div>
    <div className="flex justify-center mb-8">
      <div className="flex items-center mr-2 md:mr-4">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
        <a className="flex items-center" href={`mailto:${data.email}`}>
            <p>Email</p>
        </a>
      </div>
      <div className="flex items-center mr-2 md:mr-4">
        <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
        <a href={data.linkedin}>LinkedIn</a>
      </div>
      <div className="flex items-center mr-2 md:mr-4">
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        <a href={data.github}>GitHub</a>
      </div>
      <div className="flex items-center mr-2 md:mr-4">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          <Link href="/">
            Zakk.io
          </Link>
      </div>
      <div className="flex items-center mr-2 md:mr-4">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          <div>{parseFormattedText(data.location)}</div>
      </div>

    </div>
    <div className="mb-8">{parseFormattedText(data.summary)}</div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {data.experience.map((exp, i) => renderExperience(exp, i))}
      </div>

      <div className="flex justify-between border-b-2 border-gray-200">
        <span>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {data.education.map((edu, i) => renderEducation(edu, i))}
        </span>
        <img className="align-center" src={data.education[0].image} style={{
            height: "150px",
            width: "150px"
        }} />
      </div>
    </div>
  );
};

export default Resume;
