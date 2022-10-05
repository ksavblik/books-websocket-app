import { GeneralReducerActions, GeneralState, CREATE_BOOK_SUCCESS, DELETE_BOOK_SUCCESS, GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_SUCCESS, UPDATE_BOOK_SUCCESS } from './types';
import { SocketReducerActions, EVENT_CREATED_BOOK, EVENT_DELETED_BOOK, EVENT_UPDATED_BOOK, REMOVE_BOOK_UPDATED_FLAG, SET_BOOK_DELETED_FLAG } from '../socket/types';

export const initialState: GeneralState = {
  books: {
    areLoaded: false,
    areLoading: false,
    list: [],
  },
};

const generalReducer = (state: GeneralState = initialState, action: GeneralReducerActions | SocketReducerActions): GeneralState => {
  switch (action.type) {
    case GET_BOOKS: {
      return {
        ...state,
        books: {
          ...state.books,
          areLoading: true,
          areLoaded: false,
        },
      };
    }
    case GET_BOOKS_SUCCESS: {
      return {
        ...state,
        books: {
          areLoaded: true,
          areLoading: false,
          list: action.payload,
        },
      };
    }
    case GET_BOOKS_ERROR: {
      return {
        ...state,
        books: {
          ...state.books,
          areLoaded: true,
          areLoading: false,
        },
      };
    }
    case EVENT_CREATED_BOOK:
    case CREATE_BOOK_SUCCESS: {
      if (state.books.list.some(({ id }) => action.payload.id === id)) {
        return state;
      }
      const list = [...state.books.list, { ...action.payload, updated: true }];
      return {
        ...state,
        books: {
          ...state.books,
          list,
        },
      };
    }
    case EVENT_UPDATED_BOOK:
    case UPDATE_BOOK_SUCCESS: {
      const list = state.books.list.map(book => book.id === action.payload.id ? action.payload : book);
      return {
        ...state,
        books: {
          ...state.books,
          list,
        },
      };
    }
    case EVENT_DELETED_BOOK:
    case DELETE_BOOK_SUCCESS: {
      const list = state.books.list.filter(({ id }) => id !== action.payload);
      return {
        ...state,
        books: {
          ...state.books,
          list,
        },
      };
    }
    case REMOVE_BOOK_UPDATED_FLAG: {
      const list = state.books.list.map(book => {
        if (book.updated && action.payload === book.id) {
          return { ...book, updated: false };
        }
        return book;
      });
      return {
        ...state,
        books: {
          ...state.books,
          list,
        },
      };
    }
    case SET_BOOK_DELETED_FLAG: {
      const list = state.books.list.map(book => {
        if (!book.deleted && action.payload === book.id) {
          return { ...book, deleted: true };
        }
        return book;
      });
      return {
        ...state,
        books: {
          ...state.books,
          list,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default generalReducer;