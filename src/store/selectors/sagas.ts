import { ReduxState } from '../modules'

export const getBooks = (state: ReduxState) => state.general.books.list;

export default {
  getBooks,
};