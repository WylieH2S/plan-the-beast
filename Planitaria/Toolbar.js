import React from "https://esm.sh/react@18.2.0";

export function Toolbar({ onZoomIn, onZoomOut, onReset, settings, setSettings, onGamepackChange }) {
  return React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: 200,
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      zIndex: 20
    }
  }, [

    // Zoom Controls
    React.createElement("div", {
      style: {
        display: "flex",
        gap: "6px",
        background: "#222",
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #444",
        boxShadow: "0 0 4px #000"
      }
    }, [
      React.createElement("button", { onClick: onZoomIn }, "+"),
      React.createElement("button", { onClick: onZoomOut }, "−"),
      React.createElement("button", { onClick: onReset }, "Reset"),
      React.createElement("label", {}, "Snap"),
      React.createElement("select", {
        value: settings.snap.size,
        onChange: (e) => setSettings({ ...settings, snap: { ...settings.snap, size: parseInt(e.target.value) } })
      }, [40, 20, 10, 5].map(v =>
        React.createElement("option", { value: v }, v)
      )),
      React.createElement("select", {
        value: settings.gamepack,
        onChange: e => onGamepackChange(e.target.value)
      }, [
        React.createElement("option", { value: "satisfactory" }, "Satisfactory"),
        React.createElement("option", { value: "empty" }, "Empty")
      ])
    ]),

    // Blueprint Tools
    React.createElement("div", {
      style: {
        display: "flex",
        gap: "6px",
        background: "#222",
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #444",
        boxShadow: "0 0 4px #000"
      }
    }, [
      React.createElement("button", {
        onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint"))
      }, "Export Blueprint"),
      React.createElement("button", {
        onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint"))
      }, "Import Blueprint"),
      React.createElement("button", {
        onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas"))
      }, "Fit View")
    ]),

    // Connection Type Toggles
    React.createElement("div", {
      style: {
        display: "flex",
        gap: "6px",
        background: "#222",
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #444",
        boxShadow: "0 0 4px #000"
      }
    }, ["belt", "power", "pipe"].map(type =>
      React.createElement("button", {
        onClick: () => {
          const conn = settings.overlays.connectionTypes;
          setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, [type]: !conn[type] } } });
        }
      }, (settings.overlays.connectionTypes[type] ? "✓" : "✗") + " " + type.charAt(0).toUpperCase() + type.slice(1))
    ))

  ]);
}
