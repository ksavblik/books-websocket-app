import React, { useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { Provider, useDispatch } from 'react-redux'

import store from './store'
import ProTip from './ProTip';
import theme from './theme';
import { connectWebSocketClient } from './store/modules/socket/actions';

const Copyright = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebSocketClient());
  }, []);

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App example with TypeScript
          </Typography>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  </Provider>
);

export default App;