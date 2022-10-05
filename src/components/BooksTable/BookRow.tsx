import { TableCell, TableRow } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { FC } from 'react';
import { Book } from '../../types';

export interface BookRowProps {
  book: Book;
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

export const BookRow: FC<BookRowProps> = ({ book }) => {
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
    </TableRow>
  );
};

export default BookRow;