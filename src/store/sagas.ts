import { fork } from 'redux-saga/effects'
import { connectSaga } from '../utils/connectSaga'
import { select } from '../utils/typedSelect'
import { authFlow } from './auth/flow'
import { selectIsAuthenticated } from './auth/selectors'

import { snackbarsFlow } from './snackbars/flow'
import { createUserFlow, userProfileFlow } from './userProfile/flow'
import { lotsFlow } from './lots/flow'
import { btcRateFlow } from './btcRate/flow'
import { invoicesFlow } from './invoices/flow'
import { paymentsFlow } from './payments/flow'
import { navigationFlow } from './navigation/flow'

function* omnipresentFlows() {
  yield fork(authFlow)
  yield fork(createUserFlow) // user may not be authenticated in the store by this stage
  yield fork(navigationFlow)
  yield fork(snackbarsFlow)
}

function* authenticatedFlows() {
  const isAuthenticated = yield* select(selectIsAuthenticated)
  if (isAuthenticated) {
    yield fork(lotsFlow)
    yield fork(btcRateFlow)
    yield fork(invoicesFlow)
    yield fork(paymentsFlow)
    yield fork(userProfileFlow)
  }
}

function* rootSaga() {
  yield fork(omnipresentFlows)
  yield fork(() => connectSaga(selectIsAuthenticated, authenticatedFlows))
}

export default rootSaga
