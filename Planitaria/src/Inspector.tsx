
import React, { useState, useRef, useEffect } from "react";

export function Inspector({ selectedItem, updateItem }) {
  const defaultPos = JSON.parse(localStorage.getItem("inspectorPos") || "null") || { x: window.innerWidth - 220, y: 80 };
  const [pos, setPos] = useState(defaultPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const ref = useRef();

  function onMouseDown(e) {
    if (e.target.className !== "inspector-header") return;
    setDragging(true);
    const rect = ref.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function onMouseMove(e) {
    if (!dragging) return;
    let x = e.clientX - offset.x;
    let y = e.clientY - offset.y;

    const width = ref.current.offsetWidth;
    const winW = window.innerWidth;
    if (x < 40) x = 0;
    if (x > winW - width - 40) x = winW - width;

    setPos({ x, y });
  }

  function onMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    localStorage.setItem("inspectorPos", JSON.stringify(pos));
  }, [pos]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  if (!selectedItem && !visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          zIndex: 10,
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 4
        }}
      >
        Show Inspector
      </button>
    );
  }

  if (!selectedItem || !visible) return null;

  return (
    <div ref={ref}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        top: pos.y,
        left: pos.x,
        background: "#222",
        color: "#fff",
        padding: 10,
        width: 200,
        borderRadius: 8,
        boxShadow: "0 0 8px #000",
        zIndex: 9
      }}>
      <div className="inspector-header" style={{ fontWeight: "bold", marginBottom: 8, cursor: "move" }}>
        🔍 Inspector
        <button
          onClick={() => setVisible(false)}
          style={{
            float: "right",
            background: "#444",
            border: "none",
            color: "#fff",
            cursor: "pointer"
          }}
        >✖</button>
      </div>
      <div><b>Type:</b> {selectedItem.type}</div>
      <div><b>Position:</b> ({selectedItem.x}, {selectedItem.y})</div>
      <div><b>Rotation:</b> {selectedItem.rotation}&deg;</div>
      <div>
        <label>
          <b>Notes:</b><br />
          <textarea
            value={selectedItem.notes || ""}
            onChange={(e) => updateItem({ ...selectedItem, notes: e.target.value })}
            style={{ width: "100%", minHeight: 60 }}
          />
        </label>
      </div>
    </div>
  );
}
