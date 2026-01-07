# Active Context

## Current Focus
Finalizing the Timeline skin with Summary/Skills integration and PDF updates.

## Recent Changes
- **PDF Generation**:
    - Added `website` field to `ResumeData` interface and `resumeData` object (pointing to `https://zakk.io/resume`).
    - Updated `PdfDocument.tsx` to include a link to `zakk.io/resume` in the header contact row.
    - Verified that web skins (`ClassicResume`, `TimelineResume`, `GitResume`) are NOT affected and do not display this new field (they use hardcoded links to `/` or standard navigation).
- **Timeline Skin Update**:
    - Integrated **Summary & Skills** into the main timeline flow as the first collapsible item.
    - Implemented a unified collapsible state (`expandedSection`) to manage visibility of Summary and Experience items.
    - Set default state to show **Summary & Skills** expanded initially, while Experience items start collapsed.
    - **Reverted** the addition of a separate "Profile" section header based on user feedback to save vertical space. The Summary is now a direct node on the timeline.
    - Added a visible **"Projects"** header next to the expand arrow in experience items to clarify hidden content, and added a **pronounced bounce animation to the arrow of the first experience item** to draw attention when it scrolls into view.
- **Layout Refinement (Git & Timeline)**:
    - Moved the **Skills** section to appear **below** the Summary in both the Git and Timeline skins.
- **Skills Integration**:
    - Updated `ClassicResume.tsx` to display skills in a compact grid layout with smaller badges (`text-xs`, reduced padding) and spacing to optimize vertical real estate.
- **Tech Stack Integration**:
    - Added tech stack data and rendering to projects.

## Next Steps
1.  **Content Refresh**: Continue updating resume data and personal info.
2.  **Visual Flair**: Continue refining the design.

## Active Decisions
- **PDF Links**: The PDF should contain an explicit link to the website (`zakk.io/resume`) since it is a static document distributed offline. The web version does not need this link as it IS the website.
- **Skills Presentation**:
    - **Timeline**: Integrated timeline node containing Summary and Skills (compact).
- **Timeline Structure**: "Summary" is treated as a primary node on the timeline (like a Job), rather than a Section Header, to maximize screen real estate.
- **Documentation**: Using Markdown-based Memory Bank to track context across sessions.
