import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../../styles/stitches.config'
import { CloseButton } from '../../../../components/CloseButton'
import { Page } from '../../../../components/Page'
import { InvoicePayments } from '../../../../components/invoice/InvoicePayments'
import { navigateBack } from '../../../../store/navigation/actions'
import { InvoiceDetails } from '../../../../components/invoice/InvoiceDetails'
import { InvoiceStatus } from '../../../../components/invoice/InvoiceStatus'
import { useRouter } from 'next/router'
import { LotId } from '../../../../store/lots/models'
import { InvoiceId } from '../../../../store/invoices/models'

const Invoice = (): ReactElement | null => {
  const dispatch = useDispatch()

  const router = useRouter()
  const query = router.query
  const lotId = query.lotId as LotId
  const invoiceId = query.invoiceId as InvoiceId

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  if (!lotId || !invoiceId) {
    return null
  }

  return (
    <Page>
      <Container>
        <InvoiceStatus invoiceId={invoiceId} />

        <InvoiceDetails invoiceId={invoiceId} />

        <InvoicePayments lotId={lotId} invoiceId={invoiceId} />
      </Container>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

export default Invoice

const Container = styled('div', {})

const CloseButtonContainer = styled('div', {})
