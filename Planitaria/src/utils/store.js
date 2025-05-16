
import create from "zustand";

let id = 1;

export const useCanvasStore = create((set) => ({
  stencils: [],
  selectedId: null,
  addStencil: (template) => set((state) => ({
    stencils: [
      ...state.stencils,
      {
        ...template,
        id: `${template.id}-${id++}`,
        x: 120 + Math.random()*120,
        y: 120 + Math.random()*120
      }
    ],
    selectedId: null
  })),
  moveStencil: (uid, x, y) => set((state) => ({
    stencils: state.stencils.map(st =>
      st.id === uid ? { ...st, x, y } : st
    )
  })),
  selectStencil: (id) => set({ selectedId: id }),
  deleteSelected: () => set((state) => ({
    stencils: state.stencils.filter(st => st.id !== state.selectedId),
    selectedId: null
  })),
  clearStencils: () => set({ stencils: [], selectedId: null })
}));
