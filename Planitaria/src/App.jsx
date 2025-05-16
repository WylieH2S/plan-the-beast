import React from 'react';
import Toolbar from '@/components/Toolbar';
import UIControls from '@/components/UIControls';
import StencilTray from '@/components/StencilTray';
import CanvasArea from '@/components/CanvasArea';
import OverlayLayer from '@/components/OverlayLayer';
import SafeZoneOverlay from '@/components/SafeZoneOverlay';
import StatisticsPanel from '@/components/StatisticsPanel';
import TutorialPrompt from '@/components/TutorialPrompt';

export default function App() {
  return (
    <div className="app-container relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Header: toolbar and controls */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-gray-800 p-2 flex items-center space-x-4">
        <Toolbar />
        <UIControls />
      </header>

      {/* Sidebar: stencil tray */}
      <aside className="absolute top-16 left-2 z-20">
        <StencilTray />
      </aside>

      {/* Main canvas and overlays */}
      <main className="relative pt-16">
        <CanvasArea />
        <OverlayLayer />
        <SafeZoneOverlay />
        <StatisticsPanel />
      </main>

      {/* Tutorial overlay */}
      <TutorialPrompt />
    </div>
  );
}
