// Mock connection system — links first input -> logic -> output

export function calculateConnections(items) {
  const inputs = items.filter(it => it.role === "input");
  const logic = items.filter(it => it.role === "logic");
  const outputs = items.filter(it => it.role === "output");

  const connections = [];

  const minCount = Math.min(inputs.length, logic.length, outputs.length);
  for (let i = 0; i < minCount; i++) {
    connections.push([inputs[i], logic[i]]);
    connections.push([logic[i], outputs[i]]);
  }

  return connections;
}
