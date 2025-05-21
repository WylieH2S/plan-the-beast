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

import { getCurrentStep, nextTutorialStep, onTutorialChange } from "./Tutorial.js";

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
    const centerHandler = e => {
      const { x, y } = e.detail;
      const cx = canvasRef.current.width / 2 / settings.zoom;
      const cy = canvasRef.current.height / 2 / settings.zoom;
      const dx = x - cx;
      const dy = y - cy;
      setItems(items.map(it => ({ ...it, x: it.x - dx, y: it.y - dy })));
    };
    window.addEventListener("centerCanvas", centerHandler);
    const ghostHandler = e => setGhost(e.detail);
    window.addEventListener("setGhost", ghostHandler);
    const keyHandler = e => {
      if (!selected) return;
      const offset = 5;
      if (e.key === "ArrowUp") updateItem({ y: selected.y - offset });
      if (e.key === "ArrowDown") updateItem({ y: selected.y + offset });
      if (e.key === "ArrowLeft") updateItem({ x: selected.x - offset });
      if (e.key === "ArrowRight") updateItem({ x: selected.x + offset });
    };
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keydown", e => {
      if (e.ctrlKey && e.key === "z") undoItems();
      if (e.ctrlKey && (e.key === "y" || e.key === "Z")) redoItems();
    });
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") setGhost(null);
    });
    window.addEventListener("contextmenu", e => {
      if (ghost) {
        e.preventDefault();
        setGhost(null);
      }
    });

    onTutorialChange(setTutorialStep);
    const tutorialStartHandler = () => {
      import("./Tutorial.js").then(mod => mod.startTutorial());
    };
    window.addEventListener("startTutorial", tutorialStartHandler);
    const shotHandler = () => {
      const canvas = canvasRef.current;
      canvas.toBlob(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "planitaria_screenshot.png";
        a.click();
      });
    };
    window.addEventListener("exportScreenshot", shotHandler);

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

    window.addEventListener("exportBlueprint", exportHandler);
    window.addEventListener("importBlueprint", importHandler);
    window.addEventListener("fitCanvas", fitHandler);
    return () => {
      window.removeEventListener("centerCanvas", centerHandler);
      window.removeEventListener("setGhost", ghostHandler);
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("startTutorial", tutorialStartHandler);
      window.removeEventListener("exportScreenshot", shotHandler);
      window.removeEventListener("exportBlueprint", exportHandler);
      window.removeEventListener("importBlueprint", importHandler);
      window.removeEventListener("fitCanvas", fitHandler);
    };
  }, [items, multiSelectIds]);

  useEffect(() => {
    const centerHandler = e => {
      const { x, y } = e.detail;
      const cx = canvasRef.current.width / 2 / settings.zoom;
      const cy = canvasRef.current.height / 2 / settings.zoom;
      const dx = x - cx;
      const dy = y - cy;
      setItems(items.map(it => ({ ...it, x: it.x - dx, y: it.y - dy })));
    };
    window.addEventListener("centerCanvas", centerHandler);
    const ghostHandler = e => setGhost(e.detail);
    window.addEventListener("setGhost", ghostHandler);
    const keyHandler = e => {
      if (!selected) return;
      const offset = 5;
      if (e.key === "ArrowUp") updateItem({ y: selected.y - offset });
      if (e.key === "ArrowDown") updateItem({ y: selected.y + offset });
      if (e.key === "ArrowLeft") updateItem({ x: selected.x - offset });
      if (e.key === "ArrowRight") updateItem({ x: selected.x + offset });
    };
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keydown", e => {
      if (e.ctrlKey && e.key === "z") undoItems();
      if (e.ctrlKey && (e.key === "y" || e.key === "Z")) redoItems();
    });
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") setGhost(null);
    });
    window.addEventListener("contextmenu", e => {
      if (ghost) {
        e.preventDefault();
        setGhost(null);
      }
    });

    onTutorialChange(setTutorialStep);
    const tutorialStartHandler = () => {
      import("./Tutorial.js").then(mod => mod.startTutorial());
    };
    window.addEventListener("startTutorial", tutorialStartHandler);
    const shotHandler = () => {
      const canvas = canvasRef.current;
      canvas.toBlob(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "planitaria_screenshot.png";
        a.click();
      });
    };
    window.addEventListener("exportScreenshot", shotHandler);

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

  useEffect(() => {
    const centerHandler = e => {
      const { x, y } = e.detail;
      const cx = canvasRef.current.width / 2 / settings.zoom;
      const cy = canvasRef.current.height / 2 / settings.zoom;
      const dx = x - cx;
      const dy = y - cy;
      setItems(items.map(it => ({ ...it, x: it.x - dx, y: it.y - dy })));
    };
    window.addEventListener("centerCanvas", centerHandler);
    const ghostHandler = e => setGhost(e.detail);
    window.addEventListener("setGhost", ghostHandler);
    const keyHandler = e => {
      if (!selected) return;
      const offset = 5;
      if (e.key === "ArrowUp") updateItem({ y: selected.y - offset });
      if (e.key === "ArrowDown") updateItem({ y: selected.y + offset });
      if (e.key === "ArrowLeft") updateItem({ x: selected.x - offset });
      if (e.key === "ArrowRight") updateItem({ x: selected.x + offset });
    };
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keydown", e => {
      if (e.ctrlKey && e.key === "z") undoItems();
      if (e.ctrlKey && (e.key === "y" || e.key === "Z")) redoItems();
    });
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") setGhost(null);
    });
    window.addEventListener("contextmenu", e => {
      if (ghost) {
        e.preventDefault();
        setGhost(null);
      }
    });

    onTutorialChange(setTutorialStep);
    const tutorialStartHandler = () => {
      import("./Tutorial.js").then(mod => mod.startTutorial());
    };
    window.addEventListener("startTutorial", tutorialStartHandler);
    const shotHandler = () => {
      const canvas = canvasRef.current;
      canvas.toBlob(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "planitaria_screenshot.png";
        a.click();
      });
    };
    window.addEventListener("exportScreenshot", shotHandler);

    const interval = setInterval(() => {
      simulateStatuses(items, setItems);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  useEffect(() => {
    const centerHandler = e => {
      const { x, y } = e.detail;
      const cx = canvasRef.current.width / 2 / settings.zoom;
      const cy = canvasRef.current.height / 2 / settings.zoom;
      const dx = x - cx;
      const dy = y - cy;
      setItems(items.map(it => ({ ...it, x: it.x - dx, y: it.y - dy })));
    };
    window.addEventListener("centerCanvas", centerHandler);
    const ghostHandler = e => setGhost(e.detail);
    window.addEventListener("setGhost", ghostHandler);
    const keyHandler = e => {
      if (!selected) return;
      const offset = 5;
      if (e.key === "ArrowUp") updateItem({ y: selected.y - offset });
      if (e.key === "ArrowDown") updateItem({ y: selected.y + offset });
      if (e.key === "ArrowLeft") updateItem({ x: selected.x - offset });
      if (e.key === "ArrowRight") updateItem({ x: selected.x + offset });
    };
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keydown", e => {
      if (e.ctrlKey && e.key === "z") undoItems();
      if (e.ctrlKey && (e.key === "y" || e.key === "Z")) redoItems();
    });
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") setGhost(null);
    });
    window.addEventListener("contextmenu", e => {
      if (ghost) {
        e.preventDefault();
        setGhost(null);
      }
    });

    onTutorialChange(setTutorialStep);
    const tutorialStartHandler = () => {
      import("./Tutorial.js").then(mod => mod.startTutorial());
    };
    window.addEventListener("startTutorial", tutorialStartHandler);
    const shotHandler = () => {
      const canvas = canvasRef.current;
      canvas.toBlob(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "planitaria_screenshot.png";
        a.click();
      });
    };
    window.addEventListener("exportScreenshot", shotHandler);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(settings.zoom, settings.zoom);

    drawGrid(ctx, canvas.width / settings.zoom, canvas.height / settings.zoom, settings);

    // Draw origin axes
    ctx.strokeStyle = "#444";
    ctx.beginPath(); ctx.moveTo(0, canvas.height); ctx.lineTo(0, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(canvas.width, 0); ctx.stroke();

    const connections = getConnections();
    for (const conn of connections) {
      const { a, b, type } = conn;
      if (!settings.overlays.connectionTypes[type]) continue;
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

    if (ghost) {
      const snapped = v => snapEnabled ? Math.round(v / snapSize) * snapSize : v;
      const rect = canvas.getBoundingClientRect();
      const x = snapped((window.mouseX || 200) / settings.zoom);
      const y = snapped((window.mouseY || 200) / settings.zoom);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#888";
      ctx.fillRect(x - 20, y - 20, 40, 40);
      ctx.fillStyle = "#fff";
      ctx.fillText(ghost.type, x - 18, y + 5);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }, [items, selected, settings, multiSelectIds, groupSelectBox]);

  function handleClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
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

  function updateItem(newProps) {
    setItems(items.map(it => it.id === selected.id ? { ...it, ...newProps } : it));
  }

  return React.createElement(React.Fragment, null,
    errorMessage && React.createElement("div", {
      style: {
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 20px",
        background: "#900",
        color: "#fff",
        borderRadius: "6px",
        zIndex: 99
      }
    }, errorMessage),
    tutorialStep && React.createElement("div", {
      style: {
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "#222",
        border: "1px solid #555",
        padding: "12px",
        color: "#fff",
        borderRadius: "6px",
        maxWidth: "300px",
        zIndex: 100
      }
    }, [
      React.createElement("div", { style: { marginBottom: "8px" } }, tutorialStep.text),
      React.createElement("button", {
        onClick: () => nextTutorialStep(),
        style: {
          padding: "6px 12px",
          background: "#444",
          border: "none",
          borderRadius: "4px",
          color: "#fff",
          cursor: "pointer"
        }
      }, "Next")
    ]),

    React.createElement("div", {
      style: {
        position: "absolute",
        top: 5,
        left: "50%",
        transform: "translateX(-50%)",
        color: "#999",
        fontSize: "12px",
        zIndex: 99,
        pointerEvents: "none"
      }
    }, "🖱 Ready to Build"),
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
        window.mouseX = e.clientX;
        window.mouseY = e.clientY;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / settings.zoom;
        const y = (e.clientY - rect.top) / settings.zoom;
        const hovered = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
        setHoverItem(hovered || null);
        if (groupSelectBox) {
          setGroupSelectBox({ ...groupSelectBox, x2: x, y2: y });
        }
        if (draggingId) {
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
      style: { display: "block", background: "#111", margin: "auto", boxShadow: tutorialStep?.target === "canvas" ? "0 0 0 4px #0af inset" : undefined }
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
        onClick: () => { import("./Tutorial.js").then(mod => mod.tutorialTrigger("saved")); exportPlanit(items, history); },
        style: { padding: "6px", marginRight: "6px", background: "#333", color: "#fff" }
      }, "Save"),
      React.createElement("button", {
        key: "load",
        onClick: () => importPlanit((newItems, newHistory, conns) => {
          try {
            if (!Array.isArray(newItems)) throw new Error("Invalid Planit file.");
            setItems(newItems);
            setHistory(newHistory);
            loadConnections(conns, newItems);
            setErrorMessage("");
          } catch (err) {
            console.error(err);
            setErrorMessage("❌ Failed to load Planit. File may be corrupted or invalid.");
          }
        }),
        style: { padding: "6px", background: "#333", color: "#fff" }
      }, "Load")
    ]),
    React.createElement("div", {
      style: tutorialStep?.target === "tray" ? { outline: "2px solid #0af", borderRadius: "6px" } : undefined
    },
    React.createElement(Tray, { onAdd: addItem, gamepack })
  ),
    React.createElement("div", {
      style: tutorialStep?.target === "inspector" ? { outline: "2px solid #0af", borderRadius: "6px" } : undefined
    },
    React.createElement(Inspector, { selectedItem: selected, updateItem })
  ),
    React.createElement(Minimap, { items }),
    React.createElement(SummaryPanel, { items }),
    React.createElement("div", {
      style: {
        position: "absolute", bottom: 20, right: 20, zIndex: 20, background: "#222", padding: "12px", color: "#fff", border: "1px solid #555", borderRadius: "6px"
      }
    }, [
      React.createElement("h4", {}, "Planit Manager"),
      React.createElement("button", {
        onClick: () => window.dispatchEvent(new CustomEvent("savePlanit")),
        style: { padding: "6px", marginRight: "6px", background: "#333", color: "#fff" }
      }, "💾 Save"),
      React.createElement("button", {
        onClick: () => window.dispatchEvent(new CustomEvent("loadPlanit")),
        style: { padding: "6px", background: "#333", color: "#fff" }
      }, "📂 Load")
    ]),
    hoverItem && React.createElement("div", {
      style: {
        position: "absolute",
        left: hoverItem.x * settings.zoom + 20,
        top: hoverItem.y * settings.zoom,
        background: "#222",
        padding: "6px",
        color: "#fff",
        fontSize: "12px",
        borderRadius: "6px",
        border: "1px solid #444",
        pointerEvents: "none",
        zIndex: 99
      }
    }, [
      React.createElement("div", {}, `🔎 ${hoverItem.type}`),
      React.createElement("div", {}, `Role: ${hoverItem.role}`),
      hoverItem.power !== undefined && React.createElement("div", {}, `Power: ${hoverItem.power} MW`),
      hoverItem.throughput !== undefined && React.createElement("div", {}, `Flow: ${hoverItem.throughput} / min`)
    ])
  );
}

// PATCHED: Begin ghost, view, and tutorial triggers
