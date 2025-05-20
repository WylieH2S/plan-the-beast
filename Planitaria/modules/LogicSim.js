// LogicSim: Placeholder simulation logic hook

export function simulateStatuses(items, update) {
  const updated = items.map(item => {
    let status = "ok";
    let throughput = 0;
    if (item.role === "input") {
      status = Math.random() < 0.3 ? "starved" : "ok";
      throughput = Math.floor(Math.random() * 100);
    }
    if (item.role === "output") {
      status = Math.random() < 0.3 ? "clogged" : "ok";
      throughput = Math.floor(Math.random() * 100);
    }
    return { ...item, status, throughput };
  });
  update(updated);
}
