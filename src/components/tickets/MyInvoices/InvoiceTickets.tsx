import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { invoiceIdParam, lotIdParam, Routes } from '../../../router/models'
import { LotId } from '../../../store/lots/models'
import { navigate } from '../../../store/navigation/actions'
import { getFormattedTime } from '../../../utils/getFormattedTime'
import { Typography } from '../../Typography'
import { Invoice } from '../../../store/invoices/models'
import { Card } from '../../Card'
import { Spacer } from '../../Spacer'

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
      navigate({
        route: Routes.invoice.path
          .replace(lotIdParam, lotId)
          .replace(invoiceIdParam, id),
      }),
    )
  }, [dispatch, lotId, id])

  return (
    <Container onClick={onClick}>
      <Typography kind="small">Date</Typography>

      <Typography kind="paragraph" bold>
        {getFormattedTime(dateCreated, true)}
      </Typography>

      <Spacer />

      <Typography kind="small">Total</Typography>

      <Typography kind="paragraph" bold>
        {amountBTC} BTC
      </Typography>

      <Spacer />

      <Typography kind="small">Status</Typography>

      <Typography kind="paragraph" bold>
        {status}
      </Typography>

      <Spacer />

      <Typography kind="small">No of Tickets</Typography>

      <Typography kind="paragraph" bold>
        {ticketIds.length}
      </Typography>
    </Container>
  )
}

const Container = styled(Card, {})
