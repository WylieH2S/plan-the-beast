export function loadGamepack(name) {
  if (name === "satisfactory") {
    return {
      name: "Satisfactory",
      stencils: [
        { type: "Miner Mk.1", role: "input", power: 5, throughput: 60 },
        { type: "Miner Mk.2", role: "input", power: 12, throughput: 120 },
        { type: "Smelter", role: "logic", power: 4, throughput: 30 },
        { type: "Constructor", role: "logic", power: 4, throughput: 20 },
        { type: "Foundry", role: "logic", power: 16, throughput: 45 },
        { type: "Storage Container", role: "output", power: 1, throughput: 60 },
        { type: "Power Pole", role: "power", power: 0, throughput: 0 },
        { type: "Biomass Burner", role: "power", power: -30, throughput: 0 },
        { type: "Conveyor Belt Mk.1", role: "link", power: 0, throughput: 60 },
        { type: "Conveyor Belt Mk.2", role: "link", power: 0, throughput: 120 },
        { type: "Pipe", role: "link", power: 0, throughput: 300 }
      ]
    };
  }

  if (name === "empty") {
    return {
      name: "Empty Planitae",
      stencils: []
    };
  }

  return { name: "Unknown", stencils: [] };
}
