
import React from "react";

export default function Toolbar() {
  return (
    <header className="w-full h-16 bg-neutral-900/80 border-b border-neutral-700 flex items-center px-8 justify-between shadow">
      <div className="text-2xl font-bold tracking-wide text-blue-200">Planitaria</div>
      <nav className="flex gap-4">
        <button className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-500 transition">
          Save
        </button>
        <button className="px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-500 transition">
          Load
        </button>
        <button className="px-4 py-2 rounded bg-neutral-700 text-white font-semibold hover:bg-neutral-600 transition">
          Settings
        </button>
      </nav>
    </header>
  );
}
