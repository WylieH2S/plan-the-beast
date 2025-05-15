let activeGame = null;

export function loadStencils(game) {
  activeGame = game;
  fetch(`./gamepacks/${game}/stencils.json`)
    .then(res => res.json())
    .then(data => {
      renderStencils(data);
    });
}

function renderStencils(stencils) {
  const panel = document.createElement("div");
  panel.className = "stencil-panel";
  stencils.forEach(item => {
    const stencil = document.createElement("div");
    stencil.className = "stencil-item";
    stencil.textContent = item.name;
    stencil.draggable = true;
    panel.appendChild(stencil);
  });
  document.getElementById("ui-panels").appendChild(panel);
}