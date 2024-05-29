import { createContext, useState, useContext, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark' && colorMode !== 'dark') {
      toggleColorMode();
    } else if (theme === 'light' && colorMode !== 'light') {
      toggleColorMode();
    }
    localStorage.setItem('theme', theme);
  }, [theme, colorMode, toggleColorMode]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
