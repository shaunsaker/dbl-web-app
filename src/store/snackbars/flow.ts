import { fork, takeLatest } from '@redux-saga/core/effects'
import { SagaIterator } from 'redux-saga'
import { call } from '../../utils/call'
import { showSnackbar } from './actions'

function* onShowSnackbarFlow(): SagaIterator {
  yield takeLatest(showSnackbar, function* (): SagaIterator {
    // TODO: replace react-native-notifier
    yield* call(() => {})
  })
}

export function* snackbarsFlow(): SagaIterator {
  yield fork(onShowSnackbarFlow)
}
