import { CREATE_BOOK_SUCCESS, DELETE_BOOK_SUCCESS, GeneralReducerActions, GeneralState, GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_SUCCESS, UPDATE_BOOK_SUCCESS } from './types';

export const initialState: GeneralState = {
  books: {
    areLoaded: false,
    areLoading: false,
    list: [],
  },
};

const generalReducer = (state: GeneralState = initialState, action: GeneralReducerActions): GeneralState => {
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
    case CREATE_BOOK_SUCCESS: {
      return {
        ...state,
        books: {
          ...state.books,
          list: [...state.books.list, action.payload],
        }
      };
    }
    case UPDATE_BOOK_SUCCESS: {
      const list = state.books.list.filter(({ id }) => id !== action.payload.id);
      return {
        ...state,
        books: {
          ...state.books,
          list: [...list, action.payload],
        },
      };
    }
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
    default: {
      return state;
    }
  }
};

export default generalReducer;