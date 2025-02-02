import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ModelMetricsProps, Metrics } from '../types';

const ModelMetrics: React.FC<ModelMetricsProps> = ({ metrics, isTraining }) => {
  const latest = metrics[metrics.length - 1] || { epoch: 0, loss: 0, accuracy: 0, valLoss: 0, valAccuracy: 0 };
  
  const metricsData = [
    { metric: 'Loss', value: latest.loss },
    { metric: 'Accuracy', value: latest.accuracy },
    { metric: 'Val Loss', value: latest.valLoss || 0 },
    { metric: 'Val Accuracy', value: latest.valAccuracy || 0 },
  ];

  // Transform metrics for radar chart
  const radarData = [
    { metric: 'Accuracy', value: latest.accuracy },
    { metric: 'Loss', value: Math.min(1, latest.loss) }, // Normalize loss to 0-1
    { metric: 'Val Accuracy', value: latest.valAccuracy || 0 },
    { metric: 'Val Loss', value: Math.min(1, latest.valLoss || 0) }, // Normalize val loss to 0-1
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Model Metrics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke={isTraining ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="epoch"
                stroke={isTraining ? '#9ca3af' : '#4b5563'}
              />
              <YAxis 
                stroke={isTraining ? '#9ca3af' : '#4b5563'}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isTraining ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  color: isTraining ? '#ffffff' : '#000000',
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
              {metrics[0]?.valLoss !== undefined && (
                <Line type="monotone" dataKey="valLoss" stroke="#f97316" />
              )}
              {metrics[0]?.valAccuracy !== undefined && (
                <Line type="monotone" dataKey="valAccuracy" stroke="#3b82f6" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 1]} />
              <Radar name="Metrics" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {metricsData.map(({ metric, value }) => (
          <div key={metric} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric}</h3>
            <p className="mt-1 text-lg font-semibold dark:text-white">
              {value.toFixed(4)}
            </p>
          </div>
        ))}
      </div>

      {isTraining && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Training in progress...</span>
        </div>
      )}
    </div>
  );
};

export default ModelMetrics;