import React from "https://esm.sh/react@18.2.0";

export function Tray({ onAdd, gamepack }) {
  const [open, setOpen] = React.useState(true);
  if (!gamepack || !gamepack.stencils) return null;
  if (!open) return React.createElement("div", {
    style: { position: "absolute", left: 10, top: 10, zIndex: 10 }
  },
    React.createElement("button", { onClick: () => setOpen(true), style: { background: "#444", color: "#fff", padding: "6px" } }, "▶ Tray")
  );

  return React.createElement("div", {
    style: {
      position: "absolute",
      left: 10,
      top: 10,
      width: "180px",
      background: "#222",
      padding: "10px",
      color: "#fff",
      border: "1px solid #555",
      borderRadius: "6px",
      zIndex: 10
    }
  }, [
    React.createElement("button", { key: "close", onClick: () => setOpen(false), style: { float: "right", background: "#333", color: "#fff", border: "none" } }, "✕"),
    React.createElement("h4", { key: "title" }, gamepack.name),
    ...gamepack.stencils.map((s, idx) =>
      React.createElement("button", {
        key: idx,
        onClick: () => onAdd({ ...s }),
        style: {
          display: "block",
          width: "100%",
          marginBottom: "6px",
          padding: "6px",
          background: "#444",
          color: "#fff",
          border: "1px solid #888",
          borderRadius: "4px",
          cursor: "pointer"
        }
      }, s.type)
    )
  ]);
}
