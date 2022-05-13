import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from './router'
import { persistor, store } from './store'

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <Router />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  )
}
