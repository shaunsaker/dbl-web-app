import { objectToArray } from '../utils/objectToArray'
import { Routes } from './models'

export const hasRouteHistory = () => history.state.idx > 0

export const isOnboardingRoute = (path: string) =>
  path === Routes.welcome.path || path.includes('onboarding')

export const findRouteByPath = (path: string) =>
  objectToArray(Routes).find(route => route.isRoute(path))
