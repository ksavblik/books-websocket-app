import 'react-redux';
import { GeneralState } from '../store/modules/general/types';
import { SocketState } from '../store/modules/socket/types';

declare module 'react-redux' {
  export interface DefaultRootState {
    general: GeneralState;
    socket: SocketState;
  }
}
