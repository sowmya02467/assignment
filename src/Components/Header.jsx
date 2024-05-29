import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Box, Button } from '@chakra-ui/react';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p="4">
      <ThemeToggle />
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
};

export default Header;
