
import React, { useEffect, useState } from "react";

const gridSize = 40;

function simulate(items, connections) {
  const state = {};
  const incoming = {};

  items.forEach(item => {
    state[item.id] = {
      satisfied: item.role === "output",
      reason: item.role !== "input" ? "non_input" : "missing_input",
      errors: []
    };
    incoming[item.id] = [];
  });

  
function hasInput(id) {
  return incoming[id] && incoming[id].length > 0;
}

function isSatisfied(id) {
  const inputs = incoming[id] || [];
  return inputs.some(inputId => state[inputId]?.satisfied);
}

connections.forEach(link => {

    if (state[link.to]) {
      incoming[link.to].push(link.from);
    }
    if (link.from === link.to) {
      state[link.to].errors.push("self_loop");
      state[link.to].reason = "invalid_self_connection";
    }
  });

  let updated = true;
  
  const visited = new Set();
  function detectLoop(node, path = []) {
    if (visited.has(node)) return false;
    if (path.includes(node)) return true;
    visited.add(node);
    const next = incoming[node] || [];
    return next.some(n => detectLoop(n, [...path, node]));
  }

  items.forEach(item => {
    if (detectLoop(item.id)) {
      state[item.id].errors.push("loop_detected");
      state[item.id].reason = "loop_detected";
    }
    if (item.role === "input" && incoming[item.id].length === 0) {
      state[item.id].errors.push("unconnected_input");
    }
    if (item.role === "output" && !connections.some(conn => conn.from === item.id)) {
      state[item.id].errors.push("unused_output");
    }
  });


while (updated) {
  updated = false;
  for (const item of items) {
    if (item.role === "input") {
      const ok = hasInput(item.id) && isSatisfied(item.id);
      if (ok && !state[item.id].satisfied) {
        state[item.id].satisfied = true;
        state[item.id].reason = "flow_valid";
        updated = true;
      }
      if (!ok && hasInput(item.id)) {
        state[item.id].reason = "unsatisfied_input";
        state[item.id].errors.push("unsatisfied_input");
      }
    }
  }

    updated = false;
    for (let item of items) {
      if (item.role === "input") {
        const sources = incoming[item.id] || [];
        const satisfied = sources.some(id => state[id]?.satisfied);
        if (satisfied && !state[item.id].satisfied) {
          state[item.id].satisfied = true;
          state[item.id].reason = "valid_input";
          updated = true;
        } else if (!satisfied) {
          state[item.id].reason = "missing_input";
          if (sources.length === 0) state[item.id].errors.push("unconnected_input");
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

  
const [connectMode, setConnectMode] = useState(false);
const [selectedForLink, setSelectedForLink] = useState(null);

    setSelectedForLink(null);
  }
}


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

  

    setSelectedForLink(null);
  }
}


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
    return `\${item.type}\nRole: \${item.role}\nState: \${state?.satisfied ? "✔" : "✘"}\nReason: \${state?.reason}\`;
  }

  function hasError(item) {
    return simState[item.id]?.errors?.length > 0;
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
              title={showOverlays ? getTooltip(item) + (simState[item.id]?.errors?.length ? "\nErrors: " + simState[item.id].errors.join(", ") : "") : ""}
              onClick={() => connectMode ? handleConnectClick(item) : handleClick(item)}
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
                boxShadow: hoveredItem === item.id && showOverlays ? "0 0 6px yellow" : "none", border: simState[item.id]?.errors?.length > 0 && showOverlays ? "2px solid red" : "none"
              }}>
              {item.type}
              {showOverlays && simState[item.id]?.errors?.length > 0 && (
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
          Show Overlays</label> <button onClick={() => setConnectMode(!connectMode)} style={{ marginLeft: 20 }}>{connectMode ? "Exit Link Mode" : "Connect Items"}</button>
        </label>
      </div>
    </>
  );
}