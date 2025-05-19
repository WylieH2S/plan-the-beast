export function simulate(items, connections) {
  const state = {};
  const incoming = {};

  items.forEach(item => {
    state[item.id] = { satisfied: item.role === "output", reason: "init", errors: [], ai: item.ai || {} };
    incoming[item.id] = [];
  });

  connections.forEach(link => {
    if (state[link.to]) incoming[link.to].push(link.from);
    if (link.from === link.to) {
      state[link.to].errors.push("self_loop");
      state[link.to].reason = "invalid_self_connection";
    }
  });

  let updated = true;
  while (updated) {
    updated = false;
    items.forEach(item => {
      if (item.role === "input") {
        const sources = incoming[item.id] || [];
        const satisfied = sources.some(id => state[id]?.satisfied);
        if (satisfied && !state[item.id].satisfied) {
          state[item.id].satisfied = true;
          state[item.id].reason = "valid_input";
          updated = true;
        }
      }
    });
  }

  return state;
}
