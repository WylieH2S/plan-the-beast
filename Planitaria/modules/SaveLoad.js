export function exportPlanit(items) {
  const data = JSON.stringify(items, null, 2);
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
        callback(data);
      } catch (err) {
        alert("Failed to load Planit: Invalid format.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
