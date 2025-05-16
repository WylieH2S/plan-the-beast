import create from 'zustand';

export const useStore = create((set) => ({
  canvas: {
    zoom: 1,
    pan: { x: 0, y: 0 },
    stencils: [],
  },
  layers: [1, 2],
  activeLayer: 1,
  setActiveLayer: (layer) => set((state) => ({ activeLayer: layer })),
  addStencil: (stencil) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        stencils: [...state.canvas.stencils, stencil],
      },
    })),
  setZoom: (zoom) => set((state) => ({ canvas: { ...state.canvas, zoom } })),
  setPan: (pan) => set((state) => ({ canvas: { ...state.canvas, pan } })),
}));
