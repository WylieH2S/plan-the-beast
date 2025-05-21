window.addEventListener("DOMContentLoaded", async () => {
  const { Canvas } = await import("./modules/Canvas.js");
  const root = window.ReactDOM.createRoot(document.getElementById("root"));
  root.render(window.React.createElement(Canvas));
});
