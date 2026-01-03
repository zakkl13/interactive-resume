import React from "react";
import { ResumeSkinProps } from "./types";
import { ResumeData, Experience, Project, Education, Skill } from "@/data/resumeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faHistory, faTag, faUser, faCalendarAlt, faHome, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { parseFormattedText } from "@/utils/formatter";
import { motion } from "framer-motion";

// Helper to generate a consistent "hash" from a string
const generateHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).substring(0, 7).padEnd(7, '0');
};

type CommitType = 'job' | 'project' | 'education';

interface CommitNode {
    id: string;
    hash: string;
    message: string;
    date: string;
    author: string;
    type: CommitType;
    data?: any;
    // Graph topology
    isMerge?: boolean;
    isBranchStart?: boolean;
    isBranchEnd?: boolean;
    onMainBranch: boolean;
    branchName?: string;
}

const GitResume: React.FC<ResumeSkinProps> = ({ data }) => {
    // Flatten data into a "git log"
    const commits: CommitNode[] = [];

    // Experience (Reverse Chronological usually, but we want newest at top)
    data.experience.forEach((exp, expIdx) => {
        const companyName = exp.company.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
        
        // Job Start (Merge/Commit on Main)
        commits.push({
            id: `job-${expIdx}`,
            hash: generateHash(exp.title + exp.company),
            message: `feat(${companyName}): ${exp.title}`,
            date: exp.duration,
            author: "Zakk",
            type: 'job',
            data: exp,
            onMainBranch: true,
            isBranchStart: true // Start of the "projects" branch scope
        });

        // Projects (Commits on Feature Branch)
        exp.projects.forEach((proj, projIdx) => {
            commits.push({
                id: `proj-${expIdx}-${projIdx}`,
                hash: generateHash(proj.title),
                message: `docs: ${proj.title}`,
                date: "",
                author: "Zakk",
                type: 'project',
                data: proj,
                onMainBranch: false,
                branchName: `feature/${companyName}`
            });
        });
        
        // Mark the last project as the point to merge back? 
        // Or actually, visually, we branch OUT from the previous job and merge INTO the current job?
        // Let's stick to the "Job is Main, Projects are side" model.
        // Actually, for a single job block:
        // * Job Title
        // |\
        // | * Project 1
        // | * Project 2
        // |/
        // * Previous Job
    });

    // Education
    data.education.forEach((edu, eduIdx) => {
        commits.push({
            id: `edu-${eduIdx}`,
            hash: generateHash(edu.degree),
            message: `chore(education): ${edu.degree}`,
            date: "May 2017", // Extract if possible, or use string
            author: "Zakk",
            type: 'education',
            data: edu,
            onMainBranch: true
        });
    });

    // Render Logic
    return (
        <div className="bg-white dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9] min-h-screen font-mono p-4 md:p-8 selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Header (Terminal Prompt Style) */}
                <div className="mb-12 border-b border-gray-200 dark:border-[#30363d] pb-8">
                    <div className="text-sm text-gray-500 dark:text-[#8b949e] mb-2">
                        Last login: {new Date().toDateString()} on ttys001
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-[#58a6ff] mb-4">
                        <span className="text-gray-400 dark:text-[#8b949e]">$</span> git log --graph --oneline --decorate
                    </h1>
                    
                    <div className="flex flex-wrap gap-6 mt-6 text-gray-500 dark:text-[#8b949e]">
                        <a href={data.linkedin} className="hover:text-blue-600 dark:hover:text-[#58a6ff] transition-colors">
                            <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                            origin/linkedin
                        </a>
                        <a href={data.github} className="hover:text-blue-600 dark:hover:text-[#58a6ff] transition-colors">
                            <FontAwesomeIcon icon={faGithub} className="mr-2" />
                            origin/github
                        </a>
                        <a href={`mailto:${data.email}`} className="hover:text-blue-600 dark:hover:text-[#58a6ff] transition-colors">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            user.email
                        </a>
                         <Link href="/" className="hover:text-blue-600 dark:hover:text-[#58a6ff] transition-colors">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            ~ (Home)
                        </Link>
                    </div>

                    <div className="mt-8 space-y-6">
                        {/* Summary */}
                        <div className="p-4 bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-md text-gray-800 dark:text-[#c9d1d9]">
                            <div className="flex justify-between items-center mb-2 border-b border-gray-200 dark:border-[#30363d] pb-2">
                                <span className="text-xs text-gray-500 dark:text-[#8b949e]">README.md</span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                            </div>
                            <div className="whitespace-pre-wrap font-sans text-sm md:text-base">
                                {parseFormattedText(data.summary)}
                            </div>
                        </div>

                        {/* Skills Box */}
                        <div className="p-4 bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-md text-gray-800 dark:text-[#c9d1d9]">
                             <div className="flex justify-between items-center mb-2 border-b border-gray-200 dark:border-[#30363d] pb-2">
                                <span className="text-xs text-gray-500 dark:text-[#8b949e]">package.json</span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                                {data.skills && data.skills.map((skill, idx) => (
                                    <div key={idx}>
                                        <div className="text-red-600 dark:text-[#ff7b72] mb-1">"{skill.category}": [</div>
                                        <div className="pl-4 flex flex-wrap gap-1">
                                            {skill.items.map((item, i) => (
                                                <span key={i} className="text-blue-600 dark:text-[#a5d6ff]">
                                                    "{item}"{i < skill.items.length - 1 ? "," : ""}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-red-600 dark:text-[#ff7b72]">]{idx < data.skills!.length - 1 ? "," : ""}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Graph */}
                <div className="space-y-0">
                    {commits.map((commit, idx) => {
                        const nextCommit = commits[idx + 1];
                        const isLast = idx === commits.length - 1;
                        
                        // Determine graph shape
                        // If current is Main and has projects coming up -> Branch Out
                        // If current is Project -> Straight line or Merge back if last project
                        
                        // Actually, let's simplify visuals using a 2-column grid for the lines.
                        // Column 1: Main Branch
                        // Column 2: Feature Branch
                        
                        return (
                            <motion.div 
                                key={commit.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="flex group"
                            >
                                {/* Graph Column (Fixed Width) */}
                                <div className="w-16 md:w-24 shrink-0 relative flex justify-center text-gray-400 dark:text-[#8b949e]">
                                    <GraphLines commit={commit} nextCommit={nextCommit} />
                                </div>

                                {/* Content Column */}
                                <div className="pb-8 pt-1 flex-grow">
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <span className="text-purple-600 dark:text-[#d2a8ff] text-sm">{commit.hash}</span>
                                        <span className={`text-sm ${commit.onMainBranch ? 'text-green-600 dark:text-[#7ee787]' : 'text-blue-500 dark:text-[#a5d6ff]'}`}>
                                            ({commit.onMainBranch ? 'HEAD -> main' : commit.branchName})
                                        </span>
                                        <span className="text-gray-500 dark:text-[#8b949e] text-xs hidden md:inline">
                                            {commit.date}
                                        </span>
                                    </div>
                                    
                                    <div className="text-lg md:text-xl font-bold hover:underline cursor-pointer decoration-blue-500 dark:decoration-[#58a6ff]">
                                        {commit.message}
                                    </div>

                                    {/* Commit Details (The Content) */}
                                    <div className="mt-2 text-gray-600 dark:text-[#8b949e] pl-4 border-l-2 border-gray-300 dark:border-[#30363d] ml-1">
                                        {commit.type === 'job' && (
                                            <div className="text-sm space-y-2">
                                                <div className="text-gray-900 dark:text-[#c9d1d9]">{parseFormattedText((commit.data as Experience).company)}</div>
                                                {(commit.data as Experience).roleSummary && (
                                                    <div className="italic">{parseFormattedText((commit.data as Experience).roleSummary!)}</div>
                                                )}
                                            </div>
                                        )}

                                        {commit.type === 'project' && (
                                            <div className="text-sm">
                                                 <div className="mb-2 text-gray-800 dark:text-[#c9d1d9]">{parseFormattedText((commit.data as Project).intro)}</div>
                                                 
                                                 {(commit.data as Project).techStack && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {(commit.data as Project).techStack?.split(',').map((tech, tIdx) => (
                                                            <span key={tIdx} className="text-blue-600 dark:text-[#a5d6ff] bg-blue-100 dark:bg-[#1f6feb]/10 px-2 py-0.5 rounded-full text-xs border border-blue-200 dark:border-[#1f6feb]/30">
                                                                #{tech.trim().toLowerCase().replace(/\s+/g, '-')}
                                                            </span>
                                                        ))}
                                                    </div>
                                                 )}

                                                 <ul className="list-disc pl-4 space-y-1">
                                                    {(commit.data as Project).bullets.map((b: string, i: number) => (
                                                        <li key={i}>{parseFormattedText(b)}</li>
                                                    ))}
                                                 </ul>
                                            </div>
                                        )}

                                        {commit.type === 'education' && (
                                            <div className="text-sm">
                                                <div className="text-gray-900 dark:text-[#c9d1d9]">{parseFormattedText((commit.data as Education).school)}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                
                <div className="text-center text-gray-500 dark:text-[#8b949e] mt-12 pb-12 font-mono text-sm">
                    <p>End of log.</p>
                </div>
            </div>
        </div>
    );
};

// Component to draw the SVG lines based on commit context
const GraphLines: React.FC<{ commit: CommitNode, nextCommit?: CommitNode }> = ({ commit, nextCommit }) => {
    // Colors
    const mainColor = "#238636"; // Green
    const branchColor = "#1f6feb"; // Blue
    const dotColor = commit.onMainBranch ? mainColor : branchColor;

    // SVG sizing
    const width = 64; // matches w-16
    const height = "100%"; // stretches to container
    const mainX = 16;
    const branchX = 48;
    const dotY = 14;

    return (
        <div className="w-full h-full absolute top-0 left-0">
            <svg className="w-full h-full overflow-visible">
                {/* Main Branch Line (Always present if not last) */}
                <line 
                    x1={mainX} y1={0} 
                    x2={mainX} y2="100%" 
                    className="stroke-gray-300 dark:stroke-[#30363d]"
                    strokeWidth="2" 
                />

                {/* Branch Line Logic */}
                {!commit.onMainBranch && (
                     <line 
                     x1={branchX} y1={0} 
                     x2={branchX} y2="100%" 
                     className="stroke-gray-300 dark:stroke-[#30363d]"
                     strokeWidth="2" 
                 />
                )}

                {/* Connections */}
                {/* If main branch and next is NOT main -> Branch Out */}
                {commit.onMainBranch && nextCommit && !nextCommit.onMainBranch && (
                     <path 
                        d={`M ${mainX} ${dotY} C ${mainX} ${dotY + 20}, ${branchX} ${dotY}, ${branchX} ${dotY + 40}`}
                        fill="none"
                        className="stroke-gray-300 dark:stroke-[#30363d]"
                        strokeWidth="2"
                     />
                )}
                
                {/* If branch and next is Main -> Merge Back */}
                {!commit.onMainBranch && nextCommit && nextCommit.onMainBranch && (
                     <path 
                     d={`M ${branchX} ${dotY} C ${branchX} ${dotY + 20}, ${mainX} ${dotY}, ${mainX} ${dotY + 40}`}
                     fill="none"
                     className="stroke-gray-300 dark:stroke-[#30363d]"
                     strokeWidth="2"
                  />
                )}

                {/* The Dot */}
                <circle cx={commit.onMainBranch ? mainX : branchX} cy={dotY} r="5" fill={dotColor} className="stroke-white dark:stroke-[#0d1117]" strokeWidth="2" />
            </svg>
        </div>
    );
};

export default GitResume;
