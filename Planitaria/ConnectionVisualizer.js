// Manual connection list handler

export let connections = [];

export function addConnection(a, b) {
  if (!a || !b || a.id === b.id) return;
  if (!connections.find(([x, y]) => (x.id === a.id && y.id === b.id))) {
    connections.push([a, b]);
  }
}

export function clearConnections() {
  connections = [];
}

export function getConnections() {
  return connections;
}
