import React from 'react';
import * as tf from '@tensorflow/tfjs';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface Props {
  model: tf.LayersModel;
  isDarkMode: boolean;
}

const ModelExport: React.FC<Props> = ({ model, isDarkMode }) => {
  const handleExport = async () => {
    try {
      // Save model in IndexedDB
      await model.save('indexeddb://my-model');
      
      // Export model weights as JSON
      const weights = await model.getWeights();
      const weightData = weights.map(w => ({
        name: w.name,
        shape: w.shape,
        data: Array.from(w.dataSync())
      }));
      
      const modelData = {
        config: model.getConfig(),
        weights: weightData
      };
      
      const blob = new Blob([JSON.stringify(modelData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'model.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting model:', error);
      alert('Error exporting model. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ArrowDownTrayIcon className="w-5 h-5 mr-2 text-primary-500" />
        Export Model
      </h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Export Options</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Model architecture (JSON)</li>
            <li>• Trained weights</li>
            <li>• Compatible with TensorFlow.js</li>
          </ul>
        </div>
        
        <button
          onClick={handleExport}
          className="w-full py-3 px-4 rounded-lg text-white font-medium bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-2">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Export Model</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ModelExport;