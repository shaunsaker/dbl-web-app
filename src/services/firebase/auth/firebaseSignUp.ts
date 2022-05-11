import { fb } from '..'

export const firebaseSignup = ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<fb.User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = (
        await fb.auth().createUserWithEmailAndPassword(email, password)
      ).user

      resolve(user as fb.User)
    } catch (error) {
      reject(error)
    }
  })
}
