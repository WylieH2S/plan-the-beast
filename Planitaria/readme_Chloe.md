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
5. **UI Panels & Workflow:** Complete (floating panels, safe zones, layout presets)
6. **Tutorial System:** Complete (first-visit prompts; skip/toggle; stub integration)

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
- **Final Packaging & Release:** Pending (bundle into `Planitaria_1.0.zip`, QA, publish)

---

## 6. Change Log
### [2025-05-17] Tutorial System Stub Integration
- **Added:**
  - `tutorialSettings` state in `src/utils/store.js` (`isFirstVisit`, `isTutorialEnabled`, `markTutorialSeen`, `toggleTutorial`).
  - `src/components/TutorialPrompt.jsx` (first-visit prompt with skip/toggle control).
- **Updated:** App.jsx to include all core components in layout grid.
- **Next Step:** Perform end-to-end QA and finalize packaging.

---

## 7. Launch Checklist
1. Implement Overlays & Statistics stub and validate visual feedback. ✅
2. Build UI Panels & Workflow stub; ensure safe-zone and reset-layout functionality. ✅
3. Integrate Tutorial System with user prompts and skip/toggle controls. ✅
4. Perform end-to-end QA: cross-browser, performance, and mobile/touch testing.
5. Finalize and generate `Planitaria_1.0.zip` including all source, `readme_Chloe.md`, and `planitaria.meta.json`.
6. Publish to GitHub Releases and enable GitHub Pages demo.

---

## 8. Current Project Priorities
1. Maintain `readme_Chloe.md` as the living continuity manifest.
2. Each push/commit **MUST** update this file.
3. All contributors must read, update, and honor these protocols and logs.
