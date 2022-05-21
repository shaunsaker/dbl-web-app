import { createAsyncAction } from 'typesafe-actions'
import { Lot } from './models'

export const fetchActiveLot = createAsyncAction(
  'LOTS/fetchActiveLotRequest',
  'LOTS/fetchActiveLotSuccess',
  'LOTS/fetchActiveLotFailure',
)<void, { data: Lot }, Error>()
