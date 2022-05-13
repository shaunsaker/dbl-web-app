import { createStandardAction } from 'typesafe-actions'
import { Path, Pathname } from 'history'

export const navigateBack = createStandardAction('NAVIGATION/navigateBack')()

export const navigate = createStandardAction('NAVIGATION/navigate')<
  Path | Pathname
>()
