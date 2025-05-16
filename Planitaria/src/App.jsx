import React from 'react';
import Toolbar from '@/components/Toolbar';
import StencilTray from '@/components/StencilTray';
import UIControls from '@/components/UIControls';
import CanvasArea from '@/components/CanvasArea';
import OverlayLayer from '@/components/OverlayLayer';
import SafeZoneOverlay from '@/components/SafeZoneOverlay';
import StatisticsPanel from '@/components/StatisticsPanel';
import TutorialPrompt from '@/components/TutorialPrompt';

export default function App() {
  return (
    <div className="app-container relative bg-gray-900 min-h-screen">
      {/* Top toolbar with icons */}
      <Toolbar />
      {/* Stencil tray for selecting Planitae elements */}
      <StencilTray />
      {/* UI controls: Save/Load, layout presets, reset, panel toggles */}
      <UIControls />
      {/* Main canvas area */}
      <CanvasArea />
      {/* Overlays and panels */}
      <OverlayLayer />
      <SafeZoneOverlay />
      <StatisticsPanel />
      {/* Tutorial prompt */}
      <TutorialPrompt />
    </div>
  );
}

