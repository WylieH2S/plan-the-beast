import React from 'react';
import { useStore } from '@/utils/store';

const UIControls = () => {
  const { panelSettings, togglePanel, resetLayout, setLayoutPreset } = useStore();
  const presets = ['default', 'compact', 'extended'];

  return (
    <div className="ui-controls p-2 bg-gray-800 text-white flex items-center space-x-3">
      {['Statistics', 'OverlaySettings'].map((panel) => (
        <button
          key={panel}
          onClick={() => togglePanel(panel)}
          className={`p-1 rounded border ${panelSettings.visiblePanels.includes(panel) ? 'bg-gray-700' : ''}`}
        >
          {panel}
        </button>
      ))}
      <select
        value={panelSettings.preset}
        onChange={(e) => setLayoutPreset(e.target.value)}
        className="p-1 bg-gray-700 rounded"
      >
        {presets.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button onClick={resetLayout} className="p-1 rounded border">
        Reset Layout
      </button>
    </div>
  );
};

export default UIControls;
