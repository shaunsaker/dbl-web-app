import { eventChannel } from 'redux-saga'
import { fb } from '../..'

// FIXME: we could extend createSyncCollectionChannel's types
const syncQuery = <T>(
  ref: fb.firestore.Query,
  cb: (data: T | { [key: string]: any }) => void,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = ref.onSnapshot(
        (snapshot: fb.firestore.QuerySnapshot) => {
          const data = snapshot.docs.map(
            (document: fb.firestore.DocumentData) => {
              return {
                ...document.data(),
                id: document.id,
              }
            },
          )

          cb(data)
        },
        (error: Error) => {
          reject(error)
        },
      )

      resolve(unsubscribe)
    } catch (error) {
      reject(error)
    }
  })
}

export const createSyncQueryChannel = <T>(ref: fb.firestore.Query) => {
  return eventChannel(emit => {
    syncQuery<T>(ref, emit)
    // The subscriber must return an unsubscribe function
    return () => {}
  })
}
