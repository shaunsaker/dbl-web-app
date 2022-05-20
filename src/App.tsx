import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CustomSnackbarProvider } from './components/CustomSnackbarProvider/CustomSnackbarProvider'
import { Router } from './router'
import { persistor, store } from './store'
import { getCssText } from './styles/stitches.config'

export const App = () => {
  return (
    <>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomSnackbarProvider>
            <Router />
          </CustomSnackbarProvider>
        </PersistGate>
      </Provider>
    </>
  )
}
