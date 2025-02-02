import React, { useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

interface Props {
  setDataset: (dataset: { xs: tf.Tensor, ys: tf.Tensor } | null) => void;
  selectedTask: 'classification' | 'regression';
  isDarkMode: boolean;
}

const DatasetUpload: React.FC<Props> = ({ setDataset, selectedTask, isDarkMode }) => {
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split('\n').filter(row => row.trim());
      const data = rows.map(row => row.split(',').map(Number));
      
      // Assume last column is the target
      const features = data.map(row => row.slice(0, -1));
      const labels = data.map(row => row.slice(-1)[0]);

      const xs = tf.tensor2d(features);
      const ys = selectedTask === 'classification' 
        ? tf.oneHot(tf.tensor1d(labels, 'int32'), Math.max(...labels) + 1)
        : tf.tensor2d(labels.map(l => [l]));

      setDataset({ xs, ys });
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please ensure it\'s a valid CSV with numeric values.');
    }
  }, [setDataset, selectedTask]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CloudArrowUpIcon className="w-5 h-5 mr-2 text-primary-500" />
        Dataset Upload
      </h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dataset Requirements</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• CSV format with numeric values</li>
            <li>• Last column should be the target variable</li>
            <li>• For classification: target should be integer class labels</li>
            <li>• For regression: target should be continuous values</li>
          </ul>
        </div>
        
        <div className="relative">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors duration-200"
          >
            <div className="text-center">
              <CloudArrowUpIcon className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Click to upload your dataset
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                CSV files only
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DatasetUpload;