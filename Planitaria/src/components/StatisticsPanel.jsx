import React from 'react';
import { useStore } from '@/utils/store';

const StatisticsPanel = () => {
  const { stats } = useStore();

  return (
    <div className="stats-panel p-2 bg-gray-800 text-white absolute right-0 top-0 m-2 rounded shadow-lg">
      <h3 className="text-lg font-bold mb-2">Statistics</h3>
      <p>Power Draw: {stats.totalPower}</p>
      <p>Throughput: {stats.totalThroughput}</p>
    </div>
  );
};

export default StatisticsPanel;
