import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { resumeData, Experience, Education, ExperienceDescription, ExperienceSubDescription } from "@/data/resumeData";
import { StandardFonts } from 'pdf-lib'
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import HoverableText from "./hoverableText";

  const parseHoverableText = (input: string): Array<string | JSX.Element> => {
    const regexHover = /{{hover text="(.*?)" context="(.*?)"}}/g;
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regexHover.exec(input)) !== null) {
      const [fullMatch, text, context] = match;
      const index = match.index;
  
      if (index > lastIndex) {
        parts.push(input.slice(lastIndex, index));
      }
  
      parts.push(<HoverableText key={text} text={text} context={context} />);
      lastIndex = index + fullMatch.length;
    }
  
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }
  
    return parts;
  };

  const parseInlineMarkdown = (input: string): Array<string | JSX.Element> => {
    const regexLink = /\[(.*?)\]\((.*?)\)/g;
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regexLink.exec(input)) !== null) {
      const [fullMatch, text, url] = match;
      const index = match.index;
  
      if (index > lastIndex) {
        parts.push(input.slice(lastIndex, index));
      }
  
      parts.push(
        <a key={text} href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
      lastIndex = index + fullMatch.length;
    }
  
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }
  
    return parts;
  };

  const parseInlineElements = (input: string): Array<string | JSX.Element> => {
    const regexHover = /{{hover text="(.*?)" context="(.*?)"}}/g;
    const regexLink = /\[(.*?)\]\((.*?)\)/g;
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = 0;
    
    while (true) {
      const hoverMatch = regexHover.exec(input);
      const linkMatch = regexLink.exec(input);
      
      if (!hoverMatch && !linkMatch) break;
  
      const hoverIndex = hoverMatch ? hoverMatch.index : Infinity;
      const linkIndex = linkMatch ? linkMatch.index : Infinity;
      
      const minIndex = Math.min(hoverIndex, linkIndex);
      const isHover = hoverIndex === minIndex;
  
      if (minIndex > lastIndex) {
        parts.push(input.slice(lastIndex, minIndex));
      }
  
      if (isHover) {
        const [fullMatch, text, context] = hoverMatch!;
        parts.push(<HoverableText key={text} text={text} context={context} />);
        lastIndex = minIndex + fullMatch.length;
        regexLink.lastIndex = lastIndex;
      } else {
        const [fullMatch, text, url] = linkMatch!;
        parts.push(
          <a key={text} href={url} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
        lastIndex = minIndex + fullMatch.length;
        regexHover.lastIndex = lastIndex;
      }
    }
  
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }
  
    return parts;
  };

const Resume: React.FC = () => {
  const renderExperienceSubDescription = (sd: ExperienceSubDescription) => {
    return (<div className="pt-1">
        <p><span className="font-semibold">{sd.title}</span> - {parseInlineMarkdown(sd.intro)}</p>
        <ul className="list-disc ml-8">
            {sd.bullets.map((b, idx, arr) => ((<li key={idx}>{parseInlineElements(b)}</li>)))}
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
        <h3 className="text-xl font-bold">{exp.title} | {parseHoverableText(exp.company)}</h3>
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
      <button className="absolute top-0 right-0 p-2">
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
    <div className="flex justify-center mb-8">
      <div className="mr-4">
        <a className="flex items-center" href="mailto:zlefkowits@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
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
    <p className="mb-8">{parseHoverableText(resumeData.summary)}</p>

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