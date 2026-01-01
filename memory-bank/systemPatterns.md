# System Patterns

## Architecture
The application follows a standard Next.js (Pages Router) architecture.

### Key Directories
- `pages/`: Contains the application routes (`index.tsx`, `resume/index.tsx`).
- `components/`: Reusable React components.
    - `components/skins/`: Resume "skins" (alternate visual presentations like `ClassicResume`, `TimelineResume`) and registry.
- `data/`: Separation of concerns; content is stored here (`homeData.ts`, `resumeData.ts`) rather than hardcoded in components.
- `styles/`: Global styles and Tailwind configuration.
- `public/`: Static assets (images).
- `utils/`: Helper functions.

## Design Patterns
- **Data-Driven Components**: Components like `HomePage` and `Resume` accept data props, making it easy to update content without touching UI code.
- **Pluggable Visual Skins**: The Resume page uses a "Skin" pattern (`ResumeSkinComponent`) allowing the same data to be rendered by different components (`Classic`, `Timeline`), selectable by the user.
- **Tailwind CSS**: Utility-first styling for rapid UI development and easy dark mode implementation (`dark:` classes).
- **Responsive Design**: Mobile-first approach using Tailwind's breakpoints (`md:`, `lg:`).

## Data Flow
Static data is imported from `data/*.ts` files and passed down to components. This mimics a CMS-like structure but keeps everything client-side/static for performance.
