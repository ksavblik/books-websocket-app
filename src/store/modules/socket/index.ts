import { CONNECT_WEBSOCKET_CLIENT_SUCCESS, SocketReducerActions, SocketState } from './types';

export const initialState: SocketState = {
  webSocket: null,
  isConnected: false,
  isError: false,
  error: null,
};

const socketReducer = (state: SocketState = initialState, action: SocketReducerActions): SocketState => {
  switch (action.type) {
    case CONNECT_WEBSOCKET_CLIENT_SUCCESS: {
      return {
        webSocket: action.payload,
        isConnected: true,
        isError: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default socketReducer;