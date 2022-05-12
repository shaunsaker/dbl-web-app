import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Home } from '../pages/Home'
import { Invoice } from '../pages/Invoice'
import { Profile } from '../pages/Profile'
import { ReserveTickets } from '../pages/ReserveTickets'
import { Result } from '../pages/Result'
import { Results } from '../pages/Results'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Tickets } from '../pages/Tickets'
import { Welcome } from '../pages/Welcome'
import { RouteKey } from './models'

// TODO: SS auth, onboarding, etc
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`/${RouteKey.forgotPassword}/:email`}
          element={<ForgotPassword />}
        />
        <Route
          path={`/${RouteKey.invoice}/:lotId/:invoiceId`}
          element={<Invoice />}
        />
        <Route path={`/${RouteKey.profile}`} element={<Profile />} />
        <Route
          path={`/${RouteKey.reserveTickets}`}
          element={<ReserveTickets />}
        />
        <Route path={`/${RouteKey.result}/:lotId`} element={<Result />} />
        <Route path={`/${RouteKey.results}`} element={<Results />} />
        <Route path={`/${RouteKey.signIn}`} element={<SignIn />} />
        <Route path={`/${RouteKey.signUp}`} element={<SignUp />} />
        <Route path={`/${RouteKey.tickets}/:lotId`} element={<Tickets />} />
        <Route path={`/${RouteKey.welcome}`} element={<Welcome />} />
        <Route path={`/${RouteKey.tickets}/:lotId`} element={<Tickets />} />

        {/* TODO: not found route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
