// Manual typed connection handler

export let connections = [];

export function addConnection(a, b, type = "belt") {
  if (!a || !b || a.id === b.id) return;
  if (!connections.find(c => c.a.id === a.id && c.b.id === b.id)) {
    connections.push({ a, b, type });
  }
}

export function cycleConnectionType(x, y, radius = 10) {
  const types = ["belt", "power", "pipe"];
  for (let conn of connections) {
    const midX = (conn.a.x + conn.b.x) / 2;
    const midY = (conn.a.y + conn.b.y) / 2;
    const dx = midX - x;
    const dy = midY - y;
    if (dx * dx + dy * dy <= radius * radius) {
      const current = types.indexOf(conn.type);
      conn.type = types[(current + 1) % types.length];
      break;
    }
  }
}

export function removeConnectionByCoords(x, y, radius = 10) {
  connections = connections.filter(({ a, b }) => {
    const dx = (a.x + b.x) / 2 - x;
    const dy = (a.y + b.y) / 2 - y;
    return dx * dx + dy * dy > radius * radius;
  });
}

export function clearConnections() {
  connections = [];
}

export function getConnections() {
  return connections;
}

export function serializeConnections() {
  return connections.map(c => [c.a.id, c.b.id, c.type]);
}

export function loadConnections(serialized, items) {
  connections = [];
  for (const [aid, bid, type] of serialized) {
    const a = items.find(it => it.id === aid);
    const b = items.find(it => it.id === bid);
    if (a && b && a.id !== b.id) {
      connections.push({ a, b, type: type || "belt" });
    }
  }
}
