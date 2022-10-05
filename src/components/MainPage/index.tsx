import { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import BooksTable from '../BooksTable';
import LoadingIconButton from '../LoadingIconButton';

import { connectWebSocketClient } from '../../store/modules/socket/actions';

import { ReduxState } from '../../store/modules';
import { getBooks } from '../../store/modules/general/actions';
import { useRef } from 'react';

const connector = connect(
  (state: ReduxState) => ({
    books: state.general.books.list,
    booksAreLoading: state.general.books.areLoading,
    booksAreLoaded: state.general.books.areLoaded,
  }),
  {
    loadBooks: getBooks,
    initWebSocket: connectWebSocketClient,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

const MainPage: FC<ReduxProps> = ({ books, booksAreLoaded, booksAreLoading, loadBooks, initWebSocket }) => {
  const [success, setSuccess] = useState(false);
  const successClearTimer = useRef<number | null>(null);

  useEffect(() => {
    initWebSocket();
    loadBooks();
    return () => {
      if (successClearTimer.current) {
        clearTimeout(successClearTimer.current);
        successClearTimer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (booksAreLoaded) {
      setSuccess(true);
      successClearTimer.current = window.setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  }, [booksAreLoaded]);

  return (
    <Box>
      <Paper sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
        <Typography mr='75%' variant='h6'>
          Books Catalog
        </Typography>
        <LoadingIconButton
          onClick={loadBooks}
          isLoaded={success}
          isLoading={booksAreLoading}
          disabled={booksAreLoading}
          title='Refresh'
          actionIcon={<RefreshIcon />}
        />
      </Paper>
      <BooksTable books={books} />
    </Box>
  );
};

export default connector(MainPage);