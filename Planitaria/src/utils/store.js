import create from 'zustand';

export const useStore = create((set) => ({
  // existing state...
  tutorialSettings: {
    isFirstVisit: true,
    isTutorialEnabled: true,
  },
  markTutorialSeen: () => set((state) => ({
    tutorialSettings: {
      ...state.tutorialSettings,
      isFirstVisit: false,
    }
  })),
  toggleTutorial: () => set((state) => ({
    tutorialSettings: {
      ...state.tutorialSettings,
      isTutorialEnabled: !state.tutorialSettings.isTutorialEnabled
    }
  })),
  // other state...
}));
