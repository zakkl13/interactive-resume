import { ResumeData } from "@/data/resumeData";
import React from "react";

export interface ResumeSkinProps {
    data: ResumeData;
}

export type ResumeSkinComponent = React.FC<ResumeSkinProps>;

export interface ResumeSkinDefinition {
    id: string;
    name: string;
    component: ResumeSkinComponent;
}
