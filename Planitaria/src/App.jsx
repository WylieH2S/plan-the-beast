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
    <div className="app-container grid grid-rows-[auto_1fr] grid-cols-[200px_1fr_250px] h-screen bg-gray-900">
      {/* Header: Toolbar + Controls */}
      <header className="row-start-1 col-span-3 flex items-center bg-gray-800 p-2 space-x-4 shadow">
        <Toolbar />
        <UIControls />
      </header>

      {/* Sidebar: Stencil Tray */}
      <aside className="row-start-2 col-start-1 bg-gray-800 p-2 overflow-auto">
        <StencilTray />
      </aside>

      {/* Main Canvas Area with Overlays */}
      <main className="row-start-2 col-start-2 relative overflow-hidden">
        <CanvasArea />
        <OverlayLayer />
        <SafeZoneOverlay />
        <TutorialPrompt />
      </main>

      {/* Right Panel: Statistics */}
      <aside className="row-start-2 col-start-3 bg-gray-800 p-2 overflow-auto">
        <StatisticsPanel />
      </aside>
    </div>
  );
}
