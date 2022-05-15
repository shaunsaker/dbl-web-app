import { fork, takeLatest } from '@redux-saga/core/effects'
import { SagaIterator } from 'redux-saga'
import { ActionType } from 'typesafe-actions'
import { showSnackbar } from './actions'
import { Snackbar } from './Snackbar'

function* onShowSnackbarFlow(): SagaIterator {
  yield takeLatest(
    showSnackbar,
    function* (action: ActionType<typeof showSnackbar>): SagaIterator {
      if (Snackbar.enqueueSnackbar) {
        Snackbar.enqueueSnackbar(action.payload.title, {
          variant: action.payload.type,
        })
      } else {
        console.error('No Snackbar provider.')
      }
    },
  )
}

export function* snackbarsFlow(): SagaIterator {
  yield fork(onShowSnackbarFlow)
}
