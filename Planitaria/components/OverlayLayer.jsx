import React, { useRef, useEffect } from 'react';
import { useStore } from '@/utils/store';

const OverlayLayer = () => {
  const canvasRef = useRef(null);
  const { overlaySettings } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (overlaySettings.enablePowerDraw) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }, [overlaySettings]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="absolute top-0 left-0 pointer-events-none"
    />
  );
};

export default OverlayLayer;
