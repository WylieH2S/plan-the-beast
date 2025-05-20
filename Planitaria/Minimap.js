import React from "https://esm.sh/react@18.2.0";

export function Minimap({ items }) {
  const dots = items.map((item, i) =>
    React.createElement("div", {
      key: i,
      style: {
        position: "absolute",
        left: item.x / 10,
        top: item.y / 10,
        width: "4px",
        height: "4px",
        background: "#0f0"
      }
    })
  );

  return React.createElement("div", {
    style: {
      position: "absolute",
      left: 10,
      bottom: 10,
      width: "120px",
      height: "120px",
      background: "#111",
      border: "1px solid #333",
      overflow: "hidden",
      zIndex: 20
    }
  }, dots);
}
