import { SagaIterator } from 'redux-saga'
import { fork, put, take, takeEvery } from 'redux-saga/effects'
import { firebaseSyncStats } from '../../services/firebase/firestore/firebaseSyncStats'
import { call } from '../../utils/call'
import { errorSaga } from '../../utils/errorSaga'
import { signOut } from '../auth/actions'
import { navigateBack } from '../navigation/actions'
import { fetchStats } from './actions'
import { StatsData } from './models'

function* fetchStatsSaga(): SagaIterator {
  yield put(fetchStats.request())

  try {
    // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
    const channel = yield* call(firebaseSyncStats)

    yield takeEvery(channel, function* (stats: StatsData[]) {
      yield put(
        fetchStats.success({
          data: stats[0], // there should only be one active document
        }),
      )
    })

    // if the user closes the invoice or signs out, close the channel
    yield take([navigateBack, signOut.success])

    channel.close()
  } catch (error) {
    yield* call(errorSaga, error, fetchStats.failure)
  }
}

export function* statsFlow(): SagaIterator {
  yield fork(fetchStatsSaga)
}
