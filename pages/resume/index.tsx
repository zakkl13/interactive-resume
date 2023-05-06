import React, { useEffect } from "react";
import Resume from "@/components/resume";
import { resumeData } from "@/data/resumeData";

const ResumePage: React.FC = () => {

  useEffect(() => {
    document.title = 'Zakk\'s Resume';
  })
  return (
    <div>
      <Resume data={resumeData} />
    </div>
  );
};

export default ResumePage;