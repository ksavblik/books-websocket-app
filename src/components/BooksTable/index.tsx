import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import BookRow from './BookRow';

import { Book } from '../../types';

export interface BooksTableProps {
  books: Book[];
}

export const BooksTable: FC<BooksTableProps> = ({ books }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='center'>Title</TableCell>
            <TableCell align='center'>Author</TableCell>
            <TableCell align='center'>Price</TableCell>
            <TableCell align='center'>Publish date</TableCell>
            <TableCell align='center'>Updated at</TableCell>
            <TableCell align='center'>Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (<BookRow key={book.id} book={book} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BooksTable;