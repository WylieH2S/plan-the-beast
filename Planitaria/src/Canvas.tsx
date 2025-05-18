
import React, { useEffect, useState } from "react";

const gridSize = 40;

export function Canvas({ items, setItems, setSelectedItem }) {
  const [connections, setConnections] = useState([]);
  const [linkStart, setLinkStart] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("planit");
    if (saved) {
      try {
        const decoded = atob(saved);
        const payload = JSON.parse(decoded);
        setItems(payload.items || []);
        setConnections(payload.connections || []);
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
      direction: "right",
      role: type === "Splitter" || type === "Constructor" ? "output" : "input"
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
              direction: getDirection((item.rotation + 90) % 360)
            }
          : item
      )
    );
  }

  function getDirection(rotation) {
    switch (rotation) {
      case 0: return "up";
      case 90: return "right";
      case 180: return "down";
      case 270: return "left";
      default: return "unknown";
    }
  }

  function savePlanit() {
    const payload = {
      planitae: "Satisfactory",
      created: new Date().toISOString(),
      items,
      connections
    };
    const encoded = btoa(JSON.stringify(payload));
    localStorage.setItem("planit", encoded);
    const blob = new Blob([encoded], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "PlanitWithLinks.planit.json";
    a.click();
  }

  function loadPlanit(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const decoded = atob(event.target.result);
      const data = JSON.parse(decoded);
      setItems(data.items || []);
      setConnections(data.connections || []);
    };
    reader.readAsText(file);
  }

  function handleClick(item) {
    if (linkStart === null) {
      setLinkStart(item.id);
    } else {
      const exists = connections.some(c => c.from === linkStart && c.to === item.id);
      if (!exists && linkStart !== item.id) {
        setConnections([...connections, { from: linkStart, to: item.id }]);
      }
      setLinkStart(null);
    }
    setSelectedItem(item);
  }

  function getCenter(item) {
    return {
      x: item.x + 40 / 2,
      y: item.y + 20
    };
  }

  return (
    <>
      <svg width="100%" height="85vh" style={{ position: "absolute", pointerEvents: "none" }}>
        {connections.map((conn, index) => {
          const from = items.find(i => i.id === conn.from);
          const to = items.find(i => i.id === conn.to);
          if (!from || !to) return null;
          const p1 = getCenter(from);
          const p2 = getCenter(to);
          return (
            <line key={index} x1={p1.x + 200} y1={p1.y} x2={p2.x + 200} y2={p2.y}
              stroke="cyan" strokeWidth="2" />
          );
        })}
      </svg>
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
            onClick={() => handleClick(item)}
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
              cursor: "pointer"
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
