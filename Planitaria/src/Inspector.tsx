import React from "react";

export function Inspector({ item, setItem, updateItem }) {
  if (!item) {
    return (
      <div style={panelStyle}>
        <h3>Inspector</h3>
        <p>No item selected</p>
      </div>
    );
  }

  function handleChange(field, value) {
    const updated = { ...item, [field]: value };
    setItem(updated);
    updateItem(updated);
  }

  return (
    <div style={panelStyle}>
      <h3>Inspector</h3>
      <div><strong>ID:</strong> {item.id}</div>
      <div>
        <label>Type: </label>
        <input value={item.type} onChange={(e) => handleChange("type", e.target.value)} />
      </div>
      <div>
        <label>X: </label>
        <input type="number" value={item.x} onChange={(e) => handleChange("x", +e.target.value)} />
      </div>
      <div>
        <label>Y: </label>
        <input type="number" value={item.y} onChange={(e) => handleChange("y", +e.target.value)} />
      </div>
      <div>
        <label>Rotation: </label>
        <input type="number" value={item.rotation} onChange={(e) => handleChange("rotation", +e.target.value)} />
      </div>
      <div>
        <label>Notes:</label>
        <textarea
          value={item.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          style={{ width: "100%", height: "60px", marginTop: "5px" }}
        />
      </div>
    </div>
  );
}

const panelStyle = {
  position: "absolute",
  right: 0,
  top: 0,
  width: 200,
  height: "100vh",
  background: "#222",
  color: "#fff",
  padding: 10,
  borderLeft: "2px solid #444"
};
