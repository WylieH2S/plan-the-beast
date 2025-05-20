import React from "https://esm.sh/react@18.2.0";

export function Toolbar({ onZoomIn, onZoomOut, onReset, settings, setSettings }) {
  return React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
      zIndex: 30
    }
  }, [
    React.createElement("button", { onClick: onZoomOut }, "−"),
    React.createElement("button", { onClick: onReset }, "⟳"),
    React.createElement("button", { onClick: onZoomIn }, "+"),
    React.createElement("button", {
      onClick: () => {
        const newState = { ...settings.overlays, showConnections: !settings.overlays.showConnections };
        setSettings({ ...settings, overlays: newState });
      }
    }, settings.overlays.showConnections ? "Hide Lines" : "Show Lines")
  ]);
}
