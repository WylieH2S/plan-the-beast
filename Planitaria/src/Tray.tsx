
import React, { useState, useRef, useEffect } from "react";

export function Tray({ stencils }) {
  const defaultPos = JSON.parse(localStorage.getItem("trayPos") || "null") || { x: 20, y: 80 };
  const [pos, setPos] = useState(defaultPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const trayRef = useRef();

  function onMouseDown(e) {
    if (e.target.className !== "tray-header") return;
    setDragging(true);
    const rect = trayRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function onMouseMove(e) {
    if (!dragging) return;
    let x = e.clientX - offset.x;
    let y = e.clientY - offset.y;

    const width = trayRef.current.offsetWidth;
    const winW = window.innerWidth;
    if (x < 40) x = 0;
    if (x > winW - width - 40) x = winW - width;

    setPos({ x, y });
  }

  function onMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    localStorage.setItem("trayPos", JSON.stringify(pos));
  }, [pos]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          zIndex: 10,
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 4
        }}
      >
        Show Tray
      </button>
    );
  }

  return (
    <div ref={trayRef}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        top: pos.y,
        left: pos.x,
        background: "#222",
        color: "#fff",
        padding: 10,
        width: 180,
        height: "calc(100vh - 100px)",
        overflowY: "auto",
        borderRadius: 8,
        boxShadow: "0 0 8px #000",
        zIndex: 9
      }}>
      <div className="tray-header" style={{ fontWeight: "bold", marginBottom: 6, cursor: "move" }}>
        🧱 Tray
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
      {stencils.map((stencil, i) => (
        <div key={i}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", stencil.type)}
          style={{
            background: "#444",
            margin: "4px 0",
            padding: 4,
            borderRadius: 4,
            textAlign: "center",
            cursor: "grab"
          }}>
          {stencil.type}
        </div>
      ))}
    </div>
  );
}
