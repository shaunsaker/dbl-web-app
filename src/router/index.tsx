import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NavigateSetter } from '../components/NavigateSetter'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Home } from '../pages/Home'
import { Invoice } from '../pages/Invoice'
import { Onboarding } from '../pages/Onboarding'
import { Profile } from '../pages/Profile'
import { ReserveTickets } from '../pages/ReserveTickets'
import { Result } from '../pages/Result'
import { Results } from '../pages/Results'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Tickets } from '../pages/Tickets'
import { Welcome } from '../pages/Welcome'
import { Winner } from '../pages/Winner'
import {
  selectHasUserSignedUp,
  selectIsAuthenticated,
} from '../store/auth/selectors'
import { selectHasCompletedOnboarding } from '../store/onboarding/selectors'
import { RoutePath } from './models'

const getInitialRoute = ({
  isAuthenticated,
  hasSignedUp,
  hasCompletedOnboarding,
}: {
  isAuthenticated: boolean
  hasSignedUp: boolean
  hasCompletedOnboarding: boolean
}): string => {
  if (!hasCompletedOnboarding) {
    return RoutePath.welcome
  }

  if (!isAuthenticated) {
    if (hasSignedUp) {
      return RoutePath.signIn
    }

    return RoutePath.signUp
  }

  return RoutePath.home
}

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const hasSignedUp = useSelector(selectHasUserSignedUp)
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding)
  const initialRoute = getInitialRoute({
    isAuthenticated,
    hasSignedUp,
    hasCompletedOnboarding,
  })

  const authenticatedStack = (
    <>
      <Route path={RoutePath.home} element={<Home />} />
      <Route path={RoutePath.reserveTickets} element={<ReserveTickets />} />
      <Route path={RoutePath.invoice} element={<Invoice />} />
      <Route path={RoutePath.tickets} element={<Tickets />} />
      <Route path={RoutePath.results} element={<Results />} />
      <Route path={RoutePath.result} element={<Result />} />
      <Route path={RoutePath.profile} element={<Profile />} />
      <Route path={RoutePath.winner} element={<Winner />} />
    </>
  )

  return (
    <BrowserRouter>
      <NavigateSetter />

      <Routes>
        <Route path={RoutePath.welcome} element={<Welcome />} />
        <Route path={RoutePath.onboarding} element={<Onboarding />} />
        <Route path={RoutePath.signIn} element={<SignIn />} />
        <Route path={RoutePath.signUp} element={<SignUp />} />
        <Route path={RoutePath.forgotPassword} element={<ForgotPassword />} />

        {isAuthenticated && authenticatedStack}

        <Route path="*" element={<Navigate to={initialRoute} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
