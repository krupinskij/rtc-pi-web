import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import React from 'react';

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
      secondary: '#fff',
    },
    background: {
      paper: '#131313',
      default: '#050505',
    },
    success: {
      main: '#00b448',
    },
    info: {
      main: '#43b7e5',
    },
    error: {
      main: '#e54343',
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
