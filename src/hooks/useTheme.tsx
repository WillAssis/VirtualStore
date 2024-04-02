import { useState, useEffect } from 'react';
import { ThemeContextType } from '../types';

function useTheme(): ThemeContextType {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const changeTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.className = nextTheme; // For CSS
    setTheme(nextTheme);
  };

  // Load saved theme
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (savedTheme) {
      const newTheme = savedTheme === 'dark' ? 'dark' : 'light';
      root.className = newTheme; // For CSS
      setTheme(newTheme);
    } else {
      const newTheme = userPrefersDark ? 'dark' : 'light';
      root.className = newTheme; // For CSS
      setTheme(newTheme);
    }
  }, []);

  return { theme, changeTheme };
}

export default useTheme;
