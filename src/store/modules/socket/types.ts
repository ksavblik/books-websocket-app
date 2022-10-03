import { Book, ErrorDetails } from "../../../types";

export interface SocketState {
  webSocket: WebSocket | null;
}

export const CONNECT_WEBSOCKET_CLIENT = 'CONNECT_WEBSOCKET_CLIENT';
export interface ConnectWebSocketClientAction {
  type: typeof CONNECT_WEBSOCKET_CLIENT;
}

export const CONNECT_WEBSOCKET_CLIENT_SUCCESS = 'CONNECT_WEBSOCKET_CLIENT_SUCCESS';
export interface ConnectWebSocketClientSuccessAction {
  type: typeof CONNECT_WEBSOCKET_CLIENT_SUCCESS;
  payload: WebSocket;
}

export const CONNECT_WEBSOCKET_CLIENT_ERROR = 'CONNECT_WEBSOCKET_CLIENT_ERROR';
export interface ConnectWebSocketClientErrorAction {
  type: typeof CONNECT_WEBSOCKET_CLIENT_ERROR;
  payload: ErrorDetails;
}

export interface WebSocketMessagePayload {
  created?: Book;
  updated?: Book;
  deleted?: number;
}

export const WEBSOCKET_EVENT = 'WEBSOCKET_EVENT';
export interface WebSocketEventAction {
  type: typeof WEBSOCKET_EVENT;
  payload: WebSocketMessagePayload;
}

export const EVENT_CREATED_BOOK = 'EVENT_CREATED_BOOK';
export interface EventCreatedBookAction {
  type: typeof EVENT_CREATED_BOOK;
  payload: Book;
}

export const EVENT_UPDATED_BOOK = 'EVENT_UPDATED_BOOK';
export interface EventUpdatedBookAction {
  type: typeof EVENT_UPDATED_BOOK;
  payload: Book;
}

export const EVENT_DELETED_BOOK = 'EVENT_DELETED_BOOK';
export interface EventDeletedBookAction {
  type: typeof EVENT_DELETED_BOOK;
  payload: number;
}

export type SocketReducerActions =
  | ConnectWebSocketClientAction
  | ConnectWebSocketClientErrorAction
  | ConnectWebSocketClientSuccessAction
  | WebSocketEventAction
  | EventCreatedBookAction
  | EventUpdatedBookAction
  | EventDeletedBookAction;