# Planitaria 1.0 — AI Manifest

## 1. Vision & Goals
Planitaria is a browser-based, game-agnostic layout planner.  
**Version 1.0** must include:
- 32px grid canvas with snap-to-grid
- Stencil panel loading “Satisfactory” machines (Smelter, Constructor, Conveyor, etc.)
- Layer manager with per-layer overlays
- Context menu (Rotate, Duplicate, Delete, Z-order)
- Inspector & Settings panels (snap toggle, tutorial toggle, reset layout)
- Toolbar with Place/Rotate/Eraser tools
- Save/Load JSON export/import + autosave
- On-first-run tutorial with localStorage toggle
- Fully packaged as `Planitaria_1.0.zip` with source, metadata, manifest, and examples

## 2. Directory Structure
```
Planitaria/
├─ public/
│  ├─ index.html
│  └─ styles.css
├─ src/
│  ├─ main.js
│  ├─ PlannerApp.jsx
│  ├─ components/
│  │  ├─ Canvas.jsx
│  │  ├─ StencilPanel.jsx
│  │  ├─ LayerManager.jsx
│  │  ├─ OverlaySystem.jsx
│  │  ├─ InspectorPanel.jsx
│  │  ├─ SettingsPanel.jsx
│  │  ├─ Toolbar.jsx
│  │  ├─ ContextMenu.jsx
│  │  ├─ SaveLoadControls.jsx
│  │  ├─ Tutorial.jsx
│  │  └─ GamepackLoader.jsx
│  └─ gamepacks/
│     └─ satisfactory/
│        └─ stencils.json
├─ examples/
│  └─ iron-bar-line.json
├─ readme_Chloe.md   ← this file
└─ planitaria.meta.json
```

## 3. Feature Checklist
- [x] Canvas grid & snap
- [x] Stencil panel & dynamic loader
- [x] Layer manager + overlays
- [x] Context menu actions
- [x] Inspector & Settings
- [x] Toolbar tools
- [x] Save/Load + autosave
- [x] Tutorial toggle & flow
- [x] Example layout loader
- [x] Packaging & metadata

## 4. File Manifest (SHA-256)
| Path                                    | Hash                                     |
|-----------------------------------------|------------------------------------------|
| src/PlannerApp.jsx                      | 226381c654cc7fae74f664fc9e5a8458b9f6d42a |
| src/components/Canvas.jsx               | a55cc1b0ee6c95913ce62e7d8afdaee63ba45879 |
| src/components/StencilPanel.jsx         | *generate*                               |
| src/components/LayerManager.jsx         | e20df062ee89ab959f0cf30f556f39842f450522 |
| src/components/OverlaySystem.jsx        | 0e0ded3f6ad56daa26085ccbe363ccb75ddfef45 |
| src/components/InspectorPanel.jsx       | a0e2def4bf9044b44d244bc354f59bc7adbe2481 |
| src/components/SettingsPanel.jsx        | 00890f3867cade2f89a904ded101c0b21eeb3c576 |
| src/components/Toolbar.jsx              | *generate*                               |
| src/components/ContextMenu.jsx          | *generate*                               |
| src/components/SaveLoadControls.jsx     | 19af633c344939511ab2d97b053b603e4b0567d |
| src/components/Tutorial.jsx             | ca8915323b6b9f670965d139889a5aef98ff126b |
| src/components/GamepackLoader.jsx       | 02c519805d5c041c9e756111b97ef9e5827c244c |
| public/index.html                       | 3eb722bedb2ae9b3f144d91ed3de7c2a00ceb893 |
| public/styles.css                       | 865b652f1736e4fa4003117138e4913c9782ea01 |
| src/main.js                             | 49a172093a3ca7388e5444d4bde98586279ad496 |
| src/gamepacks/satisfactory/stencils.json | 7cad1213df08f7e62f2b7bb5baf4c6a5442eabf0 |
| examples/iron-bar-line.json             | *generate*                               |
| planitaria.meta.json                    | *generate*                               |

> **Note:** Replace `*generate*` with actual hashes after creating those files.

## 5. Build & Run
```bash
cd Planitaria
npm install
npm run dev      # for development
npm run build    # creates dist/
zip -r Planitaria_1.0.zip dist/ readme_Chloe.md planitaria.meta.json
```

## 6. Deployment
- Commit `Planitaria_1.0.zip` under Releases or attach to your GitHub Pages workflow
- Tag as `v1.0` and publish

## 7. Roadmap & Extensions
- Add new gamepacks under `gamepacks/`
- Extend `StencilPanel.jsx` for custom stencils
- Plan for 1.1 (production minification, offline PWA) and 1.2 (AI assistant)
