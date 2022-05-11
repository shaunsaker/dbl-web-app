import { InvoiceId } from '../store/invoices/models'
import { LotId } from '../store/lots/models'

export enum RouteKeys {
  welcome = 'Welcome',
  onboarding = 'Onboarding',
  signUp = 'Sign Up',
  signIn = 'Sign In',
  forgotPassword = 'Forgot Password',
  drawer = 'Drawer',
  home = 'Home',
  reserveTickets = 'Reserve Tickets',
  invoice = 'Invoice',
  tickets = 'Tickets',
  results = 'Results',
  result = 'Result',
  winner = 'Winner',
  profile = 'Profile',
}

export type RouteStackParamList = {
  [RouteKeys.welcome]: undefined
  [RouteKeys.onboarding]: undefined
  [RouteKeys.signUp]: undefined
  [RouteKeys.signIn]: undefined
  [RouteKeys.forgotPassword]: { email: string }
  [RouteKeys.drawer]: undefined
  [RouteKeys.home]: undefined
  [RouteKeys.reserveTickets]: undefined
  [RouteKeys.invoice]: {
    lotId: LotId
    invoiceId: InvoiceId
  }
  [RouteKeys.tickets]: {
    lotId: LotId
  }
  [RouteKeys.results]: undefined
  [RouteKeys.result]: {
    lotId: LotId
  }
  [RouteKeys.winner]: {
    lotId: LotId
  }
  [RouteKeys.profile]: undefined
}
