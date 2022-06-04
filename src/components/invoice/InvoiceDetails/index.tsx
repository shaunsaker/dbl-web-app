import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { CopyValue } from '../../CopyValue'
import { Typography } from '../../Typography'
import { InvoiceId, InvoiceStatus } from '../../../store/invoices/models'
import { selectInvoiceById } from '../../../store/invoices/selectors'
import { ApplicationState } from '../../../store/reducers'
import { getFormattedTime } from '../../../utils/getFormattedTime'
import { Card } from '../../Card'
import { Spacer } from '../../Spacer'

interface InvoiceDetailsProps {
  invoiceId: InvoiceId
}

export const InvoiceDetails = ({
  invoiceId,
}: InvoiceDetailsProps): ReactElement | null => {
  const invoice = useSelector((state: ApplicationState) =>
    selectInvoiceById(state, invoiceId),
  )

  const hasExpired = invoice?.status === InvoiceStatus.expired

  if (!invoice) {
    return null
  }

  return (
    <Container disabled>
      <Typography kind="small">Invoice amount</Typography>

      <CopyValue value={invoice.amountBTC}>{invoice.amountBTC} BTC</CopyValue>

      <Spacer />

      <Typography kind="small">Invoice date</Typography>

      <Typography kind="paragraph" bold>
        {getFormattedTime(invoice.dateCreated, true)}
      </Typography>

      {!hasExpired && (
        <>
          <Spacer />

          <Typography kind="small">Invoice address</Typography>

          <CopyValue value={invoice.address}>{invoice.address}</CopyValue>
        </>
      )}
    </Container>
  )
}

const Container = styled(Card, {})
