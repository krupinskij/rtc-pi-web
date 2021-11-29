import React from 'react';
import { createTheme } from '@mui/material/styles';
import { green, pink } from '@mui/material/colors';
import { ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: green,
    secondary: pink,
  },
});

const ThemeApp: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeApp;
