import React from 'react';
import * as tf from '@tensorflow/tfjs';
import { ModelTrainingProps, Metrics } from '../types';

const ModelTraining: React.FC<ModelTrainingProps> = ({
  setModel,
  setMetrics,
  isTraining,
  setIsTraining,
  dataset,
  selectedTask,
  modelConfig
}) => {
  const trainModel = async () => {
    if (!dataset) {
      console.error('No dataset provided');
      return;
    }

    try {
      setIsTraining(true);
      setMetrics([]);
      
      // Get input shape safely
      const inputShape = dataset.xs.shape;
      if (!inputShape || inputShape.length < 2) {
        throw new Error('Invalid input shape');
      }

      // Create a sequential model based on config
      const layers = [
        tf.layers.dense({
          inputShape: [inputShape[1]], // Get the feature dimension
          units: modelConfig.neuronsPerLayer,
          activation: modelConfig.activation
        })
      ];

      // Add hidden layers
      for (let i = 0; i < modelConfig.hiddenLayers - 1; i++) {
        layers.push(
          tf.layers.dense({
            units: modelConfig.neuronsPerLayer,
            activation: modelConfig.activation
          })
        );
      }

      // Add output layer
      const outputUnits = selectedTask === 'classification'
        ? (dataset.ys.shape[1] || 2) // Use actual number of classes or default to 2
        : 1;

      layers.push(
        tf.layers.dense({
          units: outputUnits,
          activation: selectedTask === 'classification' ? 'softmax' : 'linear'
        })
      );

      const model = tf.sequential({ layers });

      // Configure optimizer
      let optimizer;
      switch (modelConfig.optimizer) {
        case 'adam':
          optimizer = tf.train.adam(modelConfig.learningRate);
          break;
        case 'sgd':
          optimizer = tf.train.sgd(modelConfig.learningRate);
          break;
        case 'rmsprop':
          optimizer = tf.train.rmsprop(modelConfig.learningRate);
          break;
        default:
          optimizer = tf.train.adam(modelConfig.learningRate);
      }

      // Compile the model
      model.compile({
        optimizer,
        loss: selectedTask === 'classification' ? 'categoricalCrossentropy' : 'meanSquaredError',
        metrics: ['accuracy']
      });

      // Train the model
      await model.fit(dataset.xs, dataset.ys, {
        epochs: modelConfig.epochs,
        batchSize: modelConfig.batchSize,
        validationSplit: modelConfig.validationSplit,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (logs) {
              const newMetrics: Metrics = {
                epoch,
                loss: logs.loss,
                accuracy: logs.acc,
                valLoss: logs.val_loss,
                valAccuracy: logs.val_acc
              };
              setMetrics(prevMetrics => [...prevMetrics, newMetrics]);
            }
          }
        }
      });

      setModel(model);
    } catch (error) {
      console.error('Error during model training:', error);
      alert('Error during model training. Please check the console for details.');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Model Training</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Training Configuration</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Learning Rate: {modelConfig.learningRate}</li>
            <li>• Batch Size: {modelConfig.batchSize}</li>
            <li>• Epochs: {modelConfig.epochs}</li>
            <li>• Validation Split: {modelConfig.validationSplit * 100}%</li>
          </ul>
        </div>
        
        <button
          onClick={trainModel}
          disabled={isTraining || !dataset}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
            isTraining || !dataset
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
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
          ) : !dataset ? (
            'Upload Dataset First'
          ) : (
            'Train Model'
          )}
        </button>
      </div>
    </div>
  );
};

export default ModelTraining;