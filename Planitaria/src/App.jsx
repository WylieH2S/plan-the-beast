
import React from "react";
import Toolbar from "./components/Toolbar";
import StencilTray from "./components/StencilTray";
import CanvasArea from "./components/CanvasArea";

// Example stencil data (replace with gamepack load later)
const demoStencils = [
  { id: "constructor", name: "Constructor", desc: "Basic building" },
  { id: "smelter", name: "Smelter", desc: "Processes ore" },
  { id: "belt", name: "Conveyor Belt", desc: "Moves items" }
];

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-neutral-100">
      <Toolbar />
      <div className="flex flex-1">
        <StencilTray stencils={demoStencils} />
        <CanvasArea />
      </div>
    </div>
  );
}
