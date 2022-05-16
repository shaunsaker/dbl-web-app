import { ActionType, getType } from 'typesafe-actions'
import { signOut } from '../auth/actions'
import { fetchStats } from './actions'
import { StatsState } from './models'

const reducerActions = {
  signOutSuccess: signOut.success,
  fetchStatsRequest: fetchStats.request,
  fetchStatsSuccess: fetchStats.success,
  fetchStatsFailure: fetchStats.failure,
}

export const initialState: StatsState = {
  data: undefined,
  loading: false,
}

export const statsReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): StatsState => {
  switch (action.type) {
    case getType(signOut.success):
      return initialState

    case getType(fetchStats.request):
      return {
        ...state,
        loading: true,
      }

    case getType(fetchStats.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        loading: false,
      }

    case getType(fetchStats.failure):
      return {
        ...state,
        loading: false,
      }

    default: {
      return state
    }
  }
}
