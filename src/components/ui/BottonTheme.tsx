import { FaSun, FaMoon } from 'react-icons/fa';
import { useState } from 'react';

export const BottonTheme = ({ funTheme }: { funTheme: () => void }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
    funTheme();
  };

  return (
    <button
      onClick={handleClick}
      className='p-2 rounded-full bg-gray-300 dark:bg-gray-800 transition-colors duration-300'
    >
      {isDarkMode ? (
        <FaSun className='text-yellow-500 transition-transform duration-300 transform hover:scale-110' />
      ) : (
        <FaMoon className='text-blue-500 transition-transform duration-300 transform hover:scale-110' />
      )}
    </button>
  );
};