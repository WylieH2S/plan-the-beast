import React from 'react';
import { useStore } from '@/utils/store';

const LayerControls = () => {
  const { layers, activeLayer, setActiveLayer } = useStore();
  
  return (
    <div className="flex space-x-2">
      {layers.map((layer) => (
        <button
          key={layer}
          onClick={() => setActiveLayer(layer)}
          className={`p-2 rounded border ${activeLayer === layer ? 'bg-gray-700' : ''}`}
        >
          Layer {layer}
        </button>
      ))}
    </div>
  );
};

export default LayerControls;
