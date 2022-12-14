import { FC } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Book } from '../../types';

export interface BookRowProps {
  book: Book;
  onSelectBook: (book: Book) => void;
  onClickDelete: (book: Book) => void;
}

const getBgColor = (updated?: boolean, deleted?: boolean): string | null => {
  if (updated) {
    return blue[300];
  }
  if (deleted) {
    return red[300];
  }
  return null;
};

export const BookRow: FC<BookRowProps> = ({ book, onSelectBook, onClickDelete }) => {
  const { id, title, author, price, publishDate, updatedAt, createdAt, updated, deleted } = book;
  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 1s ease-in-out', bgcolor: getBgColor(updated, deleted) }}
    >
      <TableCell component='th' scope='row'>
        {id}
      </TableCell>
      <TableCell align='center'>{title}</TableCell>
      <TableCell align='center'>{author}</TableCell>
      <TableCell align='center'>{price}</TableCell>
      <TableCell align='center'>{publishDate?.toString()}</TableCell>
      <TableCell align='center'>{updatedAt.toString()}</TableCell>
      <TableCell align='center'>{createdAt.toString()}</TableCell>
      <IconButton onClick={() => onSelectBook(book)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onClickDelete(book)}>
        <DeleteIcon />
      </IconButton>
    </TableRow>
  );
};

export default BookRow;