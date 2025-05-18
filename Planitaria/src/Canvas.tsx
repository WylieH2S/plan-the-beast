import React, { useState } from "react";

export function Canvas() {
  const [items, setItems] = useState([]);

  function onDrop(event) {
    const type = event.dataTransfer.getData("text/plain");
    const x = event.clientX;
    const y = event.clientY;
    const newItem = { id: Date.now(), type, x, y };
    setItems([...items, newItem]);
  }

  function savePlanit() {
    const payload = {
      planitae: "Satisfactory",
      created: new Date().toISOString(),
      items
    };
    const encoded = btoa(JSON.stringify(payload));
    const blob = new Blob([encoded], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "MyPlanit.planit.json";
    a.click();
  }

  function loadPlanit(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const decoded = atob(event.target.result);
      const data = JSON.parse(decoded);
      setItems(data.items);
    };
    reader.readAsText(file);
  }

  return (
    <>
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
      <div style={{ marginLeft: 200, height: "10vh", padding: 10, background: "#222" }}>
        <button onClick={savePlanit}>💾 Save Planit</button>
        <input type="file" onChange={loadPlanit} />
      </div>
    </>
  );
}
