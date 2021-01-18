import React from 'react';
import {ThemeProvider, CssBaseline} from '@material-ui/core'
import Routes from './routes'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
