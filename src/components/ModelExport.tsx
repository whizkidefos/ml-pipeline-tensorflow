import React from 'react';
import * as tf from '@tensorflow/tfjs';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { ModelExportProps } from '../types';

const ModelExport: React.FC<ModelExportProps> = ({ model }) => {
  const handleExport = async () => {
    if (!model) return;

    try {
      // Save model in IndexedDB
      await model.save('indexeddb://my-model');
      
      // Export model weights as JSON
      const weights = model.getWeights();
      const weightData = weights.map(w => ({
        shape: w.shape,
        data: Array.from(w.dataSync())
      }));
      
      const modelData = {
        config: model.toJSON(),
        weights: weightData,
        format: "layers-model",
        generatedBy: "TensorFlow.js tfjs-layers v" + tf.version.tfjs
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Model Export</h2>
      <button
        onClick={handleExport}
        disabled={!model}
        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium ${
          model
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        <span>Export Model</span>
      </button>
      {!model && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Train a model first to enable export
        </p>
      )}
    </div>
  );
};

export default ModelExport;