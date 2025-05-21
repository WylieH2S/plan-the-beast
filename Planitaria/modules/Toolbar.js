// [Toolbar.js] Polished gamepack dropdown and zoom logic
import React from "https://esm.sh/react@18.2.0";

export function Toolbar({ onZoomIn, onZoomOut, onReset, settings, setSettings, onGamepackChange }) {
  return React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 20,
      background: "#222",
      padding: "8px",
      color: "#fff",
      border: "1px solid #555",
      borderRadius: "6px"
    }
  }, [
    React.createElement("div", { key: "zoomLabel", style: { marginBottom: "4px" } }, `Zoom: ${Math.round(settings.zoom * 100)}%`),
    React.createElement("button", { key: "zoomIn", onClick: onZoomIn, style: { marginRight: "4px" } }, "➕"),
    React.createElement("button", { key: "zoomOut", onClick: onZoomOut, style: { marginRight: "4px" } }, "➖"),
    React.createElement("button", { key: "reset", onClick: onReset, style: { marginRight: "4px" } }, "🔄"),
    React.createElement("select", {
      key: "gamepack",
      value: settings.game,
      onChange: e => {
        const game = e.target.value;
        setSettings({ ...settings, game });
        onGamepackChange(game);
      },
      style: { marginLeft: "8px", background: "#111", color: "#fff", border: "1px solid #555" }
    }, [
      React.createElement("option", { value: "satisfactory" }, "Satisfactory"),
      React.createElement("option", { value: "minecraft" }, "Minecraft"),
      React.createElement("option", { value: "generic" }, "Generic")
    ])
  ]);
}