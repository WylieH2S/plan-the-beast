import React, { useRef, useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Tray } from "./Tray.js";
import { Inspector } from "./Inspector.js";
import { exportPlanit, importPlanit } from "./SaveLoad.js";
import { simulateStatuses } from "./LogicSim.js";
import { getConnections, addConnection, removeConnectionByCoords, loadConnections, cycleConnectionType } from "../ConnectionVisualizer.js";
import { defaultSettings } from "../Settings.js";
import { Minimap } from "../Minimap.js";
import { Toolbar } from "../Toolbar.js";
import { SummaryPanel } from "../SummaryPanel.js";
import { loadGamepack } from "../Gamepack.js";
import { useHistory } from "../useHistory.js";

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
  const [settings, setSettings] = useState(defaultSettings);
  const [connectionTarget, setConnectionTarget] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [groupSelectBox, setGroupSelectBox] = useState(null);
  const [multiSelectIds, setMultiSelectIds] = useState([]);
  const snapEnabled = settings.snap.enabled;
  const [clipboard, setClipboard] = useState([]);
  useEffect(() => {
    const handleKey = (e) => {
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
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [items, multiSelectIds, clipboard]);

  const snapSize = settings.snap.size;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(settings.zoom, settings.zoom);

    drawGrid(ctx, canvas.width / settings.zoom, canvas.height / settings.zoom, settings);

    const connections = getConnections();
    for (const conn of connections) {
      const { a, b, type } = conn;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      if (!settings.overlays.connectionTypes[type]) continue;
      ctx.strokeStyle = type === 'power' ? '#ffa500' : type === 'pipe' ? '#0ff' : '#3cf';
      ctx.setLineDash(type === 'pipe' ? [6, 3] : type === 'power' ? [2, 2] : []);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineWidth = 1;

    for (const item of items) {
      ctx.fillStyle =
        settings.overlays.showStatus && item.status === "starved" ? "#ff0" :
        settings.overlays.showStatus && item.status === "clogged" ? "#f44" :
        item.id === selected?.id ? "#6f6" :
        multiSelectIds.includes(item.id) ? "#0af" : "#888";

      ctx.fillRect(item.x - 20, item.y - 20, 40, 40);

      if (settings.overlays.showLabels) {
        ctx.fillStyle = "#fff";
        ctx.fillText(item.type, item.x - 18, item.y + 5);
        if (item.note) ctx.fillText(item.note, item.x - 18, item.y + 18);
        if (item.throughput !== undefined) ctx.fillText(item.throughput + "%", item.x - 18, item.y + 32);
      }

      ctx.beginPath();
      ctx.moveTo(item.x, item.y);
      const angle = (item.rotation || 0) * Math.PI / 180;
      const len = 15;
      ctx.lineTo(item.x + len * Math.cos(angle), item.y + len * Math.sin(angle));
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

  function addItem({ type, role }) {
    const id = Date.now().toString();
    const snapped = v => snapEnabled ? Math.round(v / snapSize) * snapSize : v;
    setItems([...items, {
      id, type, role,
      x: snapped(200),
      y: snapped(200),
      rotation: 0,
      status: "ok",
      throughput: 0
    }]);
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
      onContextMenu: (e) => {
        e.preventDefault();
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / settings.zoom;
        const y = (e.clientY - rect.top) / settings.zoom;
        cycleConnectionType(x, y);
      },
      onMouseDown: (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / settings.zoom;
        const y = (e.clientY - rect.top) / settings.zoom;
        if (e.shiftKey) {
          setGroupSelectBox({ x1: x, y1: y, x2: x, y2: y });
        } else {
          const target = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
          if (target) {
            setDraggingId(target.id);
            setSelected(target);
          }
        }
      },
      onMouseMove: (e) => {
        if (groupSelectBox) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / settings.zoom;
          const y = (e.clientY - rect.top) / settings.zoom;
          setGroupSelectBox({ ...groupSelectBox, x2: x, y2: y });
        }
        if (draggingId) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / settings.zoom;
          const y = (e.clientY - rect.top) / settings.zoom;
          const snapped = v => snapEnabled ? Math.round(v / snapSize) * snapSize : v;
          setItems(items.map(it =>
            it.id === draggingId || multiSelectIds.includes(it.id)
              ? { ...it, x: snapped(x), y: snapped(y) }
              : it
          ));
        }
      },
      onMouseUp: () => {
        if (groupSelectBox) {
          const { x1, y1, x2, y2 } = groupSelectBox;
          const bounds = [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
          const ids = items.filter(it => it.x >= bounds[0] && it.x <= bounds[2] && it.y >= bounds[1] && it.y <= bounds[3]).map(it => it.id);
          setMultiSelectIds(ids);
          setGroupSelectBox(null);
        }
        setDraggingId(null);
      },
      style: { display: "block", background: "#111", margin: "auto" }
    }),
    React.createElement(Toolbar, {
      onZoomIn: () => setSettings({ ...settings, zoom: settings.zoom + 0.1 }),
      onZoomOut: () => setSettings({ ...settings, zoom: Math.max(0.2, settings.zoom - 0.1) }),
      onReset: () => setSettings(defaultSettings),
      settings,
      setSettings,
      onGamepackChange: name => setGamepack(loadGamepack(name))
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
        key: "load",
        onClick: () => importPlanit((newItems, newHistory, conns) => {
          setItems(newItems);
          setHistory(newHistory);
          loadConnections(conns, newItems);
        }),
        style: { padding: "6px", background: "#333", color: "#fff" }
      }, "Load")
    ]),
    React.createElement(Tray, { onAdd: addItem, gamepack }),
    React.createElement(Inspector, { selectedItem: selected, updateItem }),
    React.createElement(Minimap, { items }),
    React.createElement(SummaryPanel, { items })
  );
}
