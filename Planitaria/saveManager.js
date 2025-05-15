export function initSaveManager() {
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Layout";
  saveButton.onclick = saveLayout;
  document.getElementById("ui-panels").appendChild(saveButton);

  const loadInput = document.createElement("input");
  loadInput.type = "file";
  loadInput.accept = ".json";
  loadInput.style.display = "none";
  loadInput.onchange = e => loadLayout(e.target.files[0]);
  document.body.appendChild(loadInput);

  const loadButton = document.createElement("button");
  loadButton.textContent = "Load Layout";
  loadButton.onclick = () => loadInput.click();
  document.getElementById("ui-panels").appendChild(loadButton);
}

function saveLayout() {
  const layout = JSON.stringify({ timestamp: Date.now(), data: window.planitariaState });
  const blob = new Blob([layout], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "planitaria_layout.json";
  a.click();
  URL.revokeObjectURL(url);
}

function loadLayout(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const json = JSON.parse(e.target.result);
    window.planitariaState = json.data;
    alert("Layout loaded. Refresh will apply changes.");
  };
  reader.readAsText(file);
}