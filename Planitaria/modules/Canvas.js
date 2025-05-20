import React, { useRef, useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Tray } from "./Tray.js";
import { Inspector } from "./Inspector.js";
import { exportPlanit, importPlanit } from "./SaveLoad.js";
import { simulateStatuses } from "./LogicSim.js";
import { calculateConnections } from "../ConnectionVisualizer.js";

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
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showConnections, setShowConnections] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    drawGrid(ctx, canvas.width, canvas.height);

    if (showConnections) {
      const connections = calculateConnections(items);
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
        item.status === "starved" ? "#ff0" :
        item.status === "clogged" ? "#f44" :
        item.id === selected?.id ? "#6f6" : "#888";

      ctx.fillRect(item.x - 20, item.y - 20, 40, 40);
      ctx.fillStyle = "#fff";
      ctx.fillText(item.type, item.x - 18, item.y + 5);
      if (item.note) ctx.fillText(item.note, item.x - 18, item.y + 18);
      if (item.throughput !== undefined) ctx.fillText(item.throughput + "%", item.x - 18, item.y + 32);
    }
  }, [items, selected, showConnections]);

  useEffect(() => {
    const interval = setInterval(() => {
      simulateStatuses(items, setItems);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  function handleClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clicked = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
    setSelected(clicked || null);
  }

  function addItem(type, role) {
    const id = Date.now().toString();
    setItems([...items, { id, type, role, x: 200, y: 200, rotation: 0, status: "ok", throughput: 0 }]);
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
    React.createElement("div", {
      style: {
        position: "absolute", top: 10, right: 10, zIndex: 20
      }
    }, [
      React.createElement("button", {
        key: "save",
        onClick: () => exportPlanit(items),
        style: {
          padding: "6px", marginRight: "6px", background: "#333", color: "#fff"
        }
      }, "Save"),
      React.createElement("button", {
        key: "load",
        onClick: () => importPlanit(setItems),
        style: {
          padding: "6px", marginRight: "6px", background: "#333", color: "#fff"
        }
      }, "Load"),
      React.createElement("button", {
        key: "toggle",
        onClick: () => setShowConnections(!showConnections),
        style: {
          padding: "6px", background: "#444", color: "#ccc"
        }
      }, showConnections ? "Hide Connections" : "Show Connections")
    ]),
    React.createElement(Tray, { onAdd: addItem }),
    React.createElement(Inspector, { selectedItem: selected, updateItem })
  );
}

export { Canvas };
