import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CreateBookAction, CREATE_BOOK, DeleteBookAction, DELETE_BOOK, GetBookAction, GET_BOOK, GET_BOOKS, UpdateBookAction, UPDATE_BOOK } from './types';
import bookService from '../../services/book';
import { createBookError, createBookSuccess, deleteBookError, deleteBookSuccess, getBookError, getBooksError, getBooksSuccess, getBookSuccess, updateBookError, updateBookSuccess } from './actions';
import { Book } from '../../../types';

export function* getBooks() {
  try {
    const books: Book[] = yield call(bookService.getBooks);
    yield put(getBooksSuccess(books));
  } catch (err: any) {
    yield put(getBooksError(err));
  }
}

export function* getBook(action: GetBookAction) {
  try {
    const book: Book = yield call(bookService.getBook, action.payload);
    yield put(getBookSuccess(book));
  } catch (err: any) {
    yield put(getBookError(err));
  }
}

export function* createBook(action: CreateBookAction) {
  try {
    const book: Book = yield call(bookService.createBook, action.payload);
    yield put(createBookSuccess(book));
  } catch (err: any) {
    yield put(createBookError(err));
  }
}

export function* updateBook(action: UpdateBookAction) {
  try {
    const book: Book = yield call(bookService.updateBook, action.payload.id, action.payload.book);
    yield put(updateBookSuccess(book));
  } catch (err: any) {
    yield put(updateBookError(err));
  }
}

export function* deleteBook(action: DeleteBookAction) {
  try {
    const id: number = yield call(bookService.deleteBook, action.payload);
    yield put(deleteBookSuccess(id));
  } catch (err: any) {
    yield put(deleteBookError(err));
  }
}

export default function* generalSaga() {
  yield takeLatest(GET_BOOKS, getBooks);
  yield takeEvery(GET_BOOK, getBook);
  yield takeEvery(CREATE_BOOK, createBook);
  yield takeEvery(UPDATE_BOOK, updateBook);
  yield takeEvery(DELETE_BOOK, deleteBook);
}
