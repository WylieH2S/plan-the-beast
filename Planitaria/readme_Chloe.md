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
- **Project Setup:** Complete (Vite/Webpack pipeline & ZIP packaging)
- **Save/Load Implementation:** Complete (download/upload JSON state handlers)
- **Canvas & Grid Stub:** Complete (zoomable/pannable grid & placeholder stencils)
- **Layer & Context-Menu Stub:** Complete (multi-layer toggles & right-click stubs)
- **Overlays & Statistics Stub:** Complete (power-draw overlay & side-panel summary)
- **UI Panels & Workflow Stub:** Pending (floating panels, safe zones, layout presets)
- **Tutorial System:** Pending (first-visit prompts, skip/toggle, AI wiring)
- **Final Packaging & Release:** Pending (bundle into `Planitaria_1.0.zip`, QA, publish)

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

### [2025-05-15] Save/Load Controls Integration
- **Added:**
  - `src/components/SaveLoadControls.jsx`
  - `src/components/Toolbar.jsx` (with SaveLoadControls integrated)
- **Next Step:** Test and validate Save/Load functionality; proceed to Canvas & Grid stub.

### [2025-05-15] Canvas & Grid Stub Integration
- **Added:**
  - `src/utils/store.js`
  - `src/components/CanvasGrid.jsx`
  - `src/components/CanvasArea.jsx`
- **Next Step:** Implement Layers & Context-Menu stub for multi-layer toggles and right-click actions.

### [2025-05-15] Layers & Context-Menu Stub Integration
- **Added:**
  - `src/components/LayerControls.jsx`
  - `src/components/ContextMenu.jsx`
  - Updated `src/utils/store.js` to include `layers`, `activeLayer`, and `setActiveLayer` state.
- **Next Step:** Integrate layer toggles into the Toolbar and bind context-menu actions in CanvasGrid.

### [2025-05-16] Core 1.0 Stub Completion
- **Status:** All four core stubs (Project Setup, Save/Load, Canvas & Grid, Layers & Context-Menu) have been implemented.
- **Next Step:** Implement Overlays & Statistics stub for visual overlays and summaries.

### [2025-05-16] Overlays & Statistics Stub Integration
- **Added:**
  - Updated `src/utils/store.js` to add `overlaySettings` and `stats` state.
  - `src/components/OverlayLayer.jsx`
  - `src/components/StatisticsPanel.jsx`
- **Next Step:** Build UI Panels & Workflow stub for floating panels and presets.

---

## 7. Launch Checklist
1. Implement Overlays & Statistics stub and validate visual feedback. ✅
2. Build UI Panels & Workflow stub; ensure safe-zone and reset-layout functionality.
3. Integrate Tutorial System with user prompts and skip/toggle controls.
4. Perform end-to-end QA: cross-browser, performance, and mobile/touch testing.
5. Finalize and generate `Planitaria_1.0.zip` including all source, `readme_Chloe.md`, and `planitaria.meta.json`.
6. Publish to GitHub Releases and enable GitHub Pages demo.

---

## 8. Current Project Priorities
1. Maintain `readme_Chloe.md` as the living continuity manifest.
2. Each push/commit **MUST** update this file.
3. All contributors must read, update, and honor these protocols and logs.
