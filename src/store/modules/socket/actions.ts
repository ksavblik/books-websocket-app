import { Book, ErrorDetails } from '../../../types';
import { ConnectWebSocketClientAction, ConnectWebSocketClientErrorAction, ConnectWebSocketClientSuccessAction, CONNECT_WEBSOCKET_CLIENT, CONNECT_WEBSOCKET_CLIENT_ERROR, CONNECT_WEBSOCKET_CLIENT_SUCCESS, EventCreatedBookAction, EventDeletedBookAction, EventUpdatedBookAction, EVENT_CREATED_BOOK, EVENT_DELETED_BOOK, EVENT_UPDATED_BOOK, WebSocketEventAction, WebSocketMessagePayload, WEBSOCKET_EVENT } from './types';

export const connectWebSocketClient = (): ConnectWebSocketClientAction => ({
  type: CONNECT_WEBSOCKET_CLIENT,
});

export const connectWebSocketClientSuccess = (payload: WebSocket): ConnectWebSocketClientSuccessAction => ({
  type: CONNECT_WEBSOCKET_CLIENT_SUCCESS,
  payload,
});

export const connectWebSocketClientError = (payload: ErrorDetails): ConnectWebSocketClientErrorAction => ({
  type: CONNECT_WEBSOCKET_CLIENT_ERROR,
  payload,
});

export const webSocketEvent = (payload: WebSocketMessagePayload): WebSocketEventAction => ({
  type: WEBSOCKET_EVENT,
  payload,
});

export const eventCreatedBook = (payload: Book): EventCreatedBookAction => ({
  type: EVENT_CREATED_BOOK,
  payload,
});

export const eventUpdatedBook = (payload: Book): EventUpdatedBookAction => ({
  type: EVENT_UPDATED_BOOK,
  payload,
});

export const eventDeletedBook = (payload: number): EventDeletedBookAction => ({
  type: EVENT_DELETED_BOOK,
  payload,
});

export default {
  connectWebSocketClient,
  connectWebSocketClientError,
  connectWebSocketClientSuccess,
  webSocketEvent,
  eventCreatedBook,
  eventUpdatedBook,
  eventDeletedBook,
};