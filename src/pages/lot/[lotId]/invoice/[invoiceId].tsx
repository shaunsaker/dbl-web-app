import React, { ReactElement } from 'react'
import { styled } from '../../../../styles/stitches.config'
import { InvoicePayments } from '../../../../components/invoice/InvoicePayments'
import { InvoiceDetails } from '../../../../components/invoice/InvoiceDetails'
import { InvoiceStatus } from '../../../../components/invoice/InvoiceStatus'
import { useRouter } from 'next/router'
import { LotId } from '../../../../store/lots/models'
import { InvoiceId } from '../../../../store/invoices/models'
import { ProtectedRoute } from '../../../../components/ProtectedRoute'

const Invoice = (): ReactElement | null => {
  const router = useRouter()
  const query = router.query
  const lotId = query.lotId as LotId
  const invoiceId = query.invoiceId as InvoiceId

  if (!lotId || !invoiceId) {
    return null
  }

  return (
    <ProtectedRoute>
      <Container>
        <InvoiceStatus invoiceId={invoiceId} />

        <InvoiceDetails invoiceId={invoiceId} />

        <InvoicePayments lotId={lotId} invoiceId={invoiceId} />
      </Container>
    </ProtectedRoute>
  )
}

export default Invoice

const Container = styled('div', {})
