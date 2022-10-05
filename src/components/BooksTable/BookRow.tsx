import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { Book } from '../../types';

export interface BookRowProps {
  book: Book;
}

export const BookRow: FC<BookRowProps> = ({ book }) => {
  const { id, title, author, price, publishDate, updatedAt, createdAt } = book;
  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    </TableRow>
  );
};

export default BookRow;