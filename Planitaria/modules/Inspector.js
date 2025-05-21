// [Inspector.js] Now includes rotation buttons and live label update
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";

export function Inspector({ selectedItem, updateItem, multi }) {
  if (!selectedItem && (!multi || !multi.length)) return null;

  // Show connection view if a connection object is selected
  if (selectedItem && selectedItem.a && selectedItem.b) {
    return React.createElement("div", {
      style: {
        position: "absolute",
        right: 10,
        top: 10,
        width: "260px",
        background: "#222",
        padding: "12px",
        color: "#fff",
        border: "1px solid #555",
        borderRadius: "6px",
        zIndex: 10
      }
    }, [
      React.createElement("h4", {}, "Connection"),
      React.createElement("div", {}, `From: ${selectedItem.a.type}`),
      React.createElement("div", {}, `To: ${selectedItem.b.type}`),
      React.createElement("label", {}, "Type:"),
  React.createElement("select", {
    value: selectedItem.type,
    onChange: (e) => updateItem({ ...selectedItem, type: e.target.value }),
    style: { width: "100%", marginBottom: "10px" }
  }, [
    React.createElement("option", { value: "belt" }, "Belt"),
    React.createElement("option", { value: "power" }, "Power"),
    React.createElement("option", { value: "pipe" }, "Pipe")
  ])
    ]);
  }

  // Show multi-select summary
  if (multi && multi.length > 1) {
    const roles = multi.map(it => it.role);
    const types = multi.map(it => it.type);
    return React.createElement("div", {
      style: {
        position: "absolute",
        right: 10,
        top: 10,
        width: "260px",
        background: "#222",
        padding: "12px",
        color: "#fff",
        border: "1px solid #555",
        borderRadius: "6px",
        zIndex: 10
      }
    }, [
      React.createElement("h4", {}, "Multi-Selection"),
      React.createElement("div", {}, `Items: ${multi.length}`),
      React.createElement("div", {}, `Types: ${[...new Set(types)].join(", ")}`),
      React.createElement("div", {}, `Roles: ${[...new Set(roles)].join(", ")}`)
    ]);
  }

  // Default inspector for a single item
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!selectedItem) return;
    setLabel(selectedItem.type || "");
    setNote(selectedItem.note || "");
    setRotation(selectedItem.rotation || 0);
  }, [selectedItem]);

  return React.createElement("div", {
    style: {
      position: "absolute",
      right: 10,
      top: 10,
      width: "260px",
      background: "#222",
      padding: "12px",
      color: "#fff",
      border: "1px solid #555",
      borderRadius: "6px",
      zIndex: 10
    }
  }, [
    React.createElement("h4", {}, "Inspector"),
    React.createElement("label", {}, "Type:"),
    React.createElement("input", {
      value: label,
      onChange: e => setLabel(e.target.value),
      onBlur: () => updateItem({ ...selectedItem, type: label }),
      style: { width: "100%", marginBottom: "10px" }
    }),
    React.createElement("label", {}, "Note:"),
    React.createElement("textarea", {
      value: note,
      onChange: e => setNote(e.target.value),
      onBlur: () => updateItem({ ...selectedItem, note }),
      rows: 3,
      style: { width: "100%", marginBottom: "10px" }
    }),
    React.createElement("label", {}, "Rotation:"),
    React.createElement("input", {
      type: "number",
      value: rotation,
      min: 0,
      max: 359,
      step: 15,
      onChange: e => setRotation(Number(e.target.value)),
      onBlur: () => updateItem({ ...selectedItem, rotation }),
      style: { width: "100%", marginBottom: "10px" }
    }),
    
    React.createElement("label", {}, "Throughput:"),
    React.createElement("div", {
      style: { marginBottom: "10px", color: "#0ff" }
    }, selectedItem.throughput !== undefined ? selectedItem.throughput + " / min" : "—"),
    React.createElement("label", {}, "Power Usage:"),
    React.createElement("div", {
      style: { marginBottom: "10px", color: "#ffa500" }
    }, selectedItem.power !== undefined ? selectedItem.power + " MW" : "—"),
React.createElement("label", {}, "Status:"),
    React.createElement("div", {
      style: {
        padding: "8px",
        background: selectedItem.status === "clogged" ? "#a00"
                  : selectedItem.status === "starved" ? "#aa0"
                  : "#0a0",
        color: "#fff",
        textAlign: "center",
        borderRadius: "4px"
      }
    }, selectedItem.status || "ok")
  ]);
}