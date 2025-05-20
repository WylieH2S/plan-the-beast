
import React, { useRef, useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Tray } from "./Tray.js";
import { Inspector } from "./Inspector.js";
import { exportPlanit, importPlanit } from "./SaveLoad.js";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    drawGrid(ctx, canvas.width, canvas.height);
    for (const item of items) {
      ctx.fillStyle = item.id === selected?.id ? "#6f6" : "#888";
      ctx.fillRect(item.x - 20, item.y - 20, 40, 40);
      ctx.fillStyle = "#fff";
      ctx.fillText(item.type, item.x - 18, item.y + 5);
    }
  }, [items, selected]);

  function handleClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clicked = items.find(it => Math.abs(it.x - x) < 20 && Math.abs(it.y - y) < 20);
    setSelected(clicked || null);
  }

  function addItem(type, role) {
    const id = Date.now().toString();
    setItems([...items, { id, type, role, x: 200, y: 200, rotation: 0 }]);
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
          padding: "6px", marginRight: "10px", background: "#333", color: "#fff"
        }
      }, "Save Planit"),
      React.createElement("button", {
        key: "load",
        onClick: () => importPlanit(setItems),
        style: {
          padding: "6px", background: "#333", color: "#fff"
        }
      }, "Load Planit")
    ]),
    React.createElement(Tray, { onAdd: addItem }),
    React.createElement(Inspector, { selectedItem: selected, updateItem })
  );
}

export { Canvas };
