import { InvoiceId } from '../store/invoices/models'
import { LotId } from '../store/lots/models'

export const emailParam = ':email'
export const lotIdParam = ':lotId'
export const invoiceIdParam = ':invoiceId'
export const pageParam = ':page'

export const RoutePath = {
  welcome: '/welcome',
  onboarding: '/onboarding',
  signUp: '/sign-up',
  signIn: '/sign-in',
  forgotPassword: `/forgot-password/email/${emailParam}`,
  drawer: '/drawer',
  home: '/',
  reserveTickets: '/reserve-tickets',
  invoice: `/invoice/lot/${lotIdParam}/invoice/${invoiceIdParam}`,
  tickets: `/tickets/lot/${lotIdParam}`,
  results: `/results/page/${pageParam}`,
  result: `/result/lot/${lotIdParam}`,
  winner: `/winner/lot/${lotIdParam}`,
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
  results: {
    page: string
  }
  result: {
    lotId: LotId
  }
  winner: {
    lotId: LotId
  }
}
