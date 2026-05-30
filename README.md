# Portfolio — Gourav Krishna Mishra

A premium, dark-mode-first developer portfolio built with React, TypeScript, Tailwind CSS, Framer Motion, and GSAP. 

## Overview

This portfolio showcases my work as a **Full Stack AI Developer**, featuring advanced micro-interactions, hardware-accelerated animations, a dynamic bento-style sliding grid, and a custom design system. All content — projects, skills, certifications, and timeline — is driven from a single data manifest (`src/lib/data.ts`) for clean maintenance.

---

## Key Features

### 1. Sliding Split Projects Grid
- **Row-Locked Pairs**: Selected works are organized in pairs of two. On desktop, they default to a `50/50` width split.
- **Dynamic 70/30 Transitions**: Clicking a card widens it to `70%` and shrinks its partner to `30%` horizontally with no layout wrapping or shifting in other rows.
- **Spring Physics**: Layout transitions are configured with tactile physical spring variables (`stiffness: 400`, `damping: 30`, `mass: 0.8`) for a snappy, metallic snap-and-bounce feel.
- **Base Card Action Shortcuts**: Default collapsed card footers show small, direct clickable `Github` and `ExternalLink` shortcuts with isolated click event propagation.

### 2. Interactive Cursor Backlight Glow (Dark Mode)
- ** Spotlighting**: Faint, cursor-tracking radial spotlight layers (`300px` radius, `0.03` opacity) follow mouse coordinates over both the Skills grid and the Projects rows.
- **Translucent Plate Illumination**: Card and skill tile backgrounds are configured as semi-translucent backdrops (`dark:bg-[#1C1C1B]/40` and `dark:bg-[#161615]/30` with `backdrop-blur-[1px]`). This allows the spotlight halo to glow through from behind, highlighting the borders and grid lines adjacent to the mouse.

### 3. Capabilities & Skills Directory
- **Reordered Hierarchy**: Skills are sorted logically by domain importance (Core AI/ML → TypeScript/Web Stack → Databases → DevOps & Infrastructure → General OOP).
- **Inspection Console**: Clicking or hovering any tile displays its technical definition inside a monospace prompt block (`>_`) with all boilerplate prefixes and first-person declarations removed.

### 4. Journey Timeline
- **Reliable Scroll Animation**: Alternating left-aligned timeline with unified GSAP ScrollTrigger offsets (`top 90%` viewport entry) so that every milestone node (including the final node) lights up active white reliably on scroll-to-bottom.
- **External URL Support**: Interactive timeline entries support external url redirects (e.g. clicking the Praava Legal title redirects to `praavalegal.com` in a new tab).

### 5. Premium Branding & Layout Refinements
- **Tomato Logo & Favicon**: Brand header replaced with a clean tomato emoji (`🍅`) featuring a playful hover scaling and tilt transition. Favicon configured as a lightweight inline SVG emoji.
- **Keyboard Shortcuts Panel**: Keystroke legends bar (`[T]` Theme, `[M]` Menu, `[G]` GitHub, `[L]` LinkedIn) mapped for quick controls.
- **Menu Boundary Separation**: Side navigation menu configured with an elevated background contrast (`dark:bg-[#1C1C1B]`) and orientation-based borders (`border-l` or `border-r`) to separate it cleanly from the main viewport, with scaled-down compact text links.

---

## Tech Stack

- **React 18** — Component-driven architecture
- **TypeScript** — Static typing and strict interfaces
- **Tailwind CSS** — Utility styling with custom CSS design tokens
- **Framer Motion** — Spring transitions and layout interpolations
- **GSAP (ScrollTrigger)** — Scroll-triggered timeline dot reveals and entrance timelines
- **developer-icons** — Branded SVG assets for the Skills directory
- **Vite** — Fast, modular bundling and hot reloading

---

## Project Structure

```
src/
  components/
    Hero.tsx           — Landing header with key shortcuts and bio
    Projects.tsx       — Sliding split row-locked grid with spring layout cards
    Skills.tsx         — Skills directory grid with inspection console & backlight glow
    Certifications.tsx — Certifications directory with hover reveals
    Timeline.tsx       — Vertical journey milestones with scroll triggers and URLs
    Footer.tsx         — Footer with scrolling hooks and shortcuts info
    ui/
      StaggeredMenu.tsx  — Navigation menu overlay with separation borders & logo
      Grainient.tsx      — WebGL background shader
      Icons.tsx          — Hand-rolled SVG assets (including Spotify and Github)
      MagneticButton.tsx — Tactile physics button wrapper
  lib/
    data.ts            — Central source of truth for all content data
  hooks/
    use-theme.tsx      — Theme switches with View Transition clipping paths
  pages/
    Index.tsx          — Main landing layout
```

---

## Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/tamatar-23/prtf_1
   cd prtf_1
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build Production Assets**:
   ```bash
   npm run build
   ```
