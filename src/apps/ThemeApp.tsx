import React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#02ed60',
    },
    secondary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
    },
    background: {
      paper: '#1a1a1a',
      default: '#090909',
    },
    info: {
      main: '#ed6802',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: 'Kanit, sans-serif',
  },
});

const ThemeApp: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeApp;
