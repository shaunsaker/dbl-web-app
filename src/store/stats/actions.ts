import { createAsyncAction } from 'typesafe-actions'
import { StatsData } from './models'

export const fetchStats = createAsyncAction(
  'STATS/fetchStatsRequest',
  'STATS/fetchStatsSuccess',
  'STATS/fetchStatsFailure',
)<void, { data: StatsData }, Error>()
