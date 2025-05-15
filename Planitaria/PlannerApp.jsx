import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { initializeGrid } from "./gridEngine";
import { loadStencils } from "./stencilLoader";
import { initSaveManager } from "./saveManager";
import { initOverlaySystem } from "./overlayManager";
import { launchTutorial } from "./tutorialSystem";
import { setupUIState } from "./uiStateManager";

function PlannerApp() {
  useEffect(() => {
    initializeGrid();
    loadStencils("Satisfactory");
    initOverlaySystem();
    initSaveManager();
    setupUIState();
    launchTutorial();
  }, []);

  return (
    <div id="planitaria-app">
      <canvas id="grid-canvas"></canvas>
      <div id="ui-panels">
        {/* Panels injected by uiStateManager */}
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<PlannerApp />);

export default PlannerApp;