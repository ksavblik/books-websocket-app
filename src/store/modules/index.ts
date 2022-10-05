import { combineReducers } from 'redux';
import general from './general';
import socket from './socket';
import { GeneralState } from './general/types';
import { SocketState } from './socket/types';

export interface ReduxState {
  general: GeneralState;
  socket: SocketState;
}

export default combineReducers({ general, socket });
