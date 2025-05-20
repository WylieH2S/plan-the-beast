import { getConnections } from "../ConnectionVisualizer.js";

export function simulateStatuses(items, setItems) {
  const connections = getConnections();

  const incomingMap = {};
  const outgoingMap = {};

  for (const conn of connections) {
    const fromId = conn.a.id;
    const toId = conn.b.id;

    if (!outgoingMap[fromId]) outgoingMap[fromId] = 0;
    if (!incomingMap[toId]) incomingMap[toId] = 0;

    outgoingMap[fromId]++;
    incomingMap[toId]++;
  }

  const updated = items.map(item => {
    const id = item.id;
    if (item.role === "input" || item.role === "power") {
      return { ...item, status: outgoingMap[id] > 0 ? "ok" : "clogged" };
    }
    if (item.role === "logic") {
      if (!incomingMap[id]) return { ...item, status: "starved" };
      if (!outgoingMap[id]) return { ...item, status: "clogged" };
      return { ...item, status: "ok" };
    }
    if (item.role === "output") {
      return { ...item, status: incomingMap[id] > 0 ? "ok" : "starved" };
    }
    return { ...item, status: "ok" };
  });

  setItems(updated);
}
