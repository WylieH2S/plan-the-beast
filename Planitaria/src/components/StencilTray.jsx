
import React from "react";

export default function StencilTray({ stencils = [] }) {
  return (
    <aside className="w-56 h-full bg-neutral-800/80 border-r border-neutral-700 flex flex-col p-4">
      <div className="font-bold mb-4 text-blue-300">Stencils</div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {stencils.length === 0 && <div className="text-neutral-500">No stencils loaded.</div>}
        {stencils.map(stencil => (
          <button
            key={stencil.id}
            className="p-2 rounded bg-neutral-700 hover:bg-blue-600 transition-colors text-left shadow"
          >
            <div className="font-medium">{stencil.name}</div>
            {stencil.desc && <div className="text-xs text-neutral-400">{stencil.desc}</div>}
          </button>
        ))}
      </div>
    </aside>
  );
}
