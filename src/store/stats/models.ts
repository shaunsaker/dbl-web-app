export interface StatsData {
  id: string
  active: boolean
  resultsCount: number
}

export interface StatsState {
  data: StatsData | undefined
  loading: boolean
}
