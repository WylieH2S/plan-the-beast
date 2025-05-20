export function loadGamepack(name) {
  if (name === "satisfactory") {
    return {
      name: "Satisfactory",
      stencils: [
        { type: "Miner", role: "input" },
        { type: "Smelter", role: "logic" },
        { type: "Constructor", role: "output" }
      ]
    };
  }
  return { name: "Unknown", stencils: [] };
}
