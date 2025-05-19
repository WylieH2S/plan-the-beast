import React from "https://esm.sh/react";

const STENCILS = [
  { type: "Miner", role: "input" },
  { type: "Smelter", role: "logic" },
  { type: "Constructor", role: "output" }
];

export function Tray({ onAdd }) {
  return React.createElement("div", {
    style: {
      position: "absolute",
      left: 10,
      top: 10,
      width: "180px",
      background: "#222",
      padding: "10px",
      color: "#fff",
      border: "1px solid #555",
      borderRadius: "6px",
      zIndex: 10
    }
  }, [
    React.createElement("h4", { key: "title" }, "Tray"),
    ...STENCILS.map((s, idx) =>
      React.createElement("button", {
        key: idx,
        onClick: () => onAdd({ ...s }),
        style: {
          display: "block",
          width: "100%",
          marginBottom: "6px",
          padding: "6px",
          background: "#444",
          color: "#fff",
          border: "1px solid #888",
          borderRadius: "4px",
          cursor: "pointer"
        }
      }, s.type)
    )
  ]);
}
