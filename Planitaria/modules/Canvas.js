import React, { useRef, useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Tray } from "./Tray.js";
import { Inspector } from "./Inspector.js";
import { exportPlanit, importPlanit } from "./SaveLoad.js";
import { simulateStatuses } from "./LogicSim.js";
import { getConnections, addConnection, removeConnectionByCoords, loadConnections, cycleConnectionType } from "./ConnectionVisualizer.js";
import { defaultSettings } from "./Settings.js";
import { Minimap } from "./Minimap.js";
import { Toolbar } from "./Toolbar.js";
import { SummaryPanel } from "./SummaryPanel.js";
import { loadGamepack } from "./Gamepack.js";
import { useHistory } from "./useHistory.js";
import { getCurrentStep, nextTutorialStep, onTutorialChange } from "./Tutorial.js";

const gridSize = 40;

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

export function Canvas() {
  const canvasRef = useRef(null);
  const [items, setItems, undoItems, redoItems] = useHistory([]);
  const [history, setHistory] = useState([[]]);
  const [gamepack, setGamepack] = useState(loadGamepack("satisfactory"));
  const [selected, setSelected] = useState(null);
  const [settings, setSettings] = useState({ ...defaultSettings, zoom: 0.8 });
  const [connectionTarget, setConnectionTarget] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [groupSelectBox, setGroupSelectBox] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [multiSelectIds, setMultiSelectIds] = useState([]);
  const [clipboard, setClipboard] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [ghost, setGhost] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(null);

  const snapSize = settings.snap.size;
  const snapEnabled = settings.snap.enabled;

  useEffect(() => {
    const keyHandler = e => {
      if (!selected) return;
      const offset = 5;
      if (e.key === "ArrowUp") updateItem({ y: selected.y - offset });
      if (e.key === "ArrowDown") updateItem({ y: selected.y + offset });
      if (e.key === "ArrowLeft") updateItem({ x: selected.x - offset });
      if (e.key === "ArrowRight") updateItem({ x: selected.x + offset });
    };

    const ghostHandler = e => setGhost(e.detail);
    const centerHandler = e => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { x, y } = e.detail;
      const cx = canvas.width / 2 / settings.zoom;
      const cy = canvas.height / 2 / settings.zoom;
      const dx = x - cx;
      const dy = y - cy;
      setItems(items.map(it => ({ ...it, x: it.x - dx, y: it.y - dy })));
    };

    const shotHandler = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.toBlob(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "planitaria_screenshot.png";
        a.click();
      });
    };

    const exportHandler = () => {
      const selectedItems = items.filter(it => multiSelectIds.includes(it.id));
      if (!selectedItems.length) return alert("Select items to export as blueprint.");
      import("./SaveLoad.js").then(mod => mod.exportBlueprint(selectedItems));
    };

    const importHandler = () => {
      import("./SaveLoad.js").then(mod => mod.importBlueprint(newItems => {
        const offset = 40;
        const time = Date.now();
        const clone = newItems.map((it, i) => ({
          ...it,
          id: `${time}-${i}`,
          x: it.x + offset,
          y: it.y + offset
        }));
        setItems([...items, ...clone]);
        setMultiSelectIds(clone.map(i => i.id));
      }));
    };

    const fitHandler = () => {
      const canvas = canvasRef.current;
      if (!canvas || items.length === 0) return;
      const xs = items.map(i => i.x);
      const ys = items.map(i => i.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const pad = 100;
      const width = canvas.width;
      const height = canvas.height;
      const scaleX = width / (maxX - minX + pad);
      const scaleY = height / (maxY - minY + pad);
      const zoom = Math.min(scaleX, scaleY, 2);
      setSettings({ ...settings, zoom });
    };

    const clipboardHandler = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && multiSelectIds.length) {
        setItems(items.filter(it => !multiSelectIds.includes(it.id)));
        setMultiSelectIds([]);
      }
      if (e.ctrlKey && e.key === "c") {
        const copy = items.filter(it => multiSelectIds.includes(it.id)).map(it => ({ ...it }));
        setClipboard(copy);
      }
      if (e.ctrlKey && e.key === "v" && clipboard.length) {
        const time = Date.now();
        const pasted = clipboard.map((it, i) => ({
          ...it,
          id: `${time}-${i}`,
          x: it.x + 40,
          y: it.y + 40
        }));
        setItems([...items, ...pasted]);
        setMultiSelectIds(pasted.map(p => p.id));
      }
    };

    const escHandler = e => { if (e.key === "Escape") setGhost(null); };
    const ctxMenuHandler = e => { if (ghost) { e.preventDefault(); setGhost(null); } };

    onTutorialChange(setTutorialStep);
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keydown", clipboardHandler);
    window.addEventListener("keydown", escHandler);
    window.addEventListener("contextmenu", ctxMenuHandler);
    window.addEventListener("centerCanvas", centerHandler);
    window.addEventListener("setGhost", ghostHandler);
    window.addEventListener("exportScreenshot", shotHandler);
    window.addEventListener("exportBlueprint", exportHandler);
    window.addEventListener("importBlueprint", importHandler);
    window.addEventListener("fitCanvas", fitHandler);
    window.addEventListener("startTutorial", () => import("./Tutorial.js").then(mod => mod.startTutorial()));

    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("keydown", clipboardHandler);
      window.removeEventListener("keydown", escHandler);
      window.removeEventListener("contextmenu", ctxMenuHandler);
      window.removeEventListener("centerCanvas", centerHandler);
      window.removeEventListener("setGhost", ghostHandler);
      window.removeEventListener("exportScreenshot", shotHandler);
      window.removeEventListener("exportBlueprint", exportHandler);
      window.removeEventListener("importBlueprint", importHandler);
      window.removeEventListener("fitCanvas", fitHandler);
    };
  }, [items, selected, clipboard, multiSelectIds, settings.zoom]);

  useEffect(() => {
    const interval = setInterval(() => simulateStatuses(items, setItems), 5000);
    return () => clearInterval(interval);
  }, [items]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.scale(settings.zoom, settings.zoom);
    drawGrid(ctx, canvas.width / settings.zoom, canvas.height / settings.zoom, settings);

    const connections = getConnections();
    for (const conn of connections) {
      const { a, b, type } = conn;
      if (!settings.overlays.connectionTypes?.[type]) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = type === 'power' ? '#ffa500' : type === 'pipe' ? '#0ff' : '#3cf';
      ctx.setLineDash(type === 'pipe' ? [6, 3] : type === 'power' ? [2, 2] : []);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineWidth = 1;

    for (const item of items) {
      ctx.fillStyle =
        item.role === "input" ? "#229"
      : item.role === "output" ? "#292"
      : item.role === "logic" ? "#662"
      : item.role === "power" ? "#733"
      : settings.overlays.showStatus && item.status === "starved" ? "#ff0"
      : settings.overlays.showStatus && item.status === "clogged" ? "#f44"
      : item.id === selected?.id ? "#6f6"
      : multiSelectIds.includes(item.id) ? "#0af"
      : "#888";

      ctx.fillRect(item.x - 20, item.y - 20, 40, 40);

      if (settings.overlays.showLabels) {
        ctx.fillStyle = "#fff";
        ctx.fillText(
          (item.role === "input" ? "⛏ " :
           item.role === "output" ? "📦 " :
           item.role === "logic" ? "⚙ " :
           item.role === "power" ? "🔌 " : "") + item.type,
          item.x - 18, item.y + 5);
        if (item.note) ctx.fillText(item.note, item.x - 18, item.y + 18);
        if (item.throughput !== undefined) ctx.fillText(item.throughput + "%", item.x - 18, item.y + 32);
      }

      ctx.beginPath();
      ctx.moveTo(item.x, item.y);
      const angle = (item.rotation || 0) * Math.PI / 180;
      ctx.lineTo(item.x + 15 * Math.cos(angle), item.y + 15 * Math.sin(angle));
      ctx.strokeStyle = "#0af";
      ctx.stroke();
    }

    if (groupSelectBox) {
      const { x1, y1, x2, y2 } = groupSelectBox;
      ctx.setLineDash([4, 2]);
      ctx.strokeStyle = "#0af";
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      ctx.setLineDash([]);
    }

    ctx.restore();
  }, [items, selected, settings, multiSelectIds, groupSelectBox]);

  function updateItem(newProps) {
    setItems(items.map(it => it.id === selected?.id ? { ...it, ...newProps } : it));
  }

  function handleClick(e) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / settings.zoom;
    const y = (e.clientY - rect.top) / settings.zoom;
    const clicked = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
    if (connectionTarget && clicked) {
      addConnection(connectionTarget, clicked);
      import("./Tutorial.js").then(mod => mod.tutorialTrigger("connected"));
      setConnectionTarget(null);
    } else {
      setSelected(clicked || null);
      if (clicked) import("./Tutorial.js").then(mod => mod.tutorialTrigger("inspected"));
      setConnectionTarget(clicked || null);
    }
  }

  function addItem({ type, role }) {
    const id = Date.now().toString().slice(-6);
    const snapped = v => snapEnabled ? Math.round(v / snapSize) * snapSize : v;
    import("./Tutorial.js").then(mod => mod.tutorialTrigger("placed"));
    setItems([...items, {
      id, type, role,
      x: snapped(200),
      y: snapped(200),
      rotation: 0,
      status: "ok",
      throughput: 0
    }]);
  }

  return React.createElement("canvas", {
    ref: canvasRef,
    width: 1200,
    height: 800,
    onClick: handleClick,
    style: { display: "block", background: "#111", margin: "auto" }
  });
}