import React, { useEffect } from "react";
import HomePage from "@/components/homepage";
import { homeDefault } from "@/data/homeData";

const ResumePage: React.FC = () => {

  useEffect(() => {
    document.title = 'Zakk.IO';
  })
  return (
    <div className="bg-gradient-to-r from-yellow-200 to-yellow-500 dark:from-yellow-700 dark:to-yellow-900">
      <div className="max-w-5xl mx-auto">
        <HomePage data={homeDefault} />
      </div>
    </div>
  );
};

export default ResumePage;