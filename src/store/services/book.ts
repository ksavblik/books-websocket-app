import api from './api';
import { Book, CreateBook, UpdateBook } from '../../types';

const getBooks = async (): Promise<Book[]> => {
  const url = 'books';
  const { data } = await api.get<Book[]>(url);
  return data;
}

const getBook = async (id: number): Promise<Book> => {
  const url = `book/${id}`;
  const { data } = await api.get<Book>(url);
  return data;
}

const createBook = async (book: CreateBook): Promise<Book> => {
  const url = 'book';
  const { data } = await api.post<Book>(url, book);
  return data;
}

const updateBook = async (id: number, book: UpdateBook): Promise<Book> => {
  const url = `book/${id}`;
  const { data } = await api.patch<Book>(url, book);
  return data;
}

const deleteBook = async (id: number): Promise<number> => {
  const url = `book/${id}`;
  await api.delete(url);
  return id;
}

export default {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};