import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/themeContext';
import { AuthProvider } from './contexts/authContext';
import Router from './routes/Router';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
