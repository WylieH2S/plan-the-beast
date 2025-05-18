import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Tray } from "./Tray";
import { Inspector } from "./Inspector";

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  return (
    <>
      <Tray />
      <Canvas items={items} setItems={setItems} setSelectedItem={setSelectedItem} />
      <Inspector item={selectedItem} />
    </>
  );
}
