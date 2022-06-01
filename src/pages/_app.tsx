import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigateSetter } from '../components/NavigateSetter'
import { Page } from '../components/Page'
import { SceneAnimator } from '../components/SceneAnimator'
import { Snackbar } from '../components/Snackbar'
import { persistor, store } from '../store'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <>
      <NavigateSetter />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Page>
            <SceneAnimator sceneKey={router.route}>
              <Component {...pageProps} />
            </SceneAnimator>

            <Snackbar />
          </Page>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
