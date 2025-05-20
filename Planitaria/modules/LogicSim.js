// Basic mock logic simulator that randomizes item statuses

export function simulateStatuses(items, update) {
  const updated = items.map(item => {
    let status = "ok";
    if (item.role === "input") status = Math.random() < 0.3 ? "starved" : "ok";
    if (item.role === "output") status = Math.random() < 0.3 ? "clogged" : "ok";
    return { ...item, status };
  });
  update(updated);
}
