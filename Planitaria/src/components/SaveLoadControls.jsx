import React from 'react';
import { useStore } from '@/utils/store';

const SaveLoadControls = () => {
  const store = useStore();

  const onSave = () => {
    const state = store.getState();
    const data = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      canvas: state.canvas,
      metadata: {
        readme: 'readme_Chloe.md',
        manifestHash: '<TODO hash>',
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planitaria-layout-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onLoad = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const data = JSON.parse(text);
    useStore.setState({ canvas: data.canvas });
  };

  return (
    <div className="flex space-x-2">
      <button onClick={onSave} className="p-2 rounded border">Save</button>
      <label className="p-2 rounded border cursor-pointer">
        Load
        <input type="file" accept=".json" onChange={onLoad} className="hidden" />
      </label>
    </div>
  );
};

export default SaveLoadControls;
