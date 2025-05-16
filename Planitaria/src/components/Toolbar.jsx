import React from 'react';
import SaveLoadControls from '@/components/SaveLoadControls';

export default function Toolbar() {
  return (
    <div className="toolbar-container p-2 flex items-center space-x-4 bg-gray-800">
      {/* Existing toolbar items go here */}
      <SaveLoadControls />
    </div>
  );
}
