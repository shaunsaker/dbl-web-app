import { fb } from '..'
import { createSyncDocumentChannel } from './utils/createSyncDocumentChannel'

export const firebaseSyncUserProfile = async (uid: string) => {
  return createSyncDocumentChannel(fb.firestore().collection('users').doc(uid))
}
