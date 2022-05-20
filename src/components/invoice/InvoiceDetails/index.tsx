import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { BlockchainAddress } from '../../BlockchainAddress'
import { Typography } from '../../Typography'
import { InvoiceId } from '../../../store/invoices/models'
import { selectInvoiceById } from '../../../store/invoices/selectors'
import { ApplicationState } from '../../../store/reducers'
import { getFormattedTime } from '../../../utils/getFormattedTime'

interface InvoiceDetailsProps {
  invoiceId: InvoiceId
}

export const InvoiceDetails = ({
  invoiceId,
}: InvoiceDetailsProps): ReactElement | null => {
  const invoice = useSelector((state: ApplicationState) =>
    selectInvoiceById(state, invoiceId),
  )

  if (!invoice) {
    return null
  }

  return (
    <Container>
      <Typography>Invoice amount</Typography>

      <Typography>{invoice.amountBTC} BTC</Typography>

      <Typography>Invoice date</Typography>

      <Typography>{getFormattedTime(invoice.dateCreated)}</Typography>

      <Typography>Invoice address</Typography>

      <BlockchainAddress>{invoice.address}</BlockchainAddress>
    </Container>
  )
}

const Container = styled('div', {})
