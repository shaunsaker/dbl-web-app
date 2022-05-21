import * as firebase from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'

import serviceAccount from './service-account.json'

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as ServiceAccount),
})

export { firebase }
