import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

const ThemeToggle: React.FC<Props> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </button>
  );
}

export default ThemeToggle;