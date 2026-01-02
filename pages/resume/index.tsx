import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { resumeData } from "@/data/resumeData";
import { DEFAULT_SKIN, RESUME_SKINS } from "@/components/skins";

const ResumePage: React.FC = () => {
  const router = useRouter();
  const [currentSkinId, setCurrentSkinId] = useState(DEFAULT_SKIN.id);

  useEffect(() => {
    if (router.isReady) {
      const skinParam = router.query.s;
      if (typeof skinParam === 'string' && RESUME_SKINS[skinParam]) {
        setCurrentSkinId(skinParam);
      } else {
        // Fallback to default if param is missing or invalid
        // logic: Only reset if we are ensuring URL dictates state. 
        // If we want /resume to be default, we can set it here.
        // But initial state is already DEFAULT_SKIN.id.
      }
    }
  }, [router.isReady, router.query.s]);

  useEffect(() => {
    document.title = 'Zakk\'s Resume';
  });

  const handleSkinChange = (skinId: string) => {
    setCurrentSkinId(skinId);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, s: skinId },
    }, undefined, { shallow: true });
  };

  const CurrentSkinComponent = RESUME_SKINS[currentSkinId]?.component || DEFAULT_SKIN.component;

  return (
    <div className="relative">
      {/* Skin Switcher Floating Control */}
      <div className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-80 hover:opacity-100 transition-opacity">
        <label className="text-sm font-semibold mr-2 text-gray-700 dark:text-gray-300">View:</label>
        <select 
          value={currentSkinId} 
          onChange={(e) => handleSkinChange(e.target.value)}
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
