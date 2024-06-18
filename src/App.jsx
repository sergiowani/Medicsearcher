import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeContextProvider>
  );
};

export default App;