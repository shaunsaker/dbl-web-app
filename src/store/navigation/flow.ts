import { SagaIterator } from 'redux-saga'
import { fork, takeLatest } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { Navigation } from '../../router/Navigation'
import { navigate, navigateBack } from './actions'

function* onNavigateBackFlow(): SagaIterator {
  yield takeLatest(navigateBack, function* (): SagaIterator {
    if (!Navigation.router) {
      return
    }

    Navigation.router.back()
  })
}

// TODO: SS replace is not working
function* onNavigateFlow(): SagaIterator {
  yield takeLatest(
    navigate,
    function* (action: ActionType<typeof navigate>): SagaIterator {
      if (!Navigation.router) {
        return
      }

      if (action.payload.replace) {
        Navigation.router.replace(action.payload.route)
      } else {
        Navigation.router.push(action.payload.route)
      }
    },
  )
}

export function* navigationFlow(): SagaIterator {
  yield fork(onNavigateBackFlow)
  yield fork(onNavigateFlow)
}
