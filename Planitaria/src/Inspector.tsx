import React from "react";

export function Inspector({ item }) {
  return (
    <div style={{
      position: "absolute",
      right: 0,
      top: 0,
      width: 200,
      height: "100vh",
      background: "#222",
      color: "#fff",
      padding: 10,
      borderLeft: "2px solid #444"
    }}>
      <h3>Inspector</h3>
      {item ? (
        <>
          <div><strong>Type:</strong> {item.type}</div>
          <div><strong>X:</strong> {item.x}</div>
          <div><strong>Y:</strong> {item.y}</div>
          <div><strong>Rotation:</strong> {item.rotation}°</div>
        </>
      ) : (
        <div>No item selected</div>
      )}
    </div>
  );
}
