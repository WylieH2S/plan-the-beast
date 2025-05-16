
import React from "react";
import Toolbar from "./components/Toolbar";
import StencilTray from "./components/StencilTray";
import CanvasArea from "./components/CanvasArea";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-neutral-100">
      <Toolbar />
      <div className="flex flex-1">
        <StencilTray />
        <CanvasArea />
      </div>
    </div>
  );
}
