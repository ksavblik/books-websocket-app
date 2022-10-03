import { CONNECT_WEBSOCKET_CLIENT_SUCCESS, SocketReducerActions, SocketState } from "./types";

export const initialState: SocketState = {
  webSocket: null,
};

const socketReducer = (state: SocketState = initialState, action: SocketReducerActions): SocketState => {
  switch (action.type) {
    case CONNECT_WEBSOCKET_CLIENT_SUCCESS: {
      return {
        webSocket: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};