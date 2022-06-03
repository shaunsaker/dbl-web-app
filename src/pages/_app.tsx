import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigateSetter } from '../components/NavigateSetter'
import { Page } from '../components/Page'
import { Snackbar } from '../components/Snackbar'
import { persistor, store } from '../store'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavigateSetter />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Page>
            <Component {...pageProps} />
          </Page>

          <Snackbar />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
