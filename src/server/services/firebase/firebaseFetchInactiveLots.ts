import { firebase } from '.'
import { Lot } from '../../../store/lots/models'

export const firebaseFetchInactiveLots = (): Promise<Lot[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const lots = (
        await firebase
          .firestore()
          .collection('lots')
          .where('active', '==', false)
          .get()
      ).docs.map(doc => ({ id: doc.id, ...doc.data() } as Lot))

      resolve(lots)
    } catch (error) {
      reject(error)
    }
  })
}
