import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resumeData } from "@/data/resumeData";
import { DEFAULT_SKIN, RESUME_SKINS } from "@/components/skins";
import { ResumePdf } from "@/components/PdfDocument";

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <span className="text-xs ml-2">...</span>,
  }
);

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
      <div className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-80 hover:opacity-100 transition-opacity flex items-center gap-3">
        <div className="flex items-center">
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
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

        <PDFDownloadLink
          document={<ResumePdf data={resumeData} />}
          fileName="Zakk_Lefkowits_Resume.pdf"
          className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Download PDF"
        >
          {/* @ts-ignore - The render props signature of PDFDownloadLink is sometimes tricky with types, but simpler child works */}
          <FontAwesomeIcon icon={faFilePdf} size="lg" />
        </PDFDownloadLink>
      </div>

      <CurrentSkinComponent data={resumeData} />
    </div>
  );
};

export default ResumePage;
