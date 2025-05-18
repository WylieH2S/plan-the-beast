import React from "react";
import { Canvas } from "./Canvas";
import { Tray } from "./Tray";

export default function App() {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      backgroundColor: "#1e1e1e",
      color: "white"
    }}>
      <Tray />
      <Canvas />
    </div>
  );
}
