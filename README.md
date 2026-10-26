# Nabeel Ahmad — Software Developer Portfolio
A customizable single-page portfolio built with React, Vite, TypeScript, Tailwind CSS, GSAP, Framer Motion, hls.js, and React Router.

## Run locally
1. Install Node.js 22 LTS or newer (Node 20.19+ also supported).
2. Extract this ZIP.
3. Open the extracted nabeel-software-portfolio folder in VS Code.
4. Open Terminal > New Terminal and run:

    npm install
    npm run dev

5. Open the Local URL printed in the terminal (usually http://127.0.0.1:5173).
Keep that terminal running. Press Ctrl+C to stop.
Do not double-click index.html: this is a Vite project.

## Production
    npm run build
    npm run preview

Upload the generated dist folder to a static host such as Vercel or Netlify. No backend or secrets are required.

## Start customizing
- src/data.ts: name, links, availability, projects, and developer notes.
- src/App.tsx: sections, project artwork, resume dialog, toolkit.
- src/index.css: visual design, responsive rules, animations.
- tailwind.config.js: theme tokens and fonts.
- index.html: page title and search description.

## First-version content
Your name, location, internship availability, GitHub, and LinkedIn are included.
Project artwork is original illustrative UI, not a screenshot of your actual applications. Project descriptions use known project context, with no invented client counts, experience statistics, or results.
The Resume button opens an introductory profile; replace with your real PDF CV when ready.
The contact button uses LinkedIn until you add an email in src/data.ts. Once set, it automatically becomes a mailto button.
Developer notes open readable dialogs; these are short reflections, not fabricated published journal articles.
Project-specific repository links and actual project screenshots are the next content update.

## Visuals and motion
Includes 000–100 loading screen, rotating roles, GSAP entrance, HLS video hero and footer, project bento grid, modal details, developer notes, pinned parallax toolkit, marquee, smooth anchors, responsive layout, keyboard dialog navigation, Escape-to-close, and reduced-motion support.
Online access is needed for the supplied Mux video and Google Fonts. A CSS background and system font fallbacks keep the layout usable without them. The external video remains owned/hosted by its provider; replace it if needed.
No node_modules or npm cache is shipped. package-lock.json is included when dependency installation completes successfully.

Verification note: TypeScript transpilation / syntax checks, CSS parsing, and JSON configuration checks passed. A full dependency install and production build could not be completed in the creation environment because registry.npmjs.org DNS resolution was unavailable. Run npm install and npm run build on your machine to perform full type-checking and bundling. Browser rendering has not been verified in this environment.
