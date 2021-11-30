import React from 'react';
import { createTheme } from '@mui/material/styles';
import { green, pink, grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#21521e',
    },
    secondary: pink,
    info: {
      main: '#ddd',
    },
    grey: {
      ...grey,
      800: '#1a1a1a',
      900: '#090909',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
});

const ThemeApp: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeApp;
