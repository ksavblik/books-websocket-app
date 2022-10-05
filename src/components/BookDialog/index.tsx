import { FC, useState, useMemo, useEffect } from 'react';
import {
  Alert,
  AlertTitle,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Collapse,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import Grid from '@mui/material/Grid';
import { DateTimePicker } from '@mui/x-date-pickers';

import dayjs from 'dayjs';

import Transition from '../Transition';

import { Book, CreateBook, UpdateBook } from '../../types';

export interface BookDialogProps {
  open: boolean;
  onClose: () => void;
  book?: Book;
  createBook: (book: CreateBook) => void;
  updateBook: (payload: { id: number; book: UpdateBook; }) => void;
}

interface ButtonData {
  title: string;
  disabled: boolean;
  onClick?: () => void;
}

const initialBookState: () => Partial<Book> = () => ({
  title: '',
  author: '',
  price: '',
  publishDate: dayjs(),
});

const BookDialog: FC<BookDialogProps> = ({ open, onClose, book, createBook, updateBook }) => {
  const [bookData, setBookData] = useState<Partial<Book>>(initialBookState());
  const [showChangedBookAlert, setShowChangedBookAlert] = useState(false);

  useEffect(() => {
    if (bookData.updatedAt) {
      // this is the case when book got updated while user was editing it
      if (book?.updatedAt && bookData.updatedAt !== book.updatedAt) {
        setShowChangedBookAlert(true);
      }
      // case when the book got deleted but user was editing it
      if (!book?.updatedAt) {
        setBookData(prev => ({ ...prev, id: undefined, updatedAt: undefined }));
      }
    } else if (book?.updatedAt) {
      setBookData({ ...book });
    }
  }, [book?.updatedAt]);

  const updateBookTimestamp = () => {
    setShowChangedBookAlert(false);
    setBookData({ ...bookData, updatedAt: book?.updatedAt });
  };

  const updateBookData = () => {
    setShowChangedBookAlert(false);
    if (book) {
      setBookData({ ...bookData, ...book });
    }
  };

  const onInnerClose = () => {
    setBookData(initialBookState());
    onClose();
  };

  const onPublishDateChange = (publishDate: dayjs.Dayjs | null) => setBookData(prev => ({ ...prev, publishDate }));
  const onFieldChange = (fieldName: 'title' | 'author' | 'price') =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setBookData(prev => ({ ...prev, [fieldName]: value }));

  const { title, disabled, onClick }: ButtonData = useMemo(() => {
    const {
      id,
      title,
      author,
      price,
      publishDate,
      updatedAt,
    } = bookData;
    const acceptable = title && author;
    if (id && updatedAt) {
      return {
        title: 'Update',
        disabled: !acceptable,
        onClick: () => {
          updateBook({
            id,
            book: {
              id,
              title,
              author,
              price,
              publishDate,
              updatedAt,
            },
          });
          onInnerClose();
        },
      };
    }
    return {
      title: 'Create',
      disabled: !acceptable,
      onClick: () => {
        createBook({
          title: title!,
          author: author!,
          price,
          publishDate,
        });
        onInnerClose();
      },
    };
  }, [bookData]);

  const dialogTitle = book ? 'Update book' : 'Create book';

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onInnerClose}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={2} sx={{ p: 1 }}>
          <Grid item xs={6}>
             <TextField label="Title" variant="outlined" fullWidth required value={bookData.title} onChange={onFieldChange('title')} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Author" variant="outlined" fullWidth required value={bookData.author} onChange={onFieldChange('author')} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Price" variant="outlined" fullWidth value={bookData.price} onChange={onFieldChange('price')} />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              label="Publish date"
              value={bookData.publishDate}
              onChange={onPublishDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Collapse in={showChangedBookAlert} sx={{ mr: 'auto' }}>
          <Alert
            severity='warning'
            action={
              <>
                <IconButton onClick={updateBookTimestamp}>
                  <CancelIcon/>
                </IconButton>
                <IconButton onClick={updateBookData}>
                  <CheckIcon/>
                </IconButton>
              </>
            }
          >
            <AlertTitle>This book has been changed</AlertTitle>
            Do you wish to pull the new data?
          </Alert>
        </Collapse>
        <Button onClick={onInnerClose}>Cancel</Button>
        <Button onClick={onClick} disabled={disabled}>{title}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
