import { createStandardAction } from 'typesafe-actions'

export const navigateBack = createStandardAction('NAVIGATION/navigateBack')()

// TODO: type this
export type NavigateToPayload = {
  [T in keyof any]: {
    route: T
    props?: any[T]
  }
}[any]

export const navigate = createStandardAction(
  'NAVIGATION/navigate',
)<NavigateToPayload>()
