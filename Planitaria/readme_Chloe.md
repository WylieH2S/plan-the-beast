# Planitaria 1.0 — Machine Manifest

```json
{
  "project": "Planitaria",
  "version": "1.0",
  "generated_at": "2025-05-17T11:00:00-04:00"
}
```

---

## A. Quick Rebuild Summary
To reconstruct the full application from scratch:
1. `git clone https://github.com/WylieH2S/plan-the-beast.git`
2. `cd plan-the-beast/Planitaria`
3. `npm install`
4. `npm run build`
5. `zip -r Planitaria_1.0.zip dist/ readme_Chloe.md planitaria.meta.json`

---

## B. Vision & Goals
- **Browser-based**, game-agnostic layout planner.
- **Core features v1.0**:
  - 32px grid canvas with snap-to-grid
  - Dynamic stencil loader for Satisfactory gamepack
  - Multi-layer manager with overlays
  - Context menu actions (Rotate, Duplicate, Delete, Z-order)
  - Inspector & Settings panels (snap toggle, tutorial toggle, reset layout)
  - Toolbar tools (Place, Rotate, Eraser)
  - JSON Save/Load + autosave
  - On-first-run tutorial with localStorage toggle

---

## C. Directory Structure Snapshot
```
Planitaria/
├─ public/
│  ├─ index.html
│  └─ styles.css
├─ src/
│  ├─ main.js
│  ├─ PlannerApp.jsx
│  ├─ components/
│  └─ gamepacks/
├─ examples/
│  └─ iron-bar-line.json
├─ readme_Chloe.md     ← machine manifest (this file)
└─ planitaria.meta.json
```

---

## D. Machine Metadata & Validation
Every file is tracked with a SHA-256 hash to ensure consistency:

| Path                                    | SHA-256 Hash                             |
|-----------------------------------------|------------------------------------------|
| src/PlannerApp.jsx                      | 226381c654cc7fae74f664fc9e5a8458b9f6d42a |
| src/components/Canvas.jsx               | a55cc1b0ee6c95913ce62e7d8afdaee63ba45879 |
| ...                                     | ...                                      |

*Replace any `*generate*` entries with the computed hash after file creation.*

---

## E. Change Log
- **2025-05-17**: Initialized machine manifest and quick rebuild summary.
- **2025-05-14**: Completed core v1.0 features checklist.
- **2025-05-13**: Drafted initial roadmap and tutorial design.

---

## F. Chloe Interface Notes
This manifest is designed for automated parsing by the Chloe AI companion:
- JSON front-matter for easy metadata extraction.
- Well-defined sections for rebuild, goals, structure, and validation.
- Tabular file manifest for hash-based integrity checks.

---

## G. Stat & Flow Schema Examples
```json
{
  "machineId": "Constructor",
  "inputRate": 120,
  "outputRate": 90,
  "powerDraw": 4
}
```

---

## H. Tutorial Flow Data
```json
[
  { "step": 1, "action": "load default gamepack", "message": "Welcome to Planitaria..." },
  { "step": 2, "action": "place stencil",   "message": "Click on a machine to add it to canvas." }
]
```

---

## I. Roadmap & Extensions
- **v1.1**: PWA support, production minification
- **v1.2**: Integrated AI assistant panel, offline mode
- **Future**: Multiplayer sync, custom gamepack editor

---

## J. Build & Verify Commands
```bash
npm install
npm run dev
npm run build
shasum -a 256 src/**/*.jsx public/* examples/*.json
```
