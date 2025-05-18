
import React, { useEffect, useState } from "react";

const gridSize = 40;

export function Canvas({ items, setItems, setSelectedItem }) {
  useEffect(() => {
    const saved = localStorage.getItem("planit");
    if (saved) {
      try {
        const decoded = atob(saved);
        const payload = JSON.parse(decoded);
        setItems(payload.items || []);
      } catch {}
    }
  }, []);

  function snapToGrid(x, y) {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }

  function onDrop(event) {
    const type = event.dataTransfer.getData("text/plain");
    const rawX = event.clientX - 200;
    const rawY = event.clientY;
    const { x, y } = snapToGrid(rawX, rawY);
    const newItem = {
      id: Date.now(),
      type,
      x,
      y,
      rotation: 0,
      role: inferRole(type),
      direction: inferDirection(0)
    };
    setItems([...items, newItem]);
  }

  function rotateItem(id) {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              rotation: (item.rotation + 90) % 360,
              direction: inferDirection((item.rotation + 90) % 360)
            }
          : item
      )
    );
  }

  function savePlanit() {
    const payload = {
      planitae: "Satisfactory",
      created: new Date().toISOString(),
      items: items
    };
    const encoded = btoa(JSON.stringify(payload));
    localStorage.setItem("planit", encoded);
    const blob = new Blob([encoded], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "SimHookPlanit.planit.json";
    a.click();
  }

  function loadPlanit(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const decoded = atob(event.target.result);
      const data = JSON.parse(decoded);
      setItems(data.items || []);
    };
    reader.readAsText(file);
  }

  function inferRole(type) {
    if (type === "Splitter" || type === "Constructor") return "output";
    if (type === "Merger" || type === "Smelter") return "input";
    return "neutral";
  }

  function inferDirection(rotation) {
    switch (rotation) {
      case 0: return "up";
      case 90: return "right";
      case 180: return "down";
      case 270: return "left";
      default: return "unknown";
    }
  }

  return (
    <>
      <div
        style={{
          flex: 1,
          marginLeft: 200,
          marginRight: 200,
          height: "85vh",
          position: "relative",
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage: "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)"
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {items.map((item) => (
          <div key={item.id}
            onClick={() => setSelectedItem(item)}
            onContextMenu={(e) => {
              e.preventDefault();
              rotateItem(item.id);
            }}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              background: "lightblue",
              padding: "6px 10px",
              borderRadius: 4,
              fontWeight: "bold",
              color: "#000",
              transform: `rotate(${item.rotation}deg)`,
              cursor: "pointer",
              borderLeft: item.role === "input" ? "4px solid green" : item.role === "output" ? "4px solid red" : "none"
            }}>
            {item.type}
          </div>
        ))}
      </div>
      <div style={{
        marginLeft: 200,
        marginRight: 200,
        padding: 10,
        background: "#222",
        height: "5vh",
        color: "#fff"
      }}>
        <button onClick={savePlanit}>💾 Save</button>
        <input type="file" onChange={loadPlanit} />
      </div>
    </>
  );
}
