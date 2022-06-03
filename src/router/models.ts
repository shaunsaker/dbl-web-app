export const emailParam = ':email'
export const lotIdParam = ':lotId'
export const invoiceIdParam = ':invoiceId'
export const pageParam = ':page'

export const Routes: {
  [key: string]: {
    path: string
    title: string
    isDrawerRoute: boolean
    getDefaultPath?: () => string
    isRoute: (route: string) => boolean
  }
} = {
  welcome: {
    path: '/welcome',
    title: '',
    isDrawerRoute: false,
    isRoute: route => route === Routes.welcome.path,
  },
  onboarding: {
    path: `/onboarding/page/${pageParam}`,
    title: '',
    isDrawerRoute: false,
    getDefaultPath: () => '/onboarding/page/1',
    isRoute: route => route.includes('onboarding'),
  },
  signUp: {
    path: '/sign-up',
    title: 'Sign Up',
    isDrawerRoute: false,
    isRoute: route => route === Routes.signUp.path,
  },
  signIn: {
    path: '/sign-in',
    title: 'Sign In',
    isDrawerRoute: false,
    isRoute: route => route === Routes.signIn.path,
  },
  forgotPassword: {
    path: '/forgot-password',
    title: 'Forgot Password',
    isDrawerRoute: false,
    isRoute: route => route === Routes.forgotPassword.path,
  },
  home: {
    path: '/',
    title: 'Dashboard',
    isDrawerRoute: true,
    isRoute: route => route === Routes.home.path,
  },
  reserveTickets: {
    path: '/reserve-tickets',
    title: 'Reserve Tickets',
    isDrawerRoute: false,
    isRoute: route => route === Routes.reserveTickets.path,
  },
  invoice: {
    path: `/lot/${lotIdParam}/invoice/${invoiceIdParam}`,
    title: 'Invoice',
    isDrawerRoute: false,
    isRoute: route => route.includes('invoice'),
  },
  tickets: {
    path: `/lot/${lotIdParam}/tickets`,
    title: 'Tickets',
    isDrawerRoute: false,
    isRoute: route => route.includes('tickets'),
  },
  results: {
    path: `/results/page/${pageParam}`,
    title: 'Results',
    isDrawerRoute: true,
    getDefaultPath: () => '/results/page/1',
    isRoute: route => route.includes('results'),
  },
  result: {
    path: `/lot/${lotIdParam}`,
    title: 'Result',
    isDrawerRoute: false,
    isRoute: route =>
      route.includes('lot') &&
      !(
        Routes.invoice.isRoute(route) ||
        Routes.tickets.isRoute(route) ||
        Routes.verifyResult.isRoute(route) ||
        Routes.verifyResultCalculator.isRoute(route) ||
        Routes.winner.isRoute(route)
      ),
  },
  verifyResult: {
    path: `/lot/${lotIdParam}/verify`,
    title: 'Verify',
    isDrawerRoute: false,
    isRoute: route => route.includes('verify'),
  },
  verifyResultCalculator: {
    path: `/lot/${lotIdParam}/verify/calculator`,
    title: 'Calculator',
    isDrawerRoute: false,
    isRoute: route => route.includes('calculator'),
  },
  winner: {
    path: `/lot/${lotIdParam}/winner`,
    title: 'Winner',
    isDrawerRoute: false,
    isRoute: route => route.includes('winner'),
  },
  profile: {
    path: '/profile',
    title: 'Profile',
    isDrawerRoute: true,
    isRoute: route => route === Routes.profile.path,
  },
}
