import { FC, forwardRef, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

const BookDialog: FC<BookDialogProps> = ({ open, onClose, book, createBook, updateBook }) => {

  const [bookData, setBookData] = useState<Partial<Book>>({
    title: '',
    author: '',
    price: '',
    publishDate: dayjs(),
  });

  const onPublishDateChange = (publishDate: dayjs.Dayjs | null) => setBookData(prev => ({ ...prev, publishDate }));
  const onFieldChange = (fieldName: 'title' | 'author' | 'price') =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setBookData(prev => ({ ...prev, [fieldName]: value }));

  const { title, disabled, onClick }: ButtonData = useMemo(() => {
    const acceptable = bookData.title && bookData.author;
    if (bookData.id && bookData.updatedAt) {
      const { id, updatedAt } = bookData;
      return {
        title: 'Update',
        disabled: !acceptable,
        onClick: () => {
          updateBook({
            id,
            book: {
              id,
              title: bookData.title,
              author: bookData.author,
              price: bookData.price,
              publishDate: bookData.publishDate,
              updatedAt,
            },
          });
          onClose();
        },
      };
    }
    return {
      title: 'Create',
      disabled: !acceptable,
      onClick: () => {
        createBook({
          title: bookData.title!,
          author: bookData.author!,
          price: bookData.price,
          publishDate: bookData.publishDate,
        });
        onClose();
      },
    };
  }, [bookData]);

  const dialogTitle = book ? 'Update book' : 'Create book';

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
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
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClick} disabled={disabled}>{title}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
