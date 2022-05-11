import { fb } from '..'

export const firebaseResetPassword = ({
  email,
}: {
  email: string
}): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await fb.auth().sendPasswordResetEmail(email)

      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
