import { PersistGate, } from 'redux-persist/integration/react'
import { Provider, } from 'react-redux'
import React from 'react'

export default ({ store, persistor, loading, children, }) => (
  <Provider store={store}>
    <PersistGate loading={loading} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
)
