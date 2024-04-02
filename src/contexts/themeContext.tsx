import { createContext } from 'react';
import { ThemeContextType } from '../types';
import useTheme from '../hooks/useTheme';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const themeContext = createContext<ThemeContextType>({} as ThemeContextType);

function ThemeProvider({ children }: Props) {
  const value = useTheme();

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}

export { ThemeProvider, themeContext };
