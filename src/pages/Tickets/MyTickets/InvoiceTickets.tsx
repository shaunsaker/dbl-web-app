import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { invoiceIdParam, lotIdParam, RoutePath } from '../../../router/models'
import { LotId } from '../../../store/lots/models'
import { navigate } from '../../../store/navigation/actions'
import { getFormattedTime } from '../../../utils/getFormattedTime'
import { Typography } from '../../../components/Typography'
import { Invoice } from '../../../store/invoices/models'

interface InvoiceTicketsProps extends Invoice {
  lotId: LotId
}

export const InvoiceTickets = ({
  lotId,
  id,
  dateCreated,
  amountBTC,
  status,
  ticketIds,
}: InvoiceTicketsProps): ReactElement => {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch(
      navigate(
        RoutePath.invoice
          .replace(lotIdParam, lotId)
          .replace(invoiceIdParam, id),
      ),
    )
  }, [dispatch, lotId, id])

  return (
    <Container onClick={onClick}>
      <Typography>{getFormattedTime(dateCreated)}</Typography>

      <Typography>TOTAL</Typography>

      <Typography>{amountBTC} BTC</Typography>

      <Typography>STATUS</Typography>

      <Typography>{status}</Typography>

      <Typography>NO OF TICKETS</Typography>

      <Typography>{ticketIds.length}</Typography>
    </Container>
  )
}

const Container = styled('button', {})
