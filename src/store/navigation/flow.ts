import { SagaIterator } from 'redux-saga'
import { fork, takeLatest } from 'redux-saga/effects'
import { navigate, navigateBack } from './actions'

// TODO: SS fix navigation
function* onNavigateBackFlow(): SagaIterator {
  yield takeLatest(navigateBack, function* (): SagaIterator {})
}

function* onNavigateFlow(): SagaIterator {
  yield takeLatest(navigate, function* (): SagaIterator {})
}

export function* navigationFlow(): SagaIterator {
  yield fork(onNavigateBackFlow)
  yield fork(onNavigateFlow)
}
