import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MainPage from './components/MainPage';
import store from './store'
import theme from './theme';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <MainPage />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);

export default App;