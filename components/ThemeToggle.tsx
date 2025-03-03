import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 p-4 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;