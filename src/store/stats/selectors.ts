import { ApplicationState } from '../reducers'

export const selectStatsDataLoading = (state: ApplicationState) => {
  return state.stats.loading
}

export const selectStatsData = (state: ApplicationState) => {
  if (!state.stats.data) {
    return null
  }

  return state.stats.data
}
