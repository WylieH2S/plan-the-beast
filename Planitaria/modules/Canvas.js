import React, { useRef, useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Tray } from "./Tray.js";
import { Inspector } from "./Inspector.js";
import { exportPlanit, importPlanit } from "./SaveLoad.js";
import { simulateStatuses } from "./LogicSim.js";
import { calculateConnections } from "../ConnectionVisualizer.js";
import { defaultSettings } from "../Settings.js";
import { Minimap } from "../Minimap.js";
import { Toolbar } from "../Toolbar.js";
import { SummaryPanel } from "../SummaryPanel.js";
import { addConnection, getConnections } from "../ConnectionVisualizer.js";
import { loadGamepack } from "../Gamepack.js";
import { useHistory } from "../useHistory.js";
import { loadGamepack } from "../Gamepack.js";

const gridSize = 40;

function drawGrid(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#333";
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function Canvas() {
  const canvasRef = useRef(null);
  const [items, setItems, undoItems, redoItems] = useHistory([]);
  const [connectionTarget, setConnectionTarget] = useState(null);
  const snap = 40;
  const [history, setHistory] = useState([[]]);
  const [gamepack, setGamepack] = useState(loadGamepack("satisfactory"));
  const [selected, setSelected] = useState(null);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(settings.zoom, settings.zoom);

    drawGrid(ctx, canvas.width / settings.zoom, canvas.height / settings.zoom);

    if (settings.overlays.showConnections) {
      const connections = getConnections();
      ctx.strokeStyle = "#3cf";
      ctx.lineWidth = 2;
      for (const [a, b] of connections) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.lineWidth = 1;
    }

    for (const item of items) {
      ctx.fillStyle =
        settings.overlays.showStatus && item.status === "starved" ? "#ff0" :
        settings.overlays.showStatus && item.status === "clogged" ? "#f44" :
        item.id === selected?.id ? "#6f6" : "#888";

      ctx.fillRect(item.x - 20, item.y - 20, 40, 40);

      if (settings.overlays.showLabels) {
        ctx.fillStyle = "#fff";
        ctx.fillText(item.type, item.x - 18, item.y + 5);
        if (item.note) ctx.fillText(item.note, item.x - 18, item.y + 18);
        if (item.throughput !== undefined) ctx.fillText(item.throughput + "%", item.x - 18, item.y + 32);
      }

      // Rotation arrow
      ctx.beginPath();
      ctx.moveTo(item.x, item.y);
      const angle = (item.rotation || 0) * Math.PI / 180;
      const len = 15;
      ctx.lineTo(item.x + len * Math.cos(angle), item.y + len * Math.sin(angle));
      ctx.strokeStyle = "#0af";
      ctx.stroke();
    }

    ctx.restore();
  }, [items, selected, settings]);

  useEffect(() => {
    const interval = setInterval(() => {
      simulateStatuses(items, setItems);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  function handleClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / settings.zoom;
    const y = (e.clientY - rect.top) / settings.zoom;
    const clicked = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
    if (connectionTarget && clicked) {
      addConnection(connectionTarget, clicked);
      setConnectionTarget(null);
    } else {
      setSelected(clicked || null);
      setConnectionTarget(clicked || null);
    }
  }

  function addItem(type, role) {
    const id = Date.now().toString();
    const snapped = (v) => Math.round(v / snap) * snap;
    setItems([...items, { id, type, role, x: snapped(200), y: snapped(200), rotation: 0, status: "ok", throughput: 0 }]);
  }

  function updateItem(newProps) {
    setItems(items.map(it => it.id === selected.id ? { ...it, ...newProps } : it));
  }

  return React.createElement(React.Fragment, null,
    React.createElement("canvas", {
      ref: canvasRef,
      width: 1200,
      height: 800,
      onClick: handleClick,
      style: { display: "block", background: "#111", margin: "auto" }
    }),
    React.createElement(Toolbar, {
      onGamepackChange: name => setGamepack(loadGamepack(name)),
      onZoomIn: () => setSettings({ ...settings, zoom: settings.zoom + 0.1 }),
      onZoomOut: () => setSettings({ ...settings, zoom: Math.max(0.2, settings.zoom - 0.1) }),
      onReset: () => setSettings(defaultSettings),
      settings,
      setSettings
    }),
    React.createElement("div", {
      style: { position: "absolute", top: 10, right: 10, zIndex: 20 }
    }, [
      React.createElement("button", {
        key: "save",
        onClick: () => exportPlanit(items, history),
        style: { padding: "6px", marginRight: "6px", background: "#333", color: "#fff" }
      }, "Save"),
      React.createElement("button", {
        key: "undo",
        onClick: () => undoItems(),
        style: { padding: "6px", marginRight: "6px", background: "#333", color: "#fff" }
      }, "Undo"),
      React.createElement("button", {
        key: "redo",
        onClick: () => redoItems(),
        style: { padding: "6px", marginRight: "6px", background: "#333", color: "#fff" }
      }, "Redo"),
      React.createElement("button", {
        key: "load",

        onClick: () => importPlanit((newItems, newHistory) => { setItems(newItems); setHistory(newHistory); }),
        style: { padding: "6px", background: "#333", color: "#fff" }
      }, "Load")
    ]),
    React.createElement(Tray, { onAdd: addItem, gamepack }),
    React.createElement(Inspector, { selectedItem: selected, updateItem }),
    React.createElement(Minimap, { items }),
    React.createElement(SummaryPanel, { items })
  );
}

export { Canvas };
