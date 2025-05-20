export function exportPlanit(items, history) {
  const data = JSON.stringify({ items, history }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "planit.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importPlanit(callback) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.items || !Array.isArray(data.items)) throw new Error("Invalid Planit format.");
        callback(data.items, data.history || [data.items]);  // fallback for older planits
      } catch (err) {
        alert("Failed to load Planit: Invalid format.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
