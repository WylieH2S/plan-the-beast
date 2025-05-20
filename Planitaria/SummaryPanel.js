import React from "https://esm.sh/react@18.2.0";

export function SummaryPanel({ items }) {
  const counts = { input: 0, logic: 0, output: 0, ok: 0, starved: 0, clogged: 0 };
  let totalThroughput = 0;

  for (const item of items) {
    if (item.role) counts[item.role] += 1;
    if (item.status) counts[item.status] += 1;
    if (typeof item.throughput === "number") totalThroughput += item.throughput;
  }

  const avgThroughput = items.length > 0 ? Math.round(totalThroughput / items.length) : 0;

  return React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 10,
      right: 10,
      width: "200px",
      background: "#222",
      color: "#fff",
      border: "1px solid #444",
      padding: "10px",
      zIndex: 20,
      fontSize: "13px"
    }
  }, [
    React.createElement("div", {}, `Inputs: ${counts.input}`),
    React.createElement("div", {}, `Logic: ${counts.logic}`),
    React.createElement("div", {}, `Outputs: ${counts.output}`),
    React.createElement("hr", { style: { margin: "8px 0" } }),
    React.createElement("div", {}, `OK: ${counts.ok}`),
    React.createElement("div", {}, `Starved: ${counts.starved}`),
    React.createElement("div", {}, `Clogged: ${counts.clogged}`),
    React.createElement("hr", { style: { margin: "8px 0" } }),
    React.createElement("div", {}, `Avg Throughput: ${avgThroughput}%`)
  ]);
}
