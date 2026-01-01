import React from "react";
import { ResumeSkinProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faEnvelope, faHome, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { parseFormattedText } from "@/utils/formatter";

const TimelineResume: React.FC<ResumeSkinProps> = ({ data }) => {
    return (
        <div className="container mx-auto p-8 max-w-5xl bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Section (Similar to Classic but simplified) */}
            <div className="relative mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">{data.name}</h1>
                <div className="flex justify-center space-x-6 text-xl">
                    <a href={data.linkedin} className="hover:text-blue-600 transition-colors"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href={data.github} className="hover:text-gray-600 transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="mailto:zlefkowits@gmail.com" className="hover:text-red-500 transition-colors"><FontAwesomeIcon icon={faEnvelope} /></a>
                    <Link href="/" className="hover:text-green-500 transition-colors"><FontAwesomeIcon icon={faHome} /></Link>
                </div>
                <div className="mt-4 flex justify-center items-center text-gray-600 dark:text-gray-400">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    <span>{parseFormattedText(data.location)}</span>
                </div>
            </div>

            {/* Timeline Container */}
            <div className="relative border-l-4 border-blue-500 ml-4 md:ml-8 pl-8 space-y-12">
                
                {/* Summary Node */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 h-8 w-8 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <h2 className="text-2xl font-bold mb-2">Summary</h2>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <p>{parseFormattedText(data.summary)}</p>
                    </div>
                </div>

                {/* Experience Nodes */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 h-8 w-8 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <h2 className="text-2xl font-bold mb-6">Experience</h2>
                    
                    <div className="space-y-12">
                        {data.experience.map((exp, idx) => (
                            <div key={idx} className="relative">
                                {/* Connector Line for items */}
                                <div className="absolute -left-10 top-2 h-4 w-4 bg-gray-300 rounded-full border-2 border-white dark:border-gray-800"></div>
                                
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-400">
                                    <div className="flex flex-col md:flex-row justify-between mb-4">
                                        <h3 className="text-xl font-bold">{exp.title}</h3>
                                        <span className="text-blue-600 font-semibold">{exp.duration}</span>
                                    </div>
                                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                                        {parseFormattedText(exp.company)}
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {exp.descriptions.map((desc, dIdx) => (
                                            <div key={dIdx}>
                                                <p className="mb-2">{desc.intro}</p>
                                                {desc.subDescriptions.map((sub, sIdx) => (
                                                    <div key={sIdx} className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
                                                        <h4 className="font-semibold">{sub.title}</h4>
                                                        <p className="text-sm italic mb-2">{sub.intro}</p>
                                                        <ul className="list-disc ml-4 text-sm space-y-1">
                                                            {sub.bullets.map((bullet, bIdx) => (
                                                                <li key={bIdx}>{parseFormattedText(bullet)}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Node */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 h-8 w-8 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <h2 className="text-2xl font-bold mb-6">Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                                <img src={edu.image} alt={edu.school} className="h-16 w-16 object-contain" />
                                <div>
                                    <h3 className="font-bold">{edu.degree}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.school}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TimelineResume;
