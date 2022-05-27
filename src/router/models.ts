export const emailParam = ':email'
export const lotIdParam = ':lotId'
export const invoiceIdParam = ':invoiceId'
export const pageParam = ':page'

export const RoutePath = {
  welcome: '/welcome',
  onboarding: `/onboarding/page/${pageParam}`,
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
