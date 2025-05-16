
import create from "zustand";

let id = 1;

export const useCanvasStore = create((set) => ({
  stencils: [],
  addStencil: (template) => set((state) => ({
    stencils: [
      ...state.stencils,
      {
        ...template,
        id: `${template.id}-${id++}`,
        x: 120 + Math.random()*120,
        y: 120 + Math.random()*120
      }
    ]
  })),
  moveStencil: (uid, x, y) => set((state) => ({
    stencils: state.stencils.map(st => 
      st.id === uid ? { ...st, x, y } : st
    )
  })),
  clearStencils: () => set({ stencils: [] })
}));
