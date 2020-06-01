import { applyMiddleware, compose, createStore, } from 'redux'
import { isPersistActive, persistConfig, } from './_reduxPersist/persistConfig'
import { persistReducer, persistStore, } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware, } from 'redux-saga-thunk'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [ thunkMiddleware, ]
  const enhancers = []

  /* ------------- Saga Middleware ------------- */
  let composeEnhancers = compose

  if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)
  // middleware.push(GraphQLClient.middleware())

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(composeEnhancers(applyMiddleware(...middleware)))

  /* ------------- createStore ------------- */

  const store = createStore(
    isPersistActive
      ? persistReducer(persistConfig, rootReducer)
      : rootReducer,
    compose(...enhancers)
  )

  const persistor = isPersistActive
    ? persistStore(store)
    : null

  // kick off root saga
  // sagaMiddleware.run(rootSaga, getFirebase)
  sagaMiddleware.run(rootSaga)

  return { store, persistor, }
}
