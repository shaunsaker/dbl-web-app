import { fb } from '..'
import { InvoiceId } from '../../../store/invoices/models'
import { ReserveTicketsRequestPayload } from '../../../store/lots/models'
import {
  FirebaseCallableFunctions,
  FirebaseCallableFunctionsResponse,
} from './model'

export const firebaseReserveTickets = async (
  payload: ReserveTicketsRequestPayload,
): Promise<FirebaseCallableFunctionsResponse<InvoiceId>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await fb
        .app()
        .functions('europe-west1')
        .httpsCallable(FirebaseCallableFunctions.bookie)(payload)

      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
