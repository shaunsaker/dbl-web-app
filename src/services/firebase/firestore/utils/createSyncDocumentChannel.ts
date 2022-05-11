import { eventChannel } from 'redux-saga'
import { fb } from '../..'

const syncDocument = <T>(
  ref: fb.firestore.DocumentReference,
  cb: (data: T | { [key: string]: any }) => void,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = ref.onSnapshot(
        (snapshot: fb.firestore.DocumentSnapshot) => {
          const data = { id: snapshot.id, ...snapshot.data() }

          cb(data)
        },
        (error: Error) => {
          cb(error)
        },
      )

      resolve(unsubscribe)
    } catch (error) {
      reject(error)
    }
  })
}

export const createSyncDocumentChannel = <T>(
  ref: fb.firestore.DocumentReference,
) => {
  return eventChannel(emit => {
    syncDocument<T>(ref, emit)

    // The subscriber must return an unsubscribe function
    return () => {}
  })
}
