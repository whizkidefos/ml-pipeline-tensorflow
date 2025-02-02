import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { SunIcon, MoonIcon, BeakerIcon, CloudArrowUpIcon, DocumentChartBarIcon } from '@heroicons/react/24/solid';
import ModelTraining from './components/ModelTraining';
import ModelMetrics from './components/ModelMetrics';
import ThemeToggle from './components/ThemeToggle';
import ModelExport from './components/ModelExport';
import DatasetUpload from './components/DatasetUpload';
import { Dataset, Metrics } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [selectedTask, setSelectedTask] = useState<'classification' | 'regression'>('classification');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <nav className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <BeakerIcon className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MLOps Pipeline</span>
              </div>
              <div className="flex items-center">
                <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-1">
                <DatasetUpload
                  setDataset={setDataset}
                  selectedTask={selectedTask}
                  isDarkMode={isDarkMode}
                />
              </div>
              
              <div className="col-span-1">
                <ModelTraining
                  setModel={setModel}
                  setMetrics={setMetrics}
                  isTraining={isTraining}
                  setIsTraining={setIsTraining}
                  dataset={dataset}
                  selectedTask={selectedTask}
                />
              </div>

              <div className="col-span-1">
                <ModelExport
                  model={model}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <ModelMetrics
                  metrics={metrics}
                  isTraining={isTraining}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;