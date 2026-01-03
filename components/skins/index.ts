import ClassicResume from "./ClassicResume";
import GitResume from "./GitResume";
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
    },
    git: {
        id: "git",
        name: "Git Log",
        component: GitResume
    }
};

export const DEFAULT_SKIN = RESUME_SKINS.timeline;
