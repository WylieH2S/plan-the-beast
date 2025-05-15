export function setupUIState() {
  const panelRoot = document.getElementById("ui-panels");
  panelRoot.style.position = "absolute";
  panelRoot.style.top = 0;
  panelRoot.style.left = 0;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Reset Layout";
  toggleBtn.onclick = () => {
    localStorage.removeItem("planitaria_ui_positions");
    location.reload();
  };
  panelRoot.appendChild(toggleBtn);

  makePanelsDraggable(panelRoot);
}

function makePanelsDraggable(root) {
  root.style.cursor = "move";
  root.onmousedown = e => {
    let shiftX = e.clientX - root.getBoundingClientRect().left;
    let shiftY = e.clientY - root.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      root.style.left = pageX - shiftX + 'px';
      root.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };

  root.ondragstart = () => false;
}