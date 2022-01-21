import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import React, { useMemo, useState } from 'react';

import { StorageKey, ThemeMode } from 'model';

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
      contrastText: '#fff',
      dark: '#444',
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
      contrastText: '#000',
      dark: '#bbb',
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

export const ThemeModeContext = React.createContext({
  themeMode: ThemeMode.Dark,
  toggleThemeMode: () => {},
});

const ThemeApp: React.FC = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem(StorageKey.ThemeMode) as ThemeMode) || ThemeMode.Dark
  );
  const themeMode = useMemo(
    () => ({
      themeMode: mode,
      toggleThemeMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
          localStorage.setItem(StorageKey.ThemeMode, mode);

          return mode;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => (mode === ThemeMode.Dark ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeApp;
