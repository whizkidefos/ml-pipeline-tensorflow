import React from 'react';
import * as tf from '@tensorflow/tfjs';

interface Props {
  setModel: (model: tf.LayersModel) => void;
  setMetrics: (metrics: Array<{ epoch: number, loss: number, accuracy: number }>) => void;
  isTraining: boolean;
  setIsTraining: (isTraining: boolean) => void;
}

const ModelTraining: React.FC<Props> = ({ setModel, setMetrics, isTraining, setIsTraining }) => {
  const trainModel = async () => {
    setIsTraining(true);
    setMetrics([]);
    
    // Create a simple sequential model
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 2, activation: 'softmax' })
      ]
    });

    // Compile the model
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    // Generate some dummy data
    const xs = tf.randomNormal([100, 10]);
    const ys = tf.randomUniform([100, 2]);

    // Train the model
    await model.fit(xs, ys, {
      epochs: 10,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (logs) {
            setMetrics(prevMetrics => [...prevMetrics, {
              epoch,
              loss: logs.loss,
              accuracy: logs.acc
            }]);
          }
        }
      }
    });

    setModel(model);
    setIsTraining(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Model Training</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model Architecture</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Input Layer: 10 neurons</li>
            <li>• Hidden Layer 1: 32 neurons (ReLU)</li>
            <li>• Hidden Layer 2: 16 neurons (ReLU)</li>
            <li>• Output Layer: 2 neurons (Softmax)</li>
          </ul>
        </div>
        
        <button
          onClick={trainModel}
          disabled={isTraining}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
            isTraining
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isTraining ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Training Model...</span>
            </div>
          ) : (
            'Train Model'
          )}
        </button>
      </div>
    </div>
  );
}

export default ModelTraining;