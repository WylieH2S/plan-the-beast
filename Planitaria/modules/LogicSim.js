import { getConnections } from "../ConnectionVisualizer.js";

export function simulateStatuses(items, setItems) {
  const connections = getConnections();

  const incomingMap = {};
  const outgoingMap = {};
  const flowMap = {};

  for (const conn of connections) {
    const fromId = conn.a.id;
    const toId = conn.b.id;
    const type = conn.type;

    if (!outgoingMap[fromId]) outgoingMap[fromId] = [];
    if (!incomingMap[toId]) incomingMap[toId] = [];

    outgoingMap[fromId].push(toId);
    incomingMap[toId].push(fromId);
  }

  const itemMap = {};
  items.forEach(i => itemMap[i.id] = i);

  // Simulate throughput flow
  const throughputUsed = {};
  for (const id in outgoingMap) {
    const source = itemMap[id];
    const totalOut = outgoingMap[id].length;
    if (!source || !source.throughput || totalOut === 0) continue;
    const split = source.throughput / totalOut;
    for (const targetId of outgoingMap[id]) {
      if (!throughputUsed[targetId]) throughputUsed[targetId] = 0;
      throughputUsed[targetId] += split;
    }
  }

  const updated = items.map(item => {
    const id = item.id;
    let status = "ok";
    let alert = null;

    if (item.role === "input" || item.role === "power") {
      status = outgoingMap[id]?.length ? "ok" : "clogged";
    }
    if (item.role === "logic") {
      if (!incomingMap[id]?.length) status = "starved";
      else if (!outgoingMap[id]?.length) status = "clogged";
    }
    if (item.role === "output") {
      status = incomingMap[id]?.length ? "ok" : "starved";
    }

    const used = throughputUsed[id] || 0;

    if ((item.role === "logic" || item.role === "output") && !incomingMap[id]) {
      alert = "missing_input";
    }

    if (used > (item.throughput || 0)) {
      alert = "over_capacity";
    }

    return { ...item, status, throughputUsed: used, alert };
  });

  setItems(updated);
}
