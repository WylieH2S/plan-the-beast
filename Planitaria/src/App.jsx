import React from 'react';
import Toolbar from '@/components/Toolbar';
import UIControls from '@/components/UIControls';
import CanvasArea from '@/components/CanvasArea';
import OverlayLayer from '@/components/OverlayLayer';
import SafeZoneOverlay from '@/components/SafeZoneOverlay';
import StatisticsPanel from '@/components/StatisticsPanel';
import TutorialPrompt from '@/components/TutorialPrompt';

export default function App() {
  return (
    <div className="app-container relative bg-gray-900 min-h-screen">
      <Toolbar />
      <UIControls />
      <CanvasArea />
      <OverlayLayer />
      <SafeZoneOverlay />
      <StatisticsPanel />
      <TutorialPrompt />
    </div>
  );
}
