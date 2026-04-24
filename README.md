# Portfolio — Gourav Krishna Mishra

A premium, dark-mode-first developer portfolio built with React, TypeScript, GSAP, and a custom design system.

## Overview

This portfolio showcases my work as a Full Stack AI Developer, featuring animated section reveals, a radial theme transition, a staggered navigation menu, and a grainient shader background. All content — projects, skills, certifications, and timeline — is driven from a single `src/lib/data.ts` file for easy updates.

## Features

- Radial clip-path view transition animation for the dark/light mode toggle
- Staggered navigation menu with GSAP-powered entrance animations
- Equal-size project grid with click-to-expand wide cards showing description, tech stack with developer-icons, and links
- Tech stack section with branded SVG icons from developer-icons and click-to-reveal definitions
- Alternating left/right timeline layout with scroll-triggered slide-in animations
- Custom grainient WebGL shader background that adapts to the active theme
- Magnetic resume button in the hero section
- Custom dot cursor on desktop
- Fully responsive layout

## Tech Stack

- React — component-based UI
- TypeScript — static typing throughout
- Vite — development server and build tool
- Tailwind CSS — utility-first styling with a custom design token system
- GSAP — scroll-triggered and entrance animations
- developer-icons — branded SVG icons for tech stack and project tags
- Plus Jakarta Sans — primary typeface via Fontsource

## Project Structure

```
src/
  components/
    Hero.tsx           — landing section with bio, social links, and resume button
    Projects.tsx       — equal-size project grid with expandable detail cards
    Skills.tsx         — tech stack grid with developer-icons and click definitions
    Certifications.tsx — certification list with hover animations
    Timeline.tsx       — alternating left/right journey timeline
    Footer.tsx         — minimal footer with scroll-to-top
    ui/
      StaggeredMenu.tsx  — animated navigation menu with social links and resume
      Grainient.tsx      — WebGL grain shader background
      MagneticButton.tsx — magnetic hover effect button wrapper
      SectionLabel.tsx   — section number + label component
  lib/
    data.ts            — all site content: personal info, projects, skills, certifications, timeline
  hooks/
    use-theme.tsx      — theme context with view transition animation
  pages/
    Index.tsx          — root page, assembles all sections
```

## Getting Started

Prerequisites: Node.js 18 or higher, npm.

```bash
git clone https://github.com/tamatar-23/prtf_1
cd prtf_1
npm install
npm run dev
```

The dev server runs at `http://localhost:8080` by default.

## Customization

All personal content is centralized in `src/lib/data.ts`. Update the `personal`, `projects`, `skills`, `certifications`, and `timeline` exports to make the portfolio your own.

Theme colors are defined as CSS custom properties in `src/index.css` under `:root` (light) and `.dark` (dark mode).

## Build

```bash
npm run build
```

Output goes to the `dist/` directory, ready for deployment on Vercel, Netlify, or any static host.
