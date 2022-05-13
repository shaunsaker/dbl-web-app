import { SagaIterator } from 'redux-saga'
import { fork, takeLatest } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { Navigation } from '../../router/Navigation'
import { navigate, navigateBack } from './actions'

function* onNavigateBackFlow(): SagaIterator {
  yield takeLatest(navigateBack, function* (): SagaIterator {
    if (!Navigation.navigate) {
      return
    }

    Navigation.navigate(-1)
  })
}

function* onNavigateFlow(): SagaIterator {
  yield takeLatest(
    navigate,
    function* (action: ActionType<typeof navigate>): SagaIterator {
      console.log('HERE')
      if (!Navigation.navigate) {
        return
      }

      Navigation.navigate(action.payload)
    },
  )
}

export function* navigationFlow(): SagaIterator {
  yield fork(onNavigateBackFlow)
  yield fork(onNavigateFlow)
}
