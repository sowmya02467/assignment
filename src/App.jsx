import React from 'react';
import Header from './Components/Header';
import { ThemeProvider } from '@emotion/react';
import AppRoutes from './routes';

const App = () => (
  <ThemeProvider>
    <AppRoutes>
        <Header />
    </AppRoutes>
  </ThemeProvider>
);

export default App;
