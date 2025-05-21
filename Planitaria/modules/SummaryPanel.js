// [SummaryPanel.js] Displays total power and throughput
import React from "https://esm.sh/react@18.2.0";

export function SummaryPanel({ items }) {
  const totalPower = items.reduce((acc, it) => acc + (it.power || 0), 0);
  const totalThroughput = items.reduce((acc, it) => acc + (it.throughput || 0), 0);
  const alertCounts = items.reduce((acc, it) => {
    if (it.alert) {
      acc[it.alert] = (acc[it.alert] || 0) + 1;
    }
    return acc;
  }, {});
  const powerColor = totalPower < 0 ? "#f44" : totalPower === 0 ? "#aaa" : "#4f4";

  return React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 10,
      left: 10,
      padding: "10px",
      background: "#222",
      color: "#fff",
      borderRadius: "6px",
      border: "1px solid #555",
      fontSize: "13px",
      minWidth: "180px",
      boxShadow: "0 0 8px #000",
      zIndex: 10
    }
  }, [
    React.createElement("div", {
      key: "power",
      style: { color: powerColor, marginBottom: "6px" }
    }, `Net Power: ${totalPower} MW`),
    React.createElement("div", {
      key: "throughput",
      style: { color: "#0cf", marginBottom: "6px" }
    }, `Throughput: ${totalThroughput} / min`),
    React.createElement("div", {
      key: "alerts",
      style: { color: alertCounts.over_capacity ? "#f44" : alertCounts.missing_input ? "#ff0" : "#aaa" }
    }, `Alerts: ${alertCounts.over_capacity || 0} over capacity, ${alertCounts.missing_input || 0} missing inputs`)
  ]);
}
