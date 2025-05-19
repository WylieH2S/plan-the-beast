import React, { useState, useEffect } from "https://esm.sh/react@18.2.0?bundle";
import { simulate } from "./LogicSim.js";
import { savePlanit, loadPlanit } from "./SaveLoad.js";
import { Inspector } from "./Inspector.js";

const gridSize = 40;
const defaultItems = [
  { id: "1", type: "Miner", role: "input", x: 100, y: 100, rotation: 0 },
  { id: "2", type: "Smelter", role: "logic", x: 250, y: 100, rotation: 0 },
  { id: "3", type: "Constructor", role: "output", x: 400, y: 100, rotation: 0 }
];
const defaultConnections = [
  { from: "1", to: "2" },
  { from: "2", to: "3" }
];

export function Canvas() {
  const [items, setItems] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [simState, setSimState] = useState({});

  useEffect(() => {
    const saved = loadPlanit("planit-current");
    if (saved) {
      setItems(saved.items);
      setConnections(saved.connections);
    } else {
      setItems(defaultItems);
      setConnections(defaultConnections);
    }
  }, []);

  useEffect(() => {
    const result = simulate(items, connections);
    setSimState(result);
    savePlanit("planit-current", items, connections);
  }, [items, connections]);

  function getCenter(item) {
    return { x: item.x + 40, y: item.y + 20 };
  }

  function updateItem(updated) {
    const next = items.map(i => i.id === updated.id ? updated : i);
    setItems(next);
    setSelected(updated);
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("svg", {
      width: "100%", height: "85vh",
      style: { position: "absolute", pointerEvents: "none" }
    },
      connections.map((conn, i) => {
        const from = items.find(i => i.id === conn.from);
        const to = items.find(i => i.id === conn.to);
        if (!from || !to) return null;
        const p1 = getCenter(from);
        const p2 = getCenter(to);
        return React.createElement("line", {
          key: i,
          x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
          stroke: "cyan", strokeWidth: 2
        });
      })
    ),
    React.createElement("div", {
      style: {
        width: "100%",
        height: "85vh",
        backgroundImage: "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
        backgroundSize: gridSize + "px " + gridSize + "px",
        position: "relative"
      }
    },
      items.map((item) => {
        const satisfied = simState[item.id]?.satisfied;
        return React.createElement("div", {
          key: item.id,
          title: item.type,
          onClick: () => setSelected(item),
          style: {
            position: "absolute",
            left: item.x,
            top: item.y,
            background: satisfied ? "#9f9" : "#f99",
            padding: "6px 10px",
            borderRadius: "4px",
            fontWeight: "bold",
            color: "#000",
            transform: `rotate(${item.rotation}deg)`,
            cursor: "pointer",
            boxShadow: "0 0 4px cyan"
          }
        }, item.type);
      })
    ),
    React.createElement(Inspector, { selectedItem: selected, updateItem })
  );
}
