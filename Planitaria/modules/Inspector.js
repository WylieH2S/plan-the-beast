import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";

function Inspector({ selectedItem, updateItem }) {
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!selectedItem) return;
    setLabel(selectedItem.type || "");
    setNote(selectedItem.note || "");
    setRotation(selectedItem.rotation || 0);
  }, [selectedItem]);

  if (!selectedItem) return null;

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
    React.createElement("h4", { key: "title" }, "Inspector"),
    React.createElement("label", {}, "Type:"),
    React.createElement("input", {
      key: "type",
      value: label,
      onChange: e => setLabel(e.target.value),
      onBlur: () => updateItem({ ...selectedItem, type: label }),
      style: { width: "100%", marginBottom: "10px" }
    }),
    React.createElement("label", {}, "Note:"),
    React.createElement("textarea", {
      key: "note",
      value: note,
      onChange: e => setNote(e.target.value),
      onBlur: () => updateItem({ ...selectedItem, note }),
      rows: 3,
      style: { width: "100%", marginBottom: "10px" }
    }),
    React.createElement("label", {}, "Rotation:"),
    React.createElement("input", {
      key: "rotation",
      type: "number",
      value: rotation,
      min: 0,
      max: 359,
      step: 15,
      onChange: e => setRotation(Number(e.target.value)),
      onBlur: () => updateItem({ ...selectedItem, rotation }),
      style: { width: "100%", marginBottom: "10px" }
    }),
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

export { Inspector };
