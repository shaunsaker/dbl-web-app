import { fb } from '..'
import { InvoiceId } from '../../../store/invoices/models'
import { LotId } from '../../../store/lots/models'
import { UserId } from '../../../store/userProfile/models'
import { createSyncQueryChannel } from './utils/createSyncQueryChannel'

export const firebaseSyncPayments = async ({
  lotId,
  invoiceId,
  uid,
}: {
  lotId: LotId
  invoiceId: InvoiceId
  uid: UserId
}) => {
  return createSyncQueryChannel(
    fb
      .firestore()
      .collection('lots')
      .doc(lotId)
      .collection('invoices')
      .doc(invoiceId)
      .collection('payments')
      .where('uid', '==', uid),
  )
}
