import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CustomSnackbarProvider } from '../components/CustomSnackbarProvider/CustomSnackbarProvider'
import { NavigateSetter } from '../components/NavigateSetter'
import { Page } from '../components/Page'
import { SceneAnimator } from '../components/SceneAnimator'
import { persistor, store } from '../store'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <>
      <NavigateSetter />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomSnackbarProvider>
            <Page>
              <SceneAnimator sceneKey={router.route}>
                <Component {...pageProps} />
              </SceneAnimator>
            </Page>
          </CustomSnackbarProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
