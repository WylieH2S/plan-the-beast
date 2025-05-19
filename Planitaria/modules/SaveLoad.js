export function savePlanit(name, items, connections) {
  const payload = {
    items,
    connections,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(name, JSON.stringify(payload));
}

export function loadPlanit(name) {
  const raw = localStorage.getItem(name);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
