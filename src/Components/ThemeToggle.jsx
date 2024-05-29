import React from 'react';
import { Switch } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch isChecked={theme === 'dark'} onChange={toggleTheme} />
  );
};

export default ThemeToggle;
