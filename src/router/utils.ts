import { RoutePath } from './models'

export const hasRouteHistory = () => history.state.idx > 0

export const isMenuRoute = (route: string) =>
  route === RoutePath.home ||
  route.startsWith('/results') ||
  route === RoutePath.profile

export const isOnboardingRoute = (route: string) =>
  route === RoutePath.welcome || route.startsWith('/onboarding')

export const isCloseRoute = (route: string) => isOnboardingRoute(route)
