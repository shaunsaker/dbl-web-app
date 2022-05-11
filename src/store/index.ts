import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger'

import reducers, { ApplicationState } from './reducers'
import sagas from './sagas'

// add the middlewares
const middlewares = []

// add the saga middlewared
const sagaMiddleware = createSagaMiddleware()

middlewares.push(sagaMiddleware)

const isTesting = process.env.JEST_WORKER_ID
if (process.env.NODE_ENV === 'development' && !isTesting) {
  const loggerMiddleware = createLogger({ collapsed: true })

  middlewares.push(loggerMiddleware)
}

// apply the middleware
const middleware = applyMiddleware(...middlewares)

const persistConfig: PersistConfig<ApplicationState> = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
  // @ts-expect-error fixes https://github.com/rt2zz/redux-persist/issues/717
  timeout: null,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, middleware)

export const persistor = persistStore(store)

sagaMiddleware.run(sagas)
