// [Tutorial.js] Adds skip/close controls and current step state
import React from "https://esm.sh/react@18.2.0";

let step = 0;
let listeners = [];

const steps = [
  { id: 1, text: "Welcome to Planitaria! Let's build something.", target: "toolbar" },
  { id: 2, text: "Click a building from the tray to place it.", target: "tray" },
  { id: 3, text: "Click the canvas to place the building.", target: "canvas" },
  { id: 4, text: "Now try connecting two buildings.", target: "canvas" },
  { id: 5, text: "Great! You can view stats in the inspector.", target: "inspector" },
  { id: 6, text: "Try saving your layout before you go.", target: "toolbar" },
  { id: 7, text: "You're ready to explore. Have fun!", target: "none" }
];

export function startTutorial() {
  step = 0;
  notify();
}

export function nextTutorialStep() {
  if (step < steps.length - 1) {
    step++;
    notify();
  }
}

export function endTutorial() {
  step = 0;
  notify();
}

export function getCurrentStep() {
  return steps[step];
}

export function onTutorialChange(callback) {
  listeners.push(callback);
}

function notify() {
  listeners.forEach(fn => fn(getCurrentStep()));
}


export function tutorialTrigger(action) {
  const map = {
    "placed": 2,
    "connected": 4,
    "inspected": 5,
    "saved": 6
  };
  const next = map[action];
  if (next && steps[step].id === next - 1) nextTutorialStep();
}
