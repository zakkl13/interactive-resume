import React, { useEffect } from "react";
import HomePage from "@/components/homepage";
import { homeDefault } from "@/data/homeData";

const ResumePage: React.FC = () => {

  useEffect(() => {
    document.title = 'Zakk.IO';
  })
  return (
    <div>
      <HomePage data={homeDefault} />
    </div>
  );
};

export default ResumePage;