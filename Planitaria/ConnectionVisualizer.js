// Manual connection list handler

export let connections = [];

export function addConnection(a, b) {
  if (!a || !b || a.id === b.id) return;
  if (!connections.find(([x, y]) => (x.id === a.id && y.id === b.id))) {
    connections.push([a, b]);
  }
}

export function removeConnectionByCoords(x, y, radius = 10) {
  connections = connections.filter(([a, b]) => {
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
  return connections.map(([a, b]) => [a.id, b.id]);
}

export function loadConnections(serialized, items) {
  connections = [];
  for (const [aid, bid] of serialized) {
    const a = items.find(it => it.id === aid);
    const b = items.find(it => it.id === bid);
    if (a && b && a.id !== b.id) {
      connections.push([a, b]);
    }
  }
}