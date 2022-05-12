import { InvoiceId } from '../store/invoices/models'
import { LotId } from '../store/lots/models'

export enum RouteKey {
  welcome = 'welcome',
  onboarding = 'onboarding',
  signUp = 'sign-up',
  signIn = 'sign-in',
  forgotPassword = 'forgot-password',
  drawer = 'drawer',
  home = 'home',
  reserveTickets = 'reserve-tickets',
  invoice = 'invoice',
  tickets = 'tickets',
  results = 'results',
  result = 'result',
  winner = 'winner',
  profile = 'profile',
}

export type RouteParams = {
  [RouteKey.welcome]: undefined
  [RouteKey.onboarding]: undefined
  [RouteKey.signUp]: undefined
  [RouteKey.signIn]: undefined
  [RouteKey.forgotPassword]: { email: string }
  [RouteKey.drawer]: undefined
  [RouteKey.home]: undefined
  [RouteKey.reserveTickets]: undefined
  [RouteKey.invoice]: {
    lotId: LotId
    invoiceId: InvoiceId
  }
  [RouteKey.tickets]: {
    lotId: LotId
  }
  [RouteKey.results]: undefined
  [RouteKey.result]: {
    lotId: LotId
  }
  [RouteKey.winner]: {
    lotId: LotId
  }
  [RouteKey.profile]: undefined
}
