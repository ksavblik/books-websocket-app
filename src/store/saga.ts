import { all, fork } from 'redux-saga/effects'
import generalSaga from './modules/general/sagas'
import socket from './modules/socket/sagas'

export default function* rootSaga() {
  yield all([fork(generalSaga), fork(socket)])
}
