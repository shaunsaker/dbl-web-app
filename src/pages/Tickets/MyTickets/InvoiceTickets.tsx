import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RouteKey } from '../../../router/models'
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
      navigate({
        route: RouteKey.invoice,
        props: {
          lotId,
          invoiceId: id,
        },
      }),
    )
  }, [dispatch, lotId, id])

  return (
    <Container onClick={onClick}>
      <Typography large>{getFormattedTime(dateCreated)}</Typography>

      <Typography>TOTAL</Typography>

      <Typography bold>{amountBTC} BTC</Typography>

      <Typography>STATUS</Typography>

      <Typography bold>{status}</Typography>

      <Typography>NO OF TICKETS</Typography>

      <Typography bold>{ticketIds.length}</Typography>
    </Container>
  )
}

const Container = styled.button`
  border-width: 1px;
`
