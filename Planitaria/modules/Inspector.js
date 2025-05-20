import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
function Inspector({ selectedItem, updateItem }) {
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setLabel(selectedItem?.type || "");
    setNote(selectedItem?.note || "");
  }, [selectedItem]);

  if (!selectedItem) return null;

  return React.createElement("div", {
    style: {
      position: "absolute",
      right: 10,
      top: 10,
      width: "240px",
      background: "#333",
      padding: "10px",
      color: "#fff",
      border: "1px solid #888",
      borderRadius: "6px",
      zIndex: 10
    }
  }, [
    React.createElement("h4", { key: "title" }, "Inspector"),
    React.createElement("label", { key: "lbl" }, "Type:"),
    React.createElement("input", {
      key: "input",
      value: label,
      onChange: e => setLabel(e.target.value),
      onBlur: () => updateItem({ ...selectedItem, type: label }),
      style: { width: "100%", marginBottom: "8px" }
    }),
    React.createElement("label", { key: "noteLbl" }, "Note:"),
    React.createElement("textarea", {
      key: "noteField",
      value: note,
      onChange: e => setNote(e.target.value),
      onBlur: () => updateItem({ ...selectedItem, note }),
      rows: 4,
      style: { width: "100%" }
    })
  ]);
}
window.Inspector = Inspector;
export { Inspector };