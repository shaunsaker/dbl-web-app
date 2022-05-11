import { fb } from '..'

export const firebaseSignOut = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await fb.auth().signOut()

      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
