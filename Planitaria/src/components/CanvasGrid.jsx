import React, { useRef, useEffect } from 'react';
import { useStore } from '@/utils/store';

const CanvasGrid = () => {
  const canvasRef = useRef(null);
  const { zoom, pan, stencils, addStencil } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      const gridSize = 50;
      ctx.beginPath();
      ctx.strokeStyle = '#444';
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      ctx.restore();

      stencils.forEach((s) => {
        const { x, y } = s.position;
        ctx.fillStyle = 'rgba(0,255,0,0.5)';
        ctx.fillRect(pan.x + x * zoom, pan.y + y * zoom, 30 * zoom, 30 * zoom);
      });
    };

    draw();
  }, [zoom, pan, stencils]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    const stencil = {
      id: Date.now().toString(),
      type: 'placeholder',
      position: { x, y },
      rotation: 0,
      layer: 1,
    };
    addStencil(stencil);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onClick={handleClick}
      style={{ border: '1px solid #333' }}
    />
  );
};

export default CanvasGrid;
