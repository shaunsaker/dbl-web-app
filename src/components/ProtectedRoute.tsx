import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectHasUserSignedUp,
  selectIsAuthenticated,
} from '../store/auth/selectors'
import { selectHasCompletedOnboarding } from '../store/onboarding/selectors'
import { RoutePath } from '../router/models'
import { navigate } from '../store/navigation/actions'

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
        ? RoutePath.welcome
        : hasSignedUp
        ? RoutePath.signIn
        : RoutePath.signUp

      dispatch(navigate({ route, replace: true }))
    }
  }, [dispatch, isAuthenticated, hasSignedUp, hasCompletedOnboarding])

  if (!isAuthenticated) {
    return null
  }

  return children
}
