import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Header from './components/Header';
import ModelTraining from './components/ModelTraining';
import ModelMetrics from './components/ModelMetrics';
import ModelExport from './components/ModelExport';
import DatasetUpload from './components/DatasetUpload';
import ModelConfig from './components/ModelConfig';
import ModelArchitecture from './components/ModelArchitecture';
import { Dataset, Metrics, ModelConfig as IModelConfig } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [selectedTask, setSelectedTask] = useState<'classification' | 'regression'>('classification');
  const [modelConfig, setModelConfig] = useState<IModelConfig>({
    hiddenLayers: 2,
    neuronsPerLayer: 64,
    learningRate: 0.001,
    batchSize: 32,
    activation: 'relu',
    optimizer: 'adam',
    validationSplit: 0.2,
    epochs: 50
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          isTraining={isTraining}
        />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            {/* Top Row - Dataset Upload and Model Architecture */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <DatasetUpload
                  setDataset={setDataset}
                  selectedTask={selectedTask}
                />
                <ModelConfig
                  config={modelConfig}
                  setConfig={setModelConfig}
                  selectedTask={selectedTask}
                />
              </div>
              <ModelArchitecture
                config={modelConfig}
                selectedTask={selectedTask}
              />
            </div>

            {/* Middle Row - Training and Export */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ModelTraining
                  setModel={setModel}
                  setMetrics={setMetrics}
                  isTraining={isTraining}
                  setIsTraining={setIsTraining}
                  dataset={dataset}
                  selectedTask={selectedTask}
                  modelConfig={modelConfig}
                />
              </div>
              <ModelExport model={model} />
            </div>

            {/* Bottom Row - Metrics */}
            <div className="grid grid-cols-1">
              <ModelMetrics
                metrics={metrics}
                isTraining={isTraining}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Built with TensorFlow.js • React • Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;