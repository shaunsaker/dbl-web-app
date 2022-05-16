import { fb } from '..'
import { createSyncQueryChannel } from './utils/createSyncQueryChannel'

export const firebaseSyncStats = async () => {
  return createSyncQueryChannel(
    fb.firestore().collection('stats').where('active', '==', true),
  )
}
