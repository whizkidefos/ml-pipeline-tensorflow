import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { SunIcon, MoonIcon, BeakerIcon, CloudArrowUpIcon, DocumentChartBarIcon } from '@heroicons/react/24/solid';
import ModelTraining from './components/ModelTraining';
import ModelMetrics from './components/ModelMetrics';
import ThemeToggle from './components/ThemeToggle';
import ModelExport from './components/ModelExport';
import DatasetUpload from './components/DatasetUpload';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [metrics, setMetrics] = useState<Array<{ epoch: number, loss: number, accuracy: number }>>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [dataset, setDataset] = useState<{ xs: tf.Tensor, ys: tf.Tensor } | null>(null);
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
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <BeakerIcon className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block ml-3">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">MLOps Pipeline</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Real-time ML Training & Deployment</p>
              </div>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="flex items-center space-x-2 sm:hidden">
              <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex items-center space-x-4">
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value as 'classification' | 'regression')}
                className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </select>
              <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden pb-3`}>
            <div className="pt-2 pb-3 space-y-1">
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value as 'classification' | 'regression')}
                className="w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Machine Learning Pipeline</h2>
          <p className="text-gray-600 dark:text-gray-400">Train, evaluate, and deploy machine learning models in real-time using TensorFlow.js</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              <DatasetUpload 
                setDataset={setDataset} 
                selectedTask={selectedTask}
                isDarkMode={isDarkMode}
              />
              <ModelTraining 
                setModel={setModel}
                setMetrics={setMetrics}
                isTraining={isTraining}
                setIsTraining={setIsTraining}
                dataset={dataset}
                selectedTask={selectedTask}
              />
            </div>
          </div>
          <div>
            <ModelMetrics metrics={metrics} isDarkMode={isDarkMode} />
          </div>
        </div>

        {model && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <DocumentChartBarIcon className="w-5 h-5 mr-2 text-primary-500" />
                Model Summary
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {JSON.stringify(model.getConfig(), null, 2)}
                </pre>
              </div>
            </div>
            <ModelExport model={model} isDarkMode={isDarkMode} />
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About MLOps Pipeline</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A powerful platform for training and deploying machine learning models directly in your browser using TensorFlow.js.
                Perfect for prototyping, experimentation, and educational purposes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Real-time model training</li>
                <li>• Interactive visualizations</li>
                <li>• Custom dataset upload</li>
                <li>• Model export capabilities</li>
                <li>• Classification & regression support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.tensorflow.org/js" target="_blank" rel="noopener noreferrer" 
                     className="text-primary-600 dark:text-primary-400 hover:underline">
                    TensorFlow.js Documentation
                  </a>
                </li>
                <li>
                  <a href="https://www.tensorflow.org/js/tutorials" target="_blank" rel="noopener noreferrer"
                     className="text-primary-600 dark:text-primary-400 hover:underline">
                    ML Tutorials
                  </a>
                </li>
                <li>
                  <a href="https://github.com/tensorflow/tfjs-examples" target="_blank" rel="noopener noreferrer"
                     className="text-primary-600 dark:text-primary-400 hover:underline">
                    Example Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Built with TensorFlow.js, React, and Tailwind CSS. Open source and free to use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;