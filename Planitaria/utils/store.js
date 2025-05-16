import create from 'zustand';

export const useStore = create((set) => ({
  canvas: {
    zoom: 1,
    pan: { x: 0, y: 0 },
    stencils: [],
  },
  setZoom: (zoom) => set((state) => ({ canvas: { ...state.canvas, zoom } })),
  setPan: (pan) => set((state) => ({ canvas: { ...state.canvas, pan } })),
  addStencil: (stencil) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        stencils: [...state.canvas.stencils, stencil],
      },
    })),
}));
