
import React from "react";
import { useCanvasStore } from "../utils/store";

const templates = [
  { id: "constructor", name: "Constructor", desc: "Basic building" },
  { id: "smelter", name: "Smelter", desc: "Processes ore" },
  { id: "belt", name: "Conveyor Belt", desc: "Moves items" }
];

export default function StencilTray() {
  const addStencil = useCanvasStore((s) => s.addStencil);
  return (
    <aside className="w-56 h-full bg-neutral-800/80 border-r border-neutral-700 flex flex-col p-4">
      <div className="font-bold mb-4 text-blue-300">Stencils</div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {templates.map(stencil => (
          <button
            key={stencil.id}
            className="p-2 rounded bg-neutral-700 hover:bg-blue-600 transition-colors text-left shadow"
            onClick={() => addStencil(stencil)}
          >
            <div className="font-medium">{stencil.name}</div>
            {stencil.desc && <div className="text-xs text-neutral-400">{stencil.desc}</div>}
          </button>
        ))}
      </div>
    </aside>
  );
}
