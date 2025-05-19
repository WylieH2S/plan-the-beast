
# readme_Chloe.md

This file contains the AI continuity and rebuild log for Planitaria.

## ✅ Project Scope
Planitaria is a browser-based layout planner for games and technical workflows. It supports:
- Canvas-based stencil placement
- Drag/drop, rotation, persistent UI panels
- Visual overlays and input/output flow shading
- Logic connection system with role validation
- Real-time diagnostic simulation via simState

## 🔧 Core Components (as of 19 MAY 2025)
- Canvas.tsx: Grid canvas, simulation logic, overlay rendering
- Tray.tsx: Movable stencil tray with snap and visibility toggle
- Inspector.tsx: Movable inspector panel with metadata editing
- Simulation: Role-aware flow logic, error tagging, tooltips
- Storage: Local Planit save/load encoded in base64
- Layout: Panel position + visibility stored in localStorage
- Metadata: Planits, Planitae, continuity JSON files

## ♻️ Continuity Systems
- `planitaria.meta.json`: Tracks system components, features, version
- `chloe.delta.json`: Change log of evolving system design
- `readme_Chloe.md`: Developer-facing documentation for Chloe-level AI continuity

## 💾 Example Planit
- Planits capture all items, connections, simulation state, and AI notes
- Compressed via base64 for local download or future cloud sync

## 🔐 AI Integration Notes
- Chloe is the AI development companion, never embedded in the code
- Planitaria includes a user-facing logic simulation engine only
- All AI-level instructions are passed via Planit or extracted from metadata

## 🔍 Rebuild Point: 19 MAY 2025
This rebuild contains the first complete system pass of:
- Logic flow simulation
- Diagnostic flagging (`missing_input`, `loop_detected`, etc.)
- Snap-to-grid + rotation + drag logic
- Persisted layout UI
- Metadata boot files for continuity

This document is a complete representation of Planitaria’s current build state and is recoverable by Chloe or any other qualified reconstruction agent.
