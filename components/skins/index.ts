import ClassicResume from "./ClassicResume";
import TimelineResume from "./TimelineResume";
import { ResumeSkinDefinition } from "./types";

export const RESUME_SKINS: Record<string, ResumeSkinDefinition> = {
    classic: {
        id: "classic",
        name: "Classic",
        component: ClassicResume
    },
    timeline: {
        id: "timeline",
        name: "Timeline",
        component: TimelineResume
    }
};

export const DEFAULT_SKIN = RESUME_SKINS.classic;
