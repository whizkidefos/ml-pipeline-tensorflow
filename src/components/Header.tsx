import React from 'react';
import { BeakerIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  selectedTask,
  setSelectedTask,
  isTraining
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BeakerIcon className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MLOps Pipeline</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Task Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Task:</span>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value as 'classification' | 'regression')}
                className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                disabled={isTraining}
              >
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sub Header with Stats */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-3">
            <div className="flex space-x-8">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ChartBarIcon className="w-5 h-5 mr-1.5" />
                <span>Task: {selectedTask}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CpuChipIcon className="w-5 h-5 mr-1.5" />
                <span>Status: {isTraining ? 'Training' : 'Ready'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
