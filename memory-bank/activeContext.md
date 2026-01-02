# Active Context

## Current Focus
Enhancing the visual experience of the Resume page, specifically the Timeline skin.

## Recent Changes
- **Timeline Skin Improvements**:
    - Created `SubDescriptionItem` component to allow sub-descriptions to be collapsible (expanded by user interaction).
    - Updated `TimelineResume` to use the new component and show high-level summaries (intros) when experiences are collapsed.
    - Moved the "Summary" section out of the connected timeline flow, placing it as a standalone introductory block.
    - Added smooth animations using `framer-motion`.
- **New Skin**: Implemented "Bento Grid" skin (`BentoResume.tsx`), a modern, tile-based layout using CSS Grid and Framer Motion.
- **Bug Fixes**:
    - Fixed React hydration errors caused by invalid HTML nesting (`<p>` tags containing `<div>` from tooltips) in both `TimelineResume` and `ClassicResume`.
    - Fixed "unique key" warnings in `ClassicResume`.
    - Fixed click propagation issues where clicking a sub-description would collapse the parent experience card.
- **Resume Skins Persistence**: Updated `ResumePage` to persist the selected skin in the URL query string (`?skin=timeline`).

## Next Steps
1.  **Content Refresh**: Continue updating resume data and personal info.
2.  **Visual Flair**: Continue refining the design.

## Active Decisions
- **Documentation**: Using Markdown-based Memory Bank to track context across sessions.
- **Framework**: Sticking with Next.js but upgrading versions.
