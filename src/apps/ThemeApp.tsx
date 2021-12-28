import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import React, { useMemo, useState } from 'react';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#02ca52',
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
  spacing: (factor: number | 'auto') => (factor === 'auto' ? 'auto' : `${0.25 * factor}rem`),
  typography: {
    fontFamily: 'Kanit, sans-serif',
  },
});

const lightTheme = createTheme(baseTheme, {
  palette: {
    secondary: {
      main: '#000',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
    background: {
      paper: '#fff',
      default: '#ddd',
    },
  },
});

const darkTheme = createTheme(baseTheme, {
  palette: {
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
  },
});

const ThemeModeContext = React.createContext({ toggleColorMode: () => {} });

const ThemeApp: React.FC = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'dark');
  const themeMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    []
  );

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeApp;
