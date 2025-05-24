import React, { useRef, useState, useEffect } from "https://esm.sh/react@18.2.0";
// Add any additional necessary imports here (Tray, Inspector, etc.)

export function Canvas() {
  const canvasRef = useRef(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [settings, setSettings] = useState({ zoom: 1, snap: { enabled: true, size: 40 }, overlays: { showStatus: true, showLabels: true, connectionTypes: {} } });
  const [multiSelectIds, setMultiSelectIds] = useState([]);
  const [groupSelectBox, setGroupSelectBox] = useState(null);

  const snapSize = settings.snap.size;
  const snapEnabled = settings.snap.enabled;

  function drawGrid(ctx, width, height, settings) {
    ctx.clearRect(0, 0, width, height);
    if (settings.snap.enabled) {
      ctx.fillStyle = "#222";
      for (let x = 0; x < width; x += settings.snap.size) {
        for (let y = 0; y < height; y += settings.snap.size) {
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    }
    ctx.strokeStyle = "#333";
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.scale(settings.zoom, settings.zoom);
    drawGrid(ctx, canvas.width / settings.zoom, canvas.height / settings.zoom, settings);

    ctx.restore();
  }, [items, selected, settings, multiSelectIds, groupSelectBox]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerHandler = e => {
      const { x, y } = e.detail;
      const cx = canvas.width / 2 / settings.zoom;
      const cy = canvas.height / 2 / settings.zoom;
      const dx = x - cx;
      const dy = y - cy;
      setItems(items.map(it => ({ ...it, x: it.x - dx, y: it.y - dy })));
    };

    window.addEventListener("centerCanvas", centerHandler);
    return () => window.removeEventListener("centerCanvas", centerHandler);
  }, [items, settings.zoom]);

  function handleClick(e) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / settings.zoom;
    const y = (e.clientY - rect.top) / settings.zoom;
    const clicked = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
    setSelected(clicked || null);
  }

  return React.createElement(React.Fragment, null,
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        onClick={handleClick}
        style={{ background: "#111", display: "block", margin: "auto" }}
      />
  );
}
