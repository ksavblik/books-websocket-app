import { combineReducers } from 'redux'
import general from './general'
import socket from './socket'

export default combineReducers({ general, socket })
