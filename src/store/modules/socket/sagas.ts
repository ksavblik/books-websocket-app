import { call, put, take, takeLatest } from 'redux-saga/effects';
import { CONNECT_WEBSOCKET_CLIENT, WebSocketMessagePayload } from './types';
import { connectWebSocketClientError, connectWebSocketClientSuccess, webSocketEvent } from './actions';
import { eventChannel } from 'redux-saga';

const webSocketChannel = () => eventChannel(emitter => {
  try {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL!);

    webSocket.addEventListener('open', event => {
      console.log('WebSocket open event', event);
      emitter(connectWebSocketClientSuccess(webSocket));
    });

    webSocket.addEventListener('message', event => {
      console.log('WebSocket message event', event);
      if (event.data) {
        try {
          const parsedEventData: WebSocketMessagePayload = JSON.parse(event?.data);
          emitter(webSocketEvent(parsedEventData));
        } catch (err: any) {
          console.error('Failed to parse event data from WebSocket');
        }
      }
    });

    webSocket.addEventListener('close', event => {
      console.log('WebSocket close event', event);
    });

    webSocket.addEventListener('error', event => {
      console.log('WebSocket error event', event);
    });

  } catch (err: any) {
    emitter(connectWebSocketClientError(err))
  }
  return () => {
    console.log('WebSocket EventChannel dismounted!')
  }
});

export function* webSocketSagas(): any {
  const channel = yield call(webSocketChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* generalSaga() {
  yield takeLatest(CONNECT_WEBSOCKET_CLIENT, webSocketSagas);
}
