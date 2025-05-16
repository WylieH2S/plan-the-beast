import create from 'zustand';

export const useStore = create((set) => ({
  // ...existing state...
  panelSettings: {
    safeZone: { top: 20, right: 20, bottom: 20, left: 20 },
    visiblePanels: ['Statistics', 'OverlaySettings'],
    preset: 'default',
  },
  setSafeZone: (safeZone) => set((state) => ({ panelSettings: { ...state.panelSettings, safeZone } })),
  togglePanel: (panel) =>
    set((state) => {
      const { visiblePanels } = state.panelSettings;
      return {
        panelSettings: {
          ...state.panelSettings,
          visiblePanels: visiblePanels.includes(panel)
            ? visiblePanels.filter((p) => p !== panel)
            : [...visiblePanels, panel],
        },
      };
    }),
  resetLayout: () =>
    set((state) => ({
      panelSettings: {
        safeZone: { top: 20, right: 20, bottom: 20, left: 20 },
        visiblePanels: ['Statistics', 'OverlaySettings'],
        preset: 'default',
      },
    })),
  setLayoutPreset: (preset) =>
    set((state) => ({ panelSettings: { ...state.panelSettings, preset } })),
}));
