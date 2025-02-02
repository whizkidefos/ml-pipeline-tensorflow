import React from 'react';
import { ModelConfigProps } from '../types';

const ModelConfig: React.FC<ModelConfigProps> = ({
  config,
  setConfig,
  selectedTask
}) => {
  const handleConfigChange = (key: string, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Model Configuration</h2>
      
      <div className="space-y-4">
        {/* Layer Configuration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hidden Layers
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={config.hiddenLayers}
            onChange={(e) => handleConfigChange('hiddenLayers', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Neurons per Layer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Neurons per Layer
          </label>
          <input
            type="number"
            min="1"
            max="128"
            value={config.neuronsPerLayer}
            onChange={(e) => handleConfigChange('neuronsPerLayer', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Learning Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Learning Rate
          </label>
          <select
            value={config.learningRate}
            onChange={(e) => handleConfigChange('learningRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="0.001">0.001</option>
            <option value="0.01">0.01</option>
            <option value="0.1">0.1</option>
          </select>
        </div>

        {/* Batch Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Batch Size
          </label>
          <select
            value={config.batchSize}
            onChange={(e) => handleConfigChange('batchSize', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
            <option value="128">128</option>
          </select>
        </div>

        {/* Activation Function */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Activation Function
          </label>
          <select
            value={config.activation}
            onChange={(e) => handleConfigChange('activation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="relu">ReLU</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="tanh">Tanh</option>
          </select>
        </div>

        {/* Optimizer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Optimizer
          </label>
          <select
            value={config.optimizer}
            onChange={(e) => handleConfigChange('optimizer', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="adam">Adam</option>
            <option value="sgd">SGD</option>
            <option value="rmsprop">RMSprop</option>
          </select>
        </div>

        {/* Validation Split */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Validation Split
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.1"
            value={config.validationSplit}
            onChange={(e) => handleConfigChange('validationSplit', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {(config.validationSplit * 100).toFixed(0)}% validation data
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelConfig;
