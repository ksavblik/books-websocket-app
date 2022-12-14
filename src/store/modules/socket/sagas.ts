import { call, delay, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { CONNECT_WEBSOCKET_CLIENT, WebSocketEventAction, WebSocketMessagePayload, WEBSOCKET_EVENT } from './types';
import { connectWebSocketClientError, connectWebSocketClientSuccess, eventCreatedBook, eventDeletedBook, eventUpdatedBook, removeBookUpdatedFlag, setBookDeletedFlag, webSocketEvent } from './actions';
import { eventChannel } from 'redux-saga';
import { getBooks } from '../../selectors/sagas';
import { Book } from '../../../types';

const webSocketChannel = () => eventChannel(emitter => {
  try {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL!);

    webSocket.addEventListener('open', () => {
      emitter(connectWebSocketClientSuccess(webSocket));
    });

    webSocket.addEventListener('message', event => {
      if (event.data) {
        try {
          const parsedEventData: WebSocketMessagePayload = JSON.parse(event?.data);
          emitter(webSocketEvent(parsedEventData));
        } catch (err: any) {
          console.error('Failed to parse event data from WebSocket');
        }
      }
    });

    webSocket.addEventListener('close', () => {
      console.log('Closed WebSocket connection!');
    });

    webSocket.addEventListener('error', () => {
      console.error('Error: Interrupted WebSocket connection!');
    });

  } catch (err: any) {
    emitter(connectWebSocketClientError(err))
  }
  return () => {}
});

export function* webSocketSagas(): any {
  const channel = yield call(webSocketChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* eventsHandler(action: WebSocketEventAction) {
  const { payload: { created, updated, deleted } } = action;

  const books: Book[] = yield select(getBooks);
  
  if (created) {
    yield put(eventCreatedBook({ ...created, updated: true }));
    yield delay(2000);
    yield put(removeBookUpdatedFlag(created.id));
  }

  if (updated) {
    const bookExists = books.some(({ id }) => updated.id === id);
    if (bookExists) {
      yield put(eventUpdatedBook({ ...updated, updated: true }));
    } else {
      yield put(eventCreatedBook({ ...updated, updated: true }));
    }
    yield delay(2000);
    yield put(removeBookUpdatedFlag(updated.id));
  }

  if (deleted) {
    yield put(setBookDeletedFlag(deleted));
    yield delay(1000);
    yield put(eventDeletedBook(deleted));
  }
}

export default function* generalSaga() {
  yield takeLatest(CONNECT_WEBSOCKET_CLIENT, webSocketSagas);
  yield takeEvery(WEBSOCKET_EVENT, eventsHandler);
}
