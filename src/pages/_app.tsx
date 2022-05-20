import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CustomSnackbarProvider } from '../components/CustomSnackbarProvider/CustomSnackbarProvider'
import { NavigateSetter } from '../components/NavigateSetter'
import { persistor, store } from '../store'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavigateSetter />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomSnackbarProvider>
            <Component {...pageProps} />
          </CustomSnackbarProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
