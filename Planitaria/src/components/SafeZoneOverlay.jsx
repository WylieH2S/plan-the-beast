import React from 'react';
import { useStore } from '@/utils/store';

const SafeZoneOverlay = () => {
  const { panelSettings } = useStore();
  const { safeZone } = panelSettings;
  const style = {
    position: 'absolute',
    top: safeZone.top + 'px',
    right: safeZone.right + 'px',
    bottom: safeZone.bottom + 'px',
    left: safeZone.left + 'px',
    border: '2px dashed rgba(255,255,255,0.5)',
    pointerEvents: 'none',
    boxSizing: 'border-box',
  };
  return <div style={style}></div>;
};

export default SafeZoneOverlay;
