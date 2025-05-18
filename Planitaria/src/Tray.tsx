import React from "react";

const stencils = ["Constructor", "Smelter", "Splitter", "Merger"];

export function Tray() {
  function onDragStart(event, type) {
    event.dataTransfer.setData("text/plain", type);
  }

  return (
    <div style={{
      width: 200,
      background: "#333",
      color: "#fff",
      padding: 10,
      float: "left",
      height: "100vh",
      boxSizing: "border-box"
    }}>
      {stencils.map((type) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          style={{
            marginBottom: 10,
            padding: 8,
            background: "#555",
            cursor: "grab",
            borderRadius: 6,
            textAlign: "center"
          }}
        >
          {type}
        </div>
      ))}
    </div>
  );
}
