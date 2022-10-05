import { FC, useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Button, Paper, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

import BooksTable from '../BooksTable';
import LoadingIconButton from '../LoadingIconButton';

import { connectWebSocketClient } from '../../store/modules/socket/actions';

import { ReduxState } from '../../store/modules';
import { createBook, deleteBook, getBooks, updateBook } from '../../store/modules/general/actions';
import { useRef } from 'react';
import BookDialog from '../BookDialog';
import { Book } from '../../types';
import ConfirmDialog from '../DeleteBookDialog';

const connector = connect(
  (state: ReduxState) => ({
    books: state.general.books.list,
    booksAreLoading: state.general.books.areLoading,
    booksAreLoaded: state.general.books.areLoaded,
  }),
  {
    loadBooks: getBooks,
    initWebSocket: connectWebSocketClient,
    onCreateBook: createBook,
    onUpdateBook: updateBook,
    onDeleteBook: deleteBook,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

const MainPage: FC<ReduxProps> = ({ books, booksAreLoaded, booksAreLoading, loadBooks, initWebSocket, onCreateBook, onUpdateBook, onDeleteBook }) => {
  const [success, setSuccess] = useState(false);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showDeleteBookDialog, setShowDeleteBookDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
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

  const onSelectBook = useCallback((book: Book) => {
    setSelectedBook(book);
    setShowBookDialog(true);
  }, []);

  const onClickDelete = useCallback((book: Book) => {
    setSelectedBook(book);
    setShowDeleteBookDialog(true);
  }, []);

  const onClickConfirmDelete = useCallback(() => {
    setShowDeleteBookDialog(false);
    if (selectedBook) {
      onDeleteBook(selectedBook.id);
    }
  }, [selectedBook]);

  const onCloseBookDialog = useCallback(() => setShowBookDialog(false), []);
  const onCloseDeleteDialog = useCallback(() => setShowDeleteBookDialog(false), [])

  return (
    <Box>
      <Paper sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
        <Typography mr='auto' variant='h6' whiteSpace='nowrap'>
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
        <Button onClick={() => setShowBookDialog(true)}>
          <Typography variant='body2' sx={{ mr: 1 }}>
            Add book
          </Typography>
          <AddIcon />
        </Button>
      </Paper>
      <BooksTable books={books} onSelectBook={onSelectBook} onClickDelete={onClickDelete} />
      <BookDialog
        open={showBookDialog}
        onClose={onCloseBookDialog}
        createBook={onCreateBook}
        updateBook={onUpdateBook}
        book={selectedBook}
      />
      <ConfirmDialog
        open={showDeleteBookDialog}
        onClose={onCloseDeleteDialog}
        onConfirm={onClickConfirmDelete}
        title='Confirm delete'
      >
        <Typography>
          Are you sure you want to delete the <b>{selectedBook?.title}</b> book with id <b>{selectedBook?.id}</b>
        </Typography>
      </ConfirmDialog>
    </Box>
  );
};

export default connector(MainPage);