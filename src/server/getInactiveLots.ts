import { Lot } from '../store/lots/models'
import { firebaseFetchInactiveLots } from './services/firebase/firebaseFetchInactiveLots'
import { getCachedData } from './utils/getCachedData'

export const getInactiveLots = async (): Promise<Lot[]> => {
  const data = await getCachedData({
    filename: 'lots',
    api: firebaseFetchInactiveLots,
  })

  return data
}
