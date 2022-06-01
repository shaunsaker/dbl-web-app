import { fork, takeLatest } from '@redux-saga/core/effects'
import toast from 'react-hot-toast'
import { SagaIterator } from 'redux-saga'
import { ActionType } from 'typesafe-actions'
import { call } from '../../utils/call'
import { showSnackbar } from './actions'

function* onShowSnackbarFlow(): SagaIterator {
  yield takeLatest(
    showSnackbar,
    function* (action: ActionType<typeof showSnackbar>): SagaIterator {
      yield* call(toast, action.payload.title)
    },
  )
}

export function* snackbarsFlow(): SagaIterator {
  yield fork(onShowSnackbarFlow)
}
