import { Book, CreateBook, ErrorDetails, UpdateBook } from '../../../types'

export interface GeneralState {
  books: {
    areLoading: boolean;
    areLoaded: boolean;
    list: Book[];
  }
}

export const GET_BOOKS = 'GET_BOOKS';
export interface GetBooksAction {
  type: typeof GET_BOOKS;
}

export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
export interface GetBooksSuccessAction {
  type: typeof GET_BOOKS_SUCCESS;
  payload: Book[];
}

export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';
export interface GetBooksErrorAction {
  type: typeof GET_BOOKS_ERROR;
  payload: ErrorDetails;
}

export const GET_BOOK = 'GET_BOOK';
export interface GetBookAction {
  type: typeof GET_BOOK;
  payload: number;
}

export const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS';
export interface GetBookSuccessAction {
  type: typeof GET_BOOK_SUCCESS;
  payload: Book;
}

export const GET_BOOK_ERROR = 'GET_BOOK_ERROR';
export interface GetBookErrorAction {
  type: typeof GET_BOOK_ERROR;
  payload: ErrorDetails;
}

export const CREATE_BOOK = 'CREATE_BOOK';
export interface CreateBookAction {
  type: typeof CREATE_BOOK;
  payload: CreateBook;
}

export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
export interface CreateBookSuccessAction {
  type: typeof CREATE_BOOK_SUCCESS;
  payload: Book;
}

export const CREATE_BOOK_ERROR = 'CREATE_BOOK_ERROR';
export interface CreateBookErrorAction {
  type: typeof CREATE_BOOK_ERROR;
  payload: ErrorDetails;
}

export const UPDATE_BOOK = 'UPDATE_BOOK';
export interface UpdateBookAction {
  type: typeof UPDATE_BOOK;
  payload: { id: number; book: UpdateBook };
}

export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export interface UpdateBookSuccessAction {
  type: typeof UPDATE_BOOK_SUCCESS;
  payload: Book;
}

export const UPDATE_BOOK_ERROR = 'UPDATE_BOOK_ERROR';
export interface UpdateBookErrorAction {
  type: typeof UPDATE_BOOK_ERROR;
  payload: ErrorDetails;
}

export const DELETE_BOOK = 'DELETE_BOOK';
export interface DeleteBookAction {
  type: typeof DELETE_BOOK;
  payload: number;
}

export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export interface DeleteBookSuccessAction {
  type: typeof DELETE_BOOK_SUCCESS;
  payload: number;
}

export const DELETE_BOOK_ERROR = 'DELETE_BOOK_ERROR';
export interface DeleteBookErrorAction {
  type: typeof DELETE_BOOK_ERROR;
  payload: ErrorDetails;
}

export type GeneralReducerActions =
  | GetBooksAction
  | GetBooksSuccessAction
  | GetBooksErrorAction
  | GetBookAction
  | GetBookSuccessAction
  | GetBookErrorAction
  | CreateBookAction
  | CreateBookSuccessAction
  | CreateBookErrorAction
  | UpdateBookAction
  | UpdateBookSuccessAction
  | UpdateBookErrorAction
  | DeleteBookAction
  | DeleteBookSuccessAction
  | DeleteBookErrorAction;