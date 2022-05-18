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
  forgotPassword: `/forgot-password`,
  home: '/',
  reserveTickets: '/reserve-tickets',
  invoice: `/lot/${lotIdParam}/invoice/${invoiceIdParam}`,
  tickets: `/lot/${lotIdParam}/tickets`,
  results: `/results/page/${pageParam}`,
  result: `/lot/${lotIdParam}`,
  verifyResult: `/lot/${lotIdParam}/verify`,
  verifyResultCalculator: `/lot/${lotIdParam}/verify/calculator`,
  winner: `/lot/${lotIdParam}/winner`,
  profile: '/profile',
}

export type RouteParams = {
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
  verifyResult: {
    lotId: LotId
  }
  verifyResultCalculator: {
    lotId: LotId
  }
  winner: {
    lotId: LotId
  }
}
