
import React from "react";
import { useCanvasStore } from "../utils/store";

export default function CanvasArea() {
  const stencils = useCanvasStore((s) => s.stencils);
  const moveStencil = useCanvasStore((s) => s.moveStencil);
  const selectedId = useCanvasStore((s) => s.selectedId);
  const selectStencil = useCanvasStore((s) => s.selectStencil);

  // Simple drag logic
  const dragInfo = React.useRef({});

  function onMouseDown(e, id) {
    e.stopPropagation();
    const stencil = stencils.find(st => st.id === id);
    if (!stencil) return;
    dragInfo.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: stencil.x,
      origY: stencil.y
    };
    selectStencil(id);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
  function onMouseMove(e) {
    const { id, startX, startY, origX, origY } = dragInfo.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    moveStencil(id, origX + dx, origY + dy);
  }
  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }
  function onCanvasClick() {
    selectStencil(null);
  }

  return (
    <main className="flex-1 bg-neutral-900 relative min-h-[600px] overflow-hidden" onClick={onCanvasClick}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-blue-950/40 to-green-900/20" />
      </div>
      {stencils.map((stencil) => (
        <div
          key={stencil.id}
          style={{
            position: "absolute",
            left: stencil.x,
            top: stencil.y,
            minWidth: 90,
            minHeight: 60,
            cursor: "grab",
            zIndex: 5
          }}
          className={
            "rounded-lg border-2 bg-neutral-800/90 shadow-lg flex flex-col items-center justify-center p-2 select-none transition-all hover:scale-105 " +
            (selectedId === stencil.id
              ? "border-yellow-400 ring-4 ring-yellow-200/60"
              : "border-blue-400")
          }
          onMouseDown={(e) => onMouseDown(e, stencil.id)}
          onClick={e => { e.stopPropagation(); selectStencil(stencil.id); }}
        >
          <div className="font-semibold text-blue-200">{stencil.name}</div>
          {stencil.desc && <div className="text-xs text-neutral-400">{stencil.desc}</div>}
        </div>
      ))}
      <div className="absolute bottom-4 right-8 z-10 text-neutral-500 text-xs opacity-60">
        Click stencils to add, drag to move, click to select. Delete with toolbar.
      </div>
    </main>
  );
}
