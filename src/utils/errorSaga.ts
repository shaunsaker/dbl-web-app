import { put } from '@redux-saga/core/effects'
import { SagaIterator } from '@redux-saga/types'
import { sentry } from '../services/sentry'
import { showSnackbar } from '../store/snackbars/actions'
import { SnackbarType } from '../store/snackbars/models'
import { call } from './call'

// FIXME: type the action correctly
export function* errorSaga(error: unknown, action?: any): SagaIterator {
  if (error instanceof Error) {
    console.error(error)

    yield* call(sentry.captureException, error)

    if (action) {
      yield put(action(error))
    }

    yield put(
      showSnackbar({
        type: SnackbarType.error,
        title: error.message,
      }),
    )
  }
}
