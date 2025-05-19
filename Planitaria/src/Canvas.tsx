
import React, { useEffect, useState } from "react";

const gridSize = 40;

function simulate(items, connections) {
  const state = {};
  const incoming = {};

  items.forEach(item => {
    state[item.id] = { satisfied: item.role !== "input" };
    incoming[item.id] = [];
  });

  connections.forEach(link => {
    if (state[link.to]) {
      incoming[link.to].push(link.from);
    }
  });

  let updated = true;
  while (updated) {
    updated = false;
    for (let item of items) {
      if (item.role === "input") {
        const sources = incoming[item.id] || [];
        const satisfied = sources.some(id => state[id]?.satisfied);
        if (satisfied && !state[item.id].satisfied) {
          state[item.id].satisfied = true;
          updated = true;
        }
      }
    }
  }

  return state;
}

export function Canvas({ items, setItems, setSelectedItem }) {
  const [connections, setConnections] = useState([]);
  const [simState, setSimState] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showOverlays, setShowOverlays] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("planit");
    if (saved) {
      try {
        const decoded = atob(saved);
        const payload = JSON.parse(decoded);
        setItems(payload.items || []);
        setConnections(payload.connections || []);
        if (payload.simState) setSimState(payload.simState);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const result = simulate(items, connections);
    setSimState(result);
  }, [items, connections]);

  function handleClick(item) {
    setSelectedItem(item);
  }

  function getCenter(item) {
    return {
      x: item.x + 40 / 2,
      y: item.y + 20
    };
  }

  function getTooltip(item) {
    const state = simState[item.id];
    return \`\${item.type}\nRole: \${item.role}\nDirection: \${item.direction}\nSatisfied: \${state?.satisfied ? "Yes" : "No"}\`;
  }

  function hasError(item) {
    return item.role === "input" && !(simState[item.id]?.satisfied);
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
          backgroundSize: \`\${gridSize}px \${gridSize}px\`,
          backgroundImage: "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)"
        }}
      >
        {items.map((item) => {
          const satisfied = simState[item.id]?.satisfied;
          return (
            <div key={item.id}
              title={showOverlays ? getTooltip(item) : ""}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                background: satisfied === true ? "#9f9" : satisfied === false ? "#f99" : "lightblue",
                padding: "6px 10px",
                borderRadius: 4,
                fontWeight: "bold",
                color: "#000",
                transform: \`rotate(\${item.rotation}deg)\`,
                cursor: "pointer",
                boxShadow: hoveredItem === item.id && showOverlays ? "0 0 6px yellow" : "none"
              }}>
              {item.type}
              {hasError(item) && showOverlays && (
                <span style={{
                  marginLeft: 5,
                  color: "red",
                  fontWeight: "bold"
                }}>⚠️</span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        marginLeft: 200,
        marginRight: 200,
        padding: 10,
        background: "#222",
        height: "5vh",
        color: "#fff"
      }}>
        <label style={{ marginRight: 10 }}>
          <input type="checkbox" checked={showOverlays} onChange={() => setShowOverlays(!showOverlays)} />
          Show Overlays
        </label>
      </div>
    </>
  );
}
