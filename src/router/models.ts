import { InvoiceId } from '../store/invoices/models'
import { LotId } from '../store/lots/models'

export const emailParam = ':email'
export const lotIdParam = ':lotId'
export const invoiceIdParam = ':invocieId'

export const RoutePath = {
  welcome: '/welcome',
  onboarding: '/onboarding',
  signUp: '/sign-up',
  signIn: '/sign-in',
  forgotPassword: `/forgot-password/${emailParam}`,
  drawer: '/drawer',
  home: '/',
  reserveTickets: '/reserve-tickets',
  invoice: `/invoice/${lotIdParam}/${invoiceIdParam}`,
  tickets: `/tickets/${lotIdParam}`,
  results: '/results',
  result: `/result/${lotIdParam}`,
  winner: `/winner/${lotIdParam}`,
  profile: '/profile',
}

export type RouteParams = {
  forgotPassword: { email: string }
  invoice: {
    lotId: LotId
    invoiceId: InvoiceId
  }
  tickets: {
    lotId: LotId
  }
  result: {
    lotId: LotId
  }
  winner: {
    lotId: LotId
  }
}
