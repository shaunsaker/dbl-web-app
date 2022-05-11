import { fb } from '..'
import { createSyncQueryChannel } from './utils/createSyncQueryChannel'

export const firebaseSyncActiveLot = async () => {
  return createSyncQueryChannel(
    fb.firestore().collection('lots').where('active', '==', true),
  )
}
