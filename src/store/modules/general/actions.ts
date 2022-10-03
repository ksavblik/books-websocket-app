import { Book, CreateBook, ErrorDetails, UpdateBook } from '../../../types';
import { CreateBookAction, CreateBookErrorAction, CreateBookSuccessAction, CREATE_BOOK, CREATE_BOOK_ERROR, CREATE_BOOK_SUCCESS, DeleteBookAction, DeleteBookErrorAction, DeleteBookSuccessAction, DELETE_BOOK, DELETE_BOOK_ERROR, DELETE_BOOK_SUCCESS, GetBookAction, GetBookErrorAction, GetBooksAction, GetBooksErrorAction, GetBooksSuccessAction, GetBookSuccessAction, GET_BOOK, GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_SUCCESS, GET_BOOK_ERROR, GET_BOOK_SUCCESS, UpdateBookAction, UpdateBookErrorAction, UpdateBookSuccessAction, UPDATE_BOOK, UPDATE_BOOK_ERROR, UPDATE_BOOK_SUCCESS } from './types';

export const getBooks = (): GetBooksAction => ({
  type: GET_BOOKS,
});

export const getBooksSuccess = (payload: Book[]): GetBooksSuccessAction => ({
  type: GET_BOOKS_SUCCESS,
  payload,
});

export const getBooksError = (payload: ErrorDetails): GetBooksErrorAction => ({
  type: GET_BOOKS_ERROR,
  payload,
});

export const getBook = (payload: number): GetBookAction => ({
  type: GET_BOOK,
  payload,
});

export const getBookSuccess = (payload: Book): GetBookSuccessAction => ({
  type: GET_BOOK_SUCCESS,
  payload,
});

export const getBookError = (payload: ErrorDetails): GetBookErrorAction => ({
  type: GET_BOOK_ERROR,
  payload,
});

export const createBook = (payload: CreateBook): CreateBookAction => ({
  type: CREATE_BOOK,
  payload,
});

export const createBookSuccess = (payload: Book): CreateBookSuccessAction => ({
  type: CREATE_BOOK_SUCCESS,
  payload,
});

export const createBookError = (payload: ErrorDetails): CreateBookErrorAction => ({
  type: CREATE_BOOK_ERROR,
  payload,
});

export const updateBook = (payload: { id: number; book: UpdateBook; }): UpdateBookAction => ({
  type: UPDATE_BOOK,
  payload,
});

export const updateBookSuccess = (payload: Book): UpdateBookSuccessAction => ({
  type: UPDATE_BOOK_SUCCESS,
  payload,
});

export const updateBookError = (payload: ErrorDetails): UpdateBookErrorAction => ({
  type: UPDATE_BOOK_ERROR,
  payload,
});

export const deleteBook = (payload: number): DeleteBookAction => ({
  type: DELETE_BOOK,
  payload,
});

export const deleteBookSuccess = (payload: number): DeleteBookSuccessAction => ({
  type: DELETE_BOOK_SUCCESS,
  payload,
});

export const deleteBookError = (payload: ErrorDetails): DeleteBookErrorAction => ({
  type: DELETE_BOOK_ERROR,
  payload,
});

export default {
  getBooksSuccess,
  getBooksError,
  getBooks,
  getBookSuccess,
  getBookError,
  getBook,
  createBookSuccess,
  createBookError,
  createBook,
  updateBookSuccess,
  updateBookError,
  updateBook,
  deleteBookSuccess,
  deleteBookError,
  deleteBook,
};