import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './modules'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store
