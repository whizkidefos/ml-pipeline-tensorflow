import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

interface Props {
  metrics: Array<{ epoch: number; loss: number; accuracy: number }>;
  isDarkMode: boolean;
}

const ModelMetrics: React.FC<Props> = ({ metrics, isDarkMode }) => {
  // Transform metrics for radar chart
  const getLatestMetrics = () => {
    if (metrics.length === 0) return [];
    const latest = metrics[metrics.length - 1];
    return [
      { metric: 'Accuracy', value: latest.accuracy },
      { metric: 'Loss', value: latest.loss },
      { metric: 'Val Accuracy', value: latest.val_accuracy || 0 },
      { metric: 'Val Loss', value: latest.val_loss || 0 },
    ];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Training Metrics</h2>
      {metrics.length > 0 ? (
        <div className="space-y-8">
          <div className="w-full h-[400px]">
            <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Training Progress</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metrics}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="epoch"
                  stroke={isDarkMode ? '#9ca3af' : '#4b5563'}
                  label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke={isDarkMode ? '#9ca3af' : '#4b5563'}
                  label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: isDarkMode ? '#ffffff' : '#000000',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="loss" 
                  name="Loss"
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  name="Accuracy"
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full h-[400px]">
            <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Latest Metrics Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" data={getLatestMetrics()}>
                <PolarGrid stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: isDarkMode ? '#9ca3af' : '#4b5563' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 1]}
                  tick={{ fill: isDarkMode ? '#9ca3af' : '#4b5563' }}
                />
                <Radar
                  name="Metrics"
                  dataKey="value"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: isDarkMode ? '#ffffff' : '#000000',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">No metrics available yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start training to see the results</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelMetrics;