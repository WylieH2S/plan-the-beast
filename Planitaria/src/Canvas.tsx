import React, { useState } from "react";

export function Canvas() {
  const [items, setItems] = useState([]);

  function onDrop(event: React.DragEvent) {
    const type = event.dataTransfer.getData("text/plain");
    const newItem = {
      id: Date.now(),
      type,
      x: event.clientX,
      y: event.clientY
    };
    setItems([...items, newItem]);
  }

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        border: "2px dashed #666",
        margin: 10,
        borderRadius: 8,
        overflow: "hidden"
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {items.map((item) => (
        <div key={item.id} style={{
          position: "absolute",
          left: item.x,
          top: item.y,
          background: "lightblue",
          padding: "6px 10px",
          borderRadius: 4,
          fontWeight: "bold",
          color: "#000"
        }}>
          {item.type}
        </div>
      ))}
    </div>
  );
}
