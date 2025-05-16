import React, { useEffect } from 'react';
import { useStore } from '@/utils/store';

const TutorialPrompt = () => {
  const {
    tutorialSettings: { isFirstVisit, isTutorialEnabled },
    markTutorialSeen,
    toggleTutorial,
  } = useStore();

  useEffect(() => {
    if (isFirstVisit && isTutorialEnabled) {
      // Show prompt logic can be enhanced
      alert('Welcome to Planitaria! Would you like a tutorial?');
      markTutorialSeen();
    }
  }, [isFirstVisit, isTutorialEnabled, markTutorialSeen]);

  return (
    <div className="tutorial-prompt fixed bottom-4 left-4 bg-gray-800 p-4 text-white rounded">
      <p>Tutorial is {isTutorialEnabled ? 'enabled' : 'disabled'}.</p>
      <button onClick={toggleTutorial} className="mt-2 px-2 py-1 border rounded">
        {isTutorialEnabled ? 'Disable' : 'Enable'} Tutorial
      </button>
    </div>
  );
};

export default TutorialPrompt;
