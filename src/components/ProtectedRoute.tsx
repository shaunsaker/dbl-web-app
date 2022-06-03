import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectHasUserSignedUp,
  selectIsAuthenticated,
} from '../store/auth/selectors'
import { selectHasCompletedOnboarding } from '../store/onboarding/selectors'
import { Routes } from '../router/models'
import { navigate } from '../store/navigation/actions'
import { LoadingModal } from './LoadingModal'

interface ProtectedRouteProps {
  children: ReactElement
}

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): ReactElement | null => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const hasSignedUp = useSelector(selectHasUserSignedUp)
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding)

  useEffect(() => {
    if (!isAuthenticated) {
      const route = !hasCompletedOnboarding
        ? Routes.welcome.path
        : hasSignedUp
        ? Routes.signIn.path
        : Routes.signUp.path

      dispatch(navigate({ route, replace: true }))
    }
  }, [dispatch, isAuthenticated, hasSignedUp, hasCompletedOnboarding])

  if (!isAuthenticated) {
    return <LoadingModal opaque>Checking authentication...</LoadingModal>
  }

  return children
}
