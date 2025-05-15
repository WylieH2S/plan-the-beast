export function launchTutorial() {
  const seen = localStorage.getItem("planitaria_tutorial_seen");
  if (seen === "true") return;

  const start = confirm("Welcome to Planitaria! Would you like a quick tutorial?");
  if (start) showSteps();
  localStorage.setItem("planitaria_tutorial_seen", "true");
}

function showSteps() {
  alert("This is the canvas. You can drag and drop stencils here.");
  alert("Use the right-click menu to rotate or delete stencils.");
  alert("You can toggle overlays and see power statistics as you build.");
  alert("Layouts can be saved or loaded anytime from the UI panel.");
}