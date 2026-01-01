import React, { useEffect, useState } from "react";
import { resumeData } from "@/data/resumeData";
import { DEFAULT_SKIN, RESUME_SKINS } from "@/components/skins";

const ResumePage: React.FC = () => {
  const [currentSkinId, setCurrentSkinId] = useState(DEFAULT_SKIN.id);

  useEffect(() => {
    document.title = 'Zakk\'s Resume';
  });

  const CurrentSkinComponent = RESUME_SKINS[currentSkinId]?.component || DEFAULT_SKIN.component;

  return (
    <div className="relative">
      {/* Skin Switcher Floating Control */}
      <div className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-80 hover:opacity-100 transition-opacity">
        <label className="text-sm font-semibold mr-2 text-gray-700 dark:text-gray-300">View:</label>
        <select 
          value={currentSkinId} 
          onChange={(e) => setCurrentSkinId(e.target.value)}
          className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
        >
          {Object.values(RESUME_SKINS).map(skin => (
            <option key={skin.id} value={skin.id}>{skin.name}</option>
          ))}
        </select>
      </div>

      <CurrentSkinComponent data={resumeData} />
    </div>
  );
};

export default ResumePage;
