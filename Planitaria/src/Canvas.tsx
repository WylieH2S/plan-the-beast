import React from "react";

const gridSize = 40;

export function Canvas({ items, setItems, setSelectedItem }) {
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
    const newItem = { id: Date.now(), type, x, y, rotation: 0 };
    setItems([...items, newItem]);
  }

  function rotateItem(id) {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, rotation: (item.rotation + 90) % 360 }
          : item
      )
    );
  }

  return (
    <div
      style={{
        flex: 1,
        marginLeft: 200,
        height: "90vh",
        position: "relative",
        borderLeft: "2px dashed #666"
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
               cursor: "pointer"
             }}>
          {item.type}
        </div>
      ))}
    </div>
  );
}
