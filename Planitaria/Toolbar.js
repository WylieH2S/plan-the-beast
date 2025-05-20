import React from "https://esm.sh/react@18.2.0";

export function Toolbar({ onZoomIn, onZoomOut, onReset, settings, setSettings, onGamepackChange }) {
  const updateSnapSize = (e) => {
    const size = parseInt(e.target.value);
    if (!isNaN(size)) {
      setSettings({ ...settings, snap: { ...settings.snap, size } });
    }
  };

  return React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      zIndex: 30
    }
  }, [
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, belt: !conn.belt } } });
      }
    }, (settings.overlays.connectionTypes.belt ? "✓" : "✗") + " Belt"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, power: !conn.power } } });
      }
    }, (settings.overlays.connectionTypes.power ? "✓" : "✗") + " Power"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, pipe: !conn.pipe } } });
      }
    }, (settings.overlays.connectionTypes.pipe ? "✓" : "✗") + " Pipe"),

    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", { onClick: onZoomOut }, "−"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, belt: !conn.belt } } });
      }
    }, (settings.overlays.connectionTypes.belt ? "✓" : "✗") + " Belt"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, power: !conn.power } } });
      }
    }, (settings.overlays.connectionTypes.power ? "✓" : "✗") + " Power"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, pipe: !conn.pipe } } });
      }
    }, (settings.overlays.connectionTypes.pipe ? "✓" : "✗") + " Pipe"),

    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", { onClick: onReset }, "⟳"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, belt: !conn.belt } } });
      }
    }, (settings.overlays.connectionTypes.belt ? "✓" : "✗") + " Belt"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, power: !conn.power } } });
      }
    }, (settings.overlays.connectionTypes.power ? "✓" : "✗") + " Power"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, pipe: !conn.pipe } } });
      }
    }, (settings.overlays.connectionTypes.pipe ? "✓" : "✗") + " Pipe"),

    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", { onClick: onZoomIn }, "+"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, belt: !conn.belt } } });
      }
    }, (settings.overlays.connectionTypes.belt ? "✓" : "✗") + " Belt"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, power: !conn.power } } });
      }
    }, (settings.overlays.connectionTypes.power ? "✓" : "✗") + " Power"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, pipe: !conn.pipe } } });
      }
    }, (settings.overlays.connectionTypes.pipe ? "✓" : "✗") + " Pipe"),

    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const newState = { ...settings.overlays, showConnections: !settings.overlays.showConnections };
        setSettings({ ...settings, overlays: newState });
      }
    }, settings.overlays.showConnections ? "Hide Lines" : "Show Lines"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, belt: !conn.belt } } });
      }
    }, (settings.overlays.connectionTypes.belt ? "✓" : "✗") + " Belt"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, power: !conn.power } } });
      }
    }, (settings.overlays.connectionTypes.power ? "✓" : "✗") + " Power"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => {
        const conn = settings.overlays.connectionTypes;
        setSettings({ ...settings, overlays: { ...settings.overlays, connectionTypes: { ...conn, pipe: !conn.pipe } } });
      }
    }, (settings.overlays.connectionTypes.pipe ? "✓" : "✗") + " Pipe"),

    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("fitCanvas")),
      style: { background: "#333", color: "#fff" }
    }, "Fit View"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("exportBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Export Blueprint"),
    React.createElement("button", {
      onClick: () => window.dispatchEvent(new CustomEvent("importBlueprint")),
      style: { background: "#333", color: "#fff" }
    }, "Import Blueprint"),

    React.createElement("button", {
      onClick: () => setSettings({ ...settings, snap: { ...settings.snap, enabled: !settings.snap.enabled } })
    }, settings.snap.enabled ? "Snap ✓" : "Snap ✗"),
    React.createElement("input", {
      type: "number",
      value: settings.snap.size,
      min: 10,
      max: 100,
      step: 10,
      onChange: updateSnapSize,
      style: { width: "60px" }
    }),
    React.createElement("select", {
      onChange: e => onGamepackChange(e.target.value),
      defaultValue: "satisfactory"
    }, [
      React.createElement("option", { value: "satisfactory" }, "Satisfactory"),
      React.createElement("option", { value: "empty" }, "Empty")
    ])
  ]);
}
