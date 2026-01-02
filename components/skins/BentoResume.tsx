import React from "react";
import { ResumeSkinProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faLocationDot, faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { parseFormattedText } from "@/utils/formatter";
import { motion } from "framer-motion";

type BentoItem = 
    | { type: 'header', title: string, company: string, duration: string, summary?: string, id: string }
    | { type: 'project', title: string, intro: string, bullets: string[], id: string };

const BentoResume: React.FC<ResumeSkinProps> = ({ data }) => {
    
    // Flatten experience into a list of grid items (Headers with Summary, Projects)
    const gridItems: BentoItem[] = data.experience.flatMap((exp, expIdx) => {
        const items: BentoItem[] = [];
        
        // 1. Section Header (Job Title / Company / Summary)
        items.push({
            type: 'header',
            title: exp.title,
            company: exp.company,
            duration: exp.duration,
            summary: exp.roleSummary,
            id: `header-${expIdx}`
        });

        // 2. Project Cards
        exp.projects.forEach((proj, projIdx) => {
            items.push({
                type: 'project',
                title: proj.title,
                intro: proj.intro,
                bullets: proj.bullets,
                id: `proj-${expIdx}-${projIdx}`
            });
        });

        return items;
    });

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-4 md:p-8 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
                
                {/* Profile Card - Compacted */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 lg:col-span-2 row-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                    <div className="z-10 relative">
                        <h1 className="text-4xl md:text-5xl font-bold mb-1 tracking-tight leading-tight text-slate-900 dark:text-white">{data.name}</h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium mb-2">Software Engineer & Tech Lead</p>
                        <div className="flex items-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                            <span>{parseFormattedText(data.location)}</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3 z-10 relative">
                        <motion.a whileHover={{ scale: 1.05 }} href={`mailto:${data.email}`} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center w-12 h-12">
                            <FontAwesomeIcon icon={faEnvelope} className="text-lg text-slate-700 dark:text-slate-200" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.05 }} href={data.linkedin} className="bg-[#0077b5] p-3 rounded-xl text-white hover:opacity-90 transition-opacity flex items-center justify-center w-12 h-12">
                            <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.05 }} href={data.github} className="bg-[#333] p-3 rounded-xl text-white hover:opacity-90 transition-opacity flex items-center justify-center w-12 h-12">
                            <FontAwesomeIcon icon={faGithub} className="text-lg" />
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link href="/" className="bg-emerald-500 p-3 rounded-xl text-white hover:bg-emerald-600 transition-colors flex items-center justify-center w-12 h-12">
                                <FontAwesomeIcon icon={faHome} className="text-lg" />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-slate-50 dark:bg-slate-700/50 rounded-full blur-3xl opacity-50 pointer-events-none group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-500"></div>
                </motion.div>

                {/* Summary Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-center"
                >
                    <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider">About</h2>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                        {parseFormattedText(data.summary)}
                    </div>
                </motion.div>

                {/* Education Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 lg:col-span-2 bg-orange-50 dark:bg-slate-800/50 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-orange-100 dark:border flex flex-col justify-center"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-white dark:bg-slate-700 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-orange-600 dark:text-orange-400 text-xl" />
                        </div>
                        <div>
                            <div className="text-orange-800 dark:text-orange-300 font-bold text-lg leading-tight mb-1">{data.education[0].school.split(';')[0]}</div>
                            <div className="text-orange-600 dark:text-orange-400/80 text-sm font-medium">{data.education[0].degree.split(':')[0]}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Experience Header */}
                <div className="md:col-span-2 lg:col-span-4 mt-8 mb-2">
                     <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBriefcase} className="text-slate-400 dark:text-slate-500 text-xl" /> 
                        Experience
                    </h2>
                </div>

                {/* Granular Experience Grid */}
                {gridItems.map((item, idx) => {
                    const delay = 0.3 + (idx * 0.05);
                    
                    if (item.type === 'header') {
                        return (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay }}
                                className="md:col-span-2 lg:col-span-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-3xl p-6 flex flex-col mt-4"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                        <div className="text-slate-600 dark:text-slate-400 font-medium text-lg">{parseFormattedText(item.company)}</div>
                                    </div>
                                    <span className="mt-2 md:mt-0 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
                                        {item.duration}
                                    </span>
                                </div>
                                {item.summary && (
                                    <div className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed border-t border-slate-300/50 dark:border-slate-600/50 pt-4">
                                        {parseFormattedText(item.summary)}
                                    </div>
                                )}
                            </motion.div>
                        );
                    } else { // project
                        return (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay }}
                                className="md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700 flex flex-col"
                            >
                                <div className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3">{item.title}</div>
                                {item.intro && <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">{parseFormattedText(item.intro)}</div>}
                                <ul className="space-y-3 mt-auto">
                                    {item.bullets.map((b, bIdx) => (
                                        <li key={bIdx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                                            <span className="text-slate-300 dark:text-slate-600 mt-1.5 shrink-0">•</span>
                                            <span>{parseFormattedText(b)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    }
                })}

            </div>
        </div>
    );
};

export default BentoResume;
