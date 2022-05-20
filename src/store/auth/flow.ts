import { SagaIterator } from 'redux-saga'
import { fork, put, takeLatest } from 'redux-saga/effects'
import { ActionType, getType } from 'typesafe-actions'
import { RoutePath } from '../../router/models'
import { firebaseResetPassword } from '../../services/firebase/auth/firebaseResetPassword'
import { firebaseSignIn } from '../../services/firebase/auth/firebaseSignIn'
import { firebaseSignOut } from '../../services/firebase/auth/firebaseSignOut'
import { firebaseSignup } from '../../services/firebase/auth/firebaseSignUp'
import { call } from '../../utils/call'
import { errorSaga } from '../../utils/errorSaga'
import { navigate } from '../navigation/actions'
import { showSnackbar } from '../snackbars/actions'
import { SnackbarType } from '../snackbars/models'
import { resetPassword, signIn, signOut, signUp } from './actions'

export function* signUpSaga(): SagaIterator {
  yield takeLatest(
    getType(signUp.request),
    function* (action: ActionType<typeof signUp.request>): SagaIterator {
      try {
        const user = yield* call(firebaseSignup, action.payload)

        yield put(signUp.success({ user, username: action.payload.username }))

        yield put(navigate({ route: RoutePath.home }))

        yield put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'You were signed up succesfully.',
          }),
        )
      } catch (error) {
        yield* call(errorSaga, error, signUp.failure)
      }
    },
  )
}

export function* signInSaga(): SagaIterator {
  yield takeLatest(
    getType(signIn.request),
    function* (action: ActionType<typeof signIn.request>): SagaIterator {
      try {
        const user = yield* call(firebaseSignIn, action.payload)

        yield put(signIn.success(user))

        yield put(navigate({ route: RoutePath.home }))

        yield put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'You were signed in succesfully.',
          }),
        )
      } catch (error) {
        yield* call(errorSaga, error, signIn.failure)
      }
    },
  )
}

export function* resetPasswordSaga(): SagaIterator {
  yield takeLatest(
    getType(resetPassword.request),
    function* (action: ActionType<typeof resetPassword.request>): SagaIterator {
      try {
        yield* call(firebaseResetPassword, action.payload)

        yield put(resetPassword.success())

        yield put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'We sent you a password reset email succesfully.',
          }),
        )
      } catch (error) {
        yield* call(errorSaga, error, resetPassword.failure)
      }
    },
  )
}

export function* signOutSaga(): SagaIterator {
  yield takeLatest(getType(signOut.request), function* (): SagaIterator {
    try {
      yield* call(firebaseSignOut)

      yield put(signOut.success())

      yield put(navigate({ route: RoutePath.signIn }))

      yield put(
        showSnackbar({
          type: SnackbarType.success,
          title: 'You were signed out succesfully.',
        }),
      )
    } catch (error) {
      yield* call(errorSaga, error, signOut.failure)
    }
  })
}

export function* authFlow(): SagaIterator {
  yield fork(signUpSaga)
  yield fork(signInSaga)
  yield fork(resetPasswordSaga)
  yield fork(signOutSaga)
}
