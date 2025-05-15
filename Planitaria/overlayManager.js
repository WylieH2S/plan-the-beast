export function initOverlaySystem() {
  const canvas = document.createElement("canvas");
  canvas.id = "overlay-canvas";
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = "none";
  document.getElementById("planitaria-app").appendChild(canvas);

  function resizeOverlay() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeOverlay);
  resizeOverlay();

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0,255,0,0.2)";
  ctx.fillRect(100, 100, 128, 128);
}