import React, { useState } from "react";
import { ResumeSkinProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faLocationDot, faChevronDown, faChevronUp, faBriefcase, faGraduationCap, faUser, faChevronRight, faCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { parseFormattedText } from "@/utils/formatter";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SubDescriptionItem from "./SubDescriptionItem";

const TimelineResume: React.FC<ResumeSkinProps> = ({ data }) => {
    // Default to 'summary' expanded so it's visible initially
    const [expandedSection, setExpandedSection] = useState<string | null>('summary');

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="bg-[#FDFBF7] dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900 dark:selection:bg-teal-900 dark:selection:text-teal-100 transition-colors duration-300">
            <motion.div 
                className="container mx-auto p-4 md:p-8 max-w-4xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header */}
                <motion.header variants={itemVariants} className="text-center mb-16 pt-8">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-slate-900 dark:to-slate-100 bg-clip-text text-transparent">
                        {data.name}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-6 text-xl text-slate-500 dark:text-slate-400">
                        <motion.a whileHover={{ scale: 1.2, color: "#0077b5" }} href={data.linkedin}>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, color: "#333" }} href={data.github} className="hover:text-[#333] dark:hover:text-white">
                            <FontAwesomeIcon icon={faGithub} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, color: "#ef4444" }} href={`mailto:${data.email}`}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.2, color: "#059669" }}>
                            <Link href="/">
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="mt-4 flex justify-center items-center text-sm text-slate-500 dark:text-slate-400 font-mono">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                        <span>{parseFormattedText(data.location)}</span>
                    </div>
                </motion.header>

                {/* Timeline */}
                <div className="relative pl-8 md:pl-12">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-600 via-slate-300 dark:via-slate-700 to-transparent opacity-40"></div>

                    {/* Summary & Skills Section (Timeline Item) */}
                    <motion.div variants={itemVariants} className="relative mb-16">
                        {/* Dot */}
                        <div 
                            className={`absolute -left-[22px] md:-left-[30px] top-6 w-4 h-4 rounded-full z-10 cursor-pointer transition-all duration-300 ${expandedSection === 'summary' ? 'bg-teal-600 scale-125 shadow-[0_0_15px_rgba(13,148,136,0.6)]' : 'bg-[#FDFBF7] dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 hover:border-teal-500'}`}
                            onClick={() => toggleSection('summary')}
                        ></div>

                        {/* Content */}
                        <div className="w-full">
                            <div 
                                className={`bg-white dark:bg-slate-800 rounded-xl border ${expandedSection === 'summary' ? 'border-teal-200 dark:border-teal-800 shadow-md shadow-teal-50 dark:shadow-teal-900/20' : 'border-slate-200 dark:border-slate-700 shadow-sm'} overflow-hidden cursor-pointer transition-all`}
                                onClick={() => toggleSection('summary')}
                            >
                                <div className="p-6 pb-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUser} className="text-teal-600 dark:text-teal-400" /> 
                                            Summary
                                        </h3>
                                        <FontAwesomeIcon icon={expandedSection === 'summary' ? faChevronUp : faChevronDown} className="text-slate-400 dark:text-slate-500" />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedSection === 'summary' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-700">
                                                {/* Summary Text */}
                                                <div className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                                                    {parseFormattedText(data.summary)}
                                                </div>

                                                {/* Divider */}
                                                <div className="h-px bg-slate-100 dark:bg-slate-700 my-6"></div>

                                                {/* Skills */}
                                                <div>
                                                    <h3 className="text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-3 flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faCode} /> Skills
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                                        {data.skills && data.skills.map((skill, idx) => (
                                                            <div key={idx}>
                                                                <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase mb-1.5">{skill.category}</h4>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {skill.items.map((item, i) => (
                                                                        <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md border border-slate-200 dark:border-slate-600">
                                                                            {item}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Experience Section */}
                    <div className="mb-16">
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                            <div className="absolute -left-[22px] md:-left-[30px] w-4 h-4 bg-[#FDFBF7] dark:bg-slate-900 border-2 border-teal-600 rounded-full z-10"></div>
                            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-400 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBriefcase} /> Experience
                            </h2>
                        </motion.div>

                        <div className="space-y-12">
                            {data.experience.map((exp, idx) => {
                                const sectionId = `exp-${idx}`;
                                const isExpanded = expandedSection === sectionId;
                                
                                return (
                                    <motion.div 
                                        key={idx} 
                                        variants={itemVariants} 
                                        className="relative"
                                    >
                                        {/* Dot */}
                                        <div 
                                            className={`absolute -left-[22px] md:-left-[30px] top-6 w-4 h-4 rounded-full z-10 cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-teal-600 scale-125 shadow-[0_0_15px_rgba(13,148,136,0.6)]' : 'bg-[#FDFBF7] dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 hover:border-teal-500'}`}
                                            onClick={() => toggleSection(sectionId)}
                                        ></div>

                                        {/* Content */}
                                        <div className="w-full">
                                            <div 
                                                className={`bg-white dark:bg-slate-800 rounded-xl border ${isExpanded ? 'border-teal-200 dark:border-teal-800 shadow-md shadow-teal-50 dark:shadow-teal-900/20' : 'border-slate-200 dark:border-slate-700 shadow-sm'} overflow-hidden cursor-pointer transition-all`}
                                                onClick={() => toggleSection(sectionId)}
                                            >
                                                <div className="p-6 pb-2">
                                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                                                            <div className="text-slate-500 dark:text-slate-400 font-medium mb-1">{parseFormattedText(exp.company)}</div>
                                                        </div>
                                                        <div className="text-teal-600 dark:text-teal-400 font-mono text-sm mt-1 md:mt-0 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full inline-block md:block w-fit whitespace-nowrap">
                                                            {exp.duration}
                                                        </div>
                                                    </div>

                                                    {/* Role Summary - Always visible */}
                                                    {exp.roleSummary && (
                                                        <div className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed pl-4 py-1">
                                                            {parseFormattedText(exp.roleSummary)}
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider opacity-0">Highlights</span>
                                                        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="text-slate-400 dark:text-slate-500" />
                                                    </div>
                                                </div>
                                                
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-700 relative">
                                                                {/* Nested Timeline Line */}
                                                                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                                                                <div className="space-y-8 mt-6">
                                                                    {exp.projects.map((proj, pIdx) => (
                                                                        <SubDescriptionItem key={pIdx} sub={proj} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="mb-16">
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                            <div className="absolute -left-[22px] md:-left-[30px] w-4 h-4 bg-[#FDFBF7] dark:bg-slate-900 border-2 border-teal-600 rounded-full z-10"></div>
                            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-400 flex items-center gap-2">
                                <FontAwesomeIcon icon={faGraduationCap} /> Education
                            </h2>
                        </motion.div>

                        <div className="space-y-8">
                            {data.education.map((edu, idx) => (
                                <motion.div 
                                    key={idx} 
                                    variants={itemVariants} 
                                    className="relative"
                                >
                                    {/* Dot */}
                                    <div className="absolute -left-[22px] md:-left-[30px] top-6 w-4 h-4 bg-[#FDFBF7] dark:bg-slate-900 border-2 border-teal-600 rounded-full z-10"></div>
                                    
                                    <div className="bg-white dark:bg-slate-800 w-full p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 shadow-sm transition-colors">
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-lg p-2 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-600">
                                                <img src={edu.image} alt={edu.school} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="text-center md:text-left">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                                                <p className="text-teal-700 dark:text-teal-400">{edu.school}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TimelineResume;
