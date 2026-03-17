<div align="center">

# 🔍 Saptarshi Bisoi — Detective Portfolio

**A cinematic, narrative-driven developer portfolio built on a detective investigation theme.**
Every section is a case file. Every skill is evidence. Every project is a solved mystery.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-saptarshi--bisoi.vercel.app-gold?style=for-the-badge&logo=vercel)](https://saptarshi-bisoi.vercel.app)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-bd34fe?style=for-the-badge&logo=vite)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff006e?style=for-the-badge)](https://www.framer.com/motion)

</div>

---

## 🎬 Concept

This portfolio is not a traditional skills page — it's a **narrative investigation system**:

| Layer | Theme | Section |
|-------|-------|---------|
| 🕵️ Identity | Detective dossier | Hero |
| 🗂️ Case Files | Solved mysteries | Projects Archive |
| 🔬 Forensic Lab | Constellation of tools | Evidence Locker |
| 📜 Timeline | Investigation history | Work Experience |
| 🌍 Field Ops | Tech events & community | Field Investigations |
| 🎬 Archives | Cinematic influences | Cinematic Case Files |
| 🎓 Training | Academic background | Education |
| 📡 Dispatch | Contact channel | Contact |

---

## ✨ Features

- **Cinematic Intro Sequence** — plays once per session, sets the detective atmosphere
- **Smooth Scroll** — powered by [Lenis](https://github.com/darkroomengineering/lenis) for buttery page navigation
- **Evidence Constellation System** — 15 floating tech nodes with idle float animations, mouse-pull-on-hover, radial scanner ring, and boot sequence overlay
- **Case File Cards** — parchment-textured project cards with tilt, hover stamps, and direct GitHub/live links
- **Investigation History** — animated vertical timeline of work experience
- **Flip Card Film Archive** — cinematic influences displayed as movie poster flip cards
- **Field Investigations** — photo-pinboard style event gallery with lightbox drawer
- **Mission Tracker** — fixed HUD overlay tracking scroll progress
- **Ambient Audio System** — subtle SFX for interactions (paper rustle, click, shutter)
- **Detective Background** — animated radar scanner and particle atmosphere on the hero
- **Full Mobile Responsive** — optimized across all breakpoints

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Animations | Framer Motion 12 |
| Smooth Scroll | Lenis |
| Styling | Tailwind CSS v4 + Vanilla CSS custom properties |
| Icons | Font Awesome 6 (CDN) |
| Fonts | Playfair Display, Special Elite, Inter (Google Fonts) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
/
├── public/              # Static assets (film posters, mission photos, logo)
├── src/
│   ├── App.jsx          # Root component — layout & intro sequence logic
│   ├── index.css        # Design system (CSS custom properties, utilities)
│   ├── main.jsx         # React entry point
│   └── components/
│       ├── Hero.jsx               # Landing hero with radar & typewriter
│       ├── ClassifiedFile.jsx     # About / dossier section
│       ├── ProjectsArchive.jsx    # Case files — project cards
│       ├── EvidenceLocker.jsx     # Constellation skills system
│       ├── InvestigationHistory.jsx  # Work experience timeline
│       ├── FieldInvestigations.jsx   # Events photo board
│       ├── CinematicCaseFiles.jsx    # Film flip-card archive
│       ├── Education.jsx          # Academic background
│       ├── Contact.jsx            # Contact form / links
│       ├── Navbar.jsx             # Fixed navigation with keyboard shortcuts
│       ├── Footer.jsx             # Footer
│       ├── IntroSequence.jsx      # Cinematic session intro (plays once)
│       ├── MissionTracker.jsx     # Fixed scroll-progress HUD
│       ├── InvestigationAudio.jsx # Ambient SFX context
│       ├── DetectiveBackground.jsx # Hero particle + radar background
│       └── SmoothScroll.jsx      # Lenis wrapper
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Start with network access (for mobile testing)
npm run dev -- --host
```

> Dev server runs at `http://localhost:5173`

---

## 🏗️ Build & Deploy

```sh
# Production build
npm run build

# Preview production build locally
npm run preview
```

Output goes to `dist/`. Deploy the `dist/` folder — or connect the repo to **Vercel** for automatic deployments on every push.

**Vercel Settings:**
| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## 🎨 Design System

All design tokens live in `src/index.css` under `@theme`:

```css
--color-bg: #0a0c10          /* Deep charcoal navy */
--color-gold: #c8a44d        /* Aged gold accent */
--color-red: #b23a3a         /* Evidence red */
--color-parchment: #f5f1e8   /* Case file parchment */
--font-heading: 'Playfair Display'
--font-mono: 'Special Elite'
--font-body: 'Inter'
```

---

## 📜 License

MIT © [Saptarshi Bisoi](https://github.com/saptarshi-bisoi)
