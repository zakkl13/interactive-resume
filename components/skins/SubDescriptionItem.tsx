import React, { useState } from "react";
import { Project } from "@/data/resumeData";
import { parseFormattedText } from "@/utils/formatter";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface SubDescriptionItemProps {
    sub: Project;
}

const SubDescriptionItem: React.FC<SubDescriptionItemProps> = ({ sub }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative pl-12 mb-6" onClick={(e) => e.stopPropagation()}>
            {/* Sub-item Dot */}
            <div className={`absolute left-[21px] top-1.5 w-3 h-3 border-2 border-teal-500 dark:border-teal-400 rounded-full z-10 transition-colors ${isOpen ? 'bg-teal-500 dark:bg-teal-400' : 'bg-white dark:bg-slate-800'}`}></div>
            
            {/* Header / Toggle */}
            <div 
                className="flex items-center gap-2 cursor-pointer group mb-2 select-none"
                onClick={toggleOpen}
            >
                <h4 className="text-teal-800 dark:text-teal-300 font-bold text-lg group-hover:text-teal-600 dark:group-hover:text-teal-200 transition-colors">
                    {sub.title}
                </h4>
                <div className={`text-teal-500 dark:text-teal-400 text-sm transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-2"> {/* Padding for animation buffer */}
                            {/* Intro - using div instead of p to allow nested divs from tooltips */}
                            {sub.intro && (
                                <div className="text-sm text-slate-500 dark:text-slate-400 italic mb-3">
                                    {parseFormattedText(sub.intro)}
                                </div>
                            )}

                            <ul className="space-y-2 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-100 dark:border-slate-600">
                                {sub.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex items-start">
                                        <span className="mr-2 text-teal-500 dark:text-teal-400 mt-1.5 text-[10px]">•</span>
                                        <span>{parseFormattedText(bullet)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SubDescriptionItem;
