
import React from "react";

export default function CanvasArea() {
  return (
    <main className="flex-1 bg-neutral-900 flex items-center justify-center">
      <div className="border-2 border-dashed border-blue-300 rounded-lg w-full h-full min-h-[500px] min-w-[600px] flex items-center justify-center opacity-80">
        <span className="text-neutral-500">[Canvas workspace will appear here]</span>
      </div>
    </main>
  );
}
