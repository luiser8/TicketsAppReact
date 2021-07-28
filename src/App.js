import React, { useMemo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Home />
      </ThemeProvider>
  );
}

export default App;