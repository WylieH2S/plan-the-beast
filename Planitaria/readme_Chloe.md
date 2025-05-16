# readme_Chloe.md

> **Living Project Manifest & Continuity Protocol for Planitaria**

**Purpose:** This file is the *persistent, authoritative, append-only manifest* and guidance system for Planitaria 1.0 and beyond. It records every core decision, feature priority, roadmap milestone, and file change (with timestamp and hash) needed to reconstruct and verify the application. It must travel with every build (in `planitaria.meta.json` and application ZIP) and never be overwritten, omitted, or cleared.

**Instructions for AI/Chloe:**
- **ALWAYS** update this file with each code contribution, feature slice, architectural change, or documentation update.
- **Log** all changes in detail: include filenames, feature context, architectural notes, timestamps, and file hashes.
- **State** the *next intended step* or priority at the end of each entry.
- **Preserve** all prior log entries; never delete or alter history.
- **Include** `planitaria.meta.json` alongside this file in every build.
- **Verify** the integrity of this file and referenced hashes on application load.
- **Update** this housekeeping section if protocols change.

---

## 1. Core Purpose & Principles
- **Game-Agnostic Layout Planner:** Browser-based, self-contained canvas for in-game builds. Initial pack: Satisfactory; future packs follow identical architecture.
- **Professional UX:** Dark/earthy base theme with subtle blue/green/yellow accents and hints of purple. Floating, configurable panels with optional magnetic edge snapping; reset/layout presets for desktop, tablet, and touchscreen.
- **Extensibility:** Modular stencil system organized per game pack; in-app stencil editor; AI-powered tutorial/assistant planned.
- **Continuity Guarantee:** This manifest is the single source of truth for project state, structure, and roadmap. It ensures session continuity and rebuildability.

---

## 2. Near-Term Functional Priorities
1. **Save/Load to File:** Design JSON schema for canvas and metadata; implement download/upload handlers.
2. **Canvas & Grid:** Zoomable, pannable grid accurate to game units; placeholder stencil placement.
3. **Layers & Context Menu:** Multiple layers with toggles; right-click context menu stubs (“Delete”, “Duplicate”, etc.).
4. **Overlays & Statistics:** Power-draw overlay; input/output flow shading; side-panel summary with toggles.
5. **UI Panels & Workflow:** Floating panels; safe zones; reset layout; workflow presets.
6. **Tutorial System:** On-first-visit prompt with skip/toggle; designed for future AI companion.

---

## 3. Roadmap & Packaging
- **Version 1.0:** Full browser application ZIP (`Planitaria_1.0.zip`) containing complete source, `readme_Chloe.md`, and `planitaria.meta.json`.
- **Version 1.1:** Installable wrappers for Mac, Windows, iOS, and Android.
- **Version 1.2:** On-canvas AI assistant integration.
- **Community & Branding:** GitHub Pages demo; stencil marketplace; merch concepts (Planitae, Planitist).

---

## 4. Continuity Protocol
- **Always Include:** This file and `planitaria.meta.json` in every build.
- **Append-Only:** Each change log entry must be appended with timestamp and file hash.
- **Verification:** Automated scripts must check for presence and integrity on startup.

---

## 5. Immediate Next Steps
- **Project Setup:** Finalize build pipeline (Vite/Webpack) to output complete ZIP.
- **Implement Save/Load:** Wire download/upload of JSON state.
- **Canvas & Grid Stub:** Basic rendering and stencil placement.
- **Layer/Context Menu Stub:** Two layers; stub menu entries.

---

## 6. Change Log
### [2025-05-15] UI Shell + Core Components
- **Added:**
  - `Toolbar.jsx`, `StencilTray.jsx`, `CanvasArea.jsx`
- **Updated:**
  - `App.jsx` to integrate new components
- **Note:**
  - SSH setup for GitHub confirmed; proper commit discipline enforced.

### [2025-05-15] Canvas Interactivity + Global State Slice
- **Added:**
  - `src/utils/store.js` — zustand global state store for canvas stencils.
- **Updated:**
  - `CanvasArea.jsx` — interactive dragging.
  - `StencilTray.jsx` — clicking adds stencil to canvas.
  - `App.jsx` — integrates interactive features.
- **Dependencies:**
  - `zustand`
- **Next Step:** Integrate deletion, selection, and save/load.

### [2025-05-15] Deleting and Selecting Stencils Slice
- **Added:**
  - Selection logic: highlight selected stencil.
  - Deletion logic: toolbar button removes selected stencil.
- **Updated:**
  - `store.js`, `CanvasArea.jsx`, `Toolbar.jsx`
- **Next Step:** Integrate saving/loading layouts and overlays/statistics.

---

## 7. Current Project Priorities
1. Maintain `readme_Chloe.md` as the living continuity manifest.
2. Each push/commit **MUST** update this file.
3. All contributors must read, update, and honor these protocols and logs.

