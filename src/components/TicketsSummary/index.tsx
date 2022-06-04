import React, { ReactElement, useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { lotIdParam, Routes } from '../../router/models'
import { fetchInvoices } from '../../store/invoices/actions'
import { InvoiceStatus } from '../../store/invoices/models'
import {
  selectTicketIdsByLotId,
  selectTicketIdsByLotIdGroupedByStatus,
} from '../../store/invoices/selectors'
import { Lot } from '../../store/lots/models'
import { selectActiveLotId } from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { getTicketOdds } from '../../utils/getTicketOdds'
import { maybePluralise } from '../../utils/maybePluralise'

import { Typography } from '../Typography'
import { Card } from '../Card'
import { Spacer } from '../Spacer'

interface TicketsSummaryProps {
  lot: Lot
}

export const TicketsSummary = ({ lot }: TicketsSummaryProps): ReactElement => {
  const dispatch = useDispatch()

  const isActiveLot = useSelector(selectActiveLotId) === lot.id
  const ticketsGroupedByStatus = useSelector((state: ApplicationState) =>
    selectTicketIdsByLotIdGroupedByStatus(state, lot.id),
  )
  const tickets = useSelector((state: ApplicationState) =>
    selectTicketIdsByLotId(state, lot.id),
  )

  const hasConfirmedTickets =
    ticketsGroupedByStatus[InvoiceStatus.confirmed].length

  const ticketOdds = getTicketOdds({
    newUserTicketCount: 0,
    existingUserTicketCount:
      ticketsGroupedByStatus[InvoiceStatus.confirmed].length,
    totalLotTicketCount: lot?.totalConfirmedTickets || 0,
  })

  useLayoutEffect(
    () => {
      // we only fetch invoices for lot results because we already sync on active lot invoices
      if (!isActiveLot) {
        dispatch(fetchInvoices.request({ lotId: lot.id }))
      }
    },
    // eslint-disable-next-line
    [],
  )

  const onClick = useCallback(() => {
    dispatch(
      navigate({ route: Routes.tickets.path.replace(lotIdParam, lot.id) }),
    )
  }, [dispatch, lot.id])

  return (
    <Container onClick={onClick}>
      <Typography kind="title">
        You {isActiveLot ? 'have' : 'had'}{' '}
        {maybePluralise(tickets.length, 'ticket')}
      </Typography>

      <Typography kind="small">
        {ticketsGroupedByStatus[InvoiceStatus.reserved].length ? (
          <Typography>
            {ticketsGroupedByStatus[InvoiceStatus.reserved].length} Awaiting
            Payment
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[InvoiceStatus.paymentReceived].length ? (
          <Typography kind="small">
            {ticketsGroupedByStatus[InvoiceStatus.paymentReceived].length}{' '}
            Payment Received
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[InvoiceStatus.confirmed].length ? (
          <Typography kind="small">
            {ticketsGroupedByStatus[InvoiceStatus.confirmed].length} Confirmed
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[InvoiceStatus.expired].length ? (
          <Typography kind="small">
            {ticketsGroupedByStatus[InvoiceStatus.expired].length} Expired
          </Typography>
        ) : null}
      </Typography>

      {hasConfirmedTickets ? (
        <>
          <Spacer size="small" />

          <Typography kind="small">
            Your odds of winning would be {ticketOdds}%
          </Typography>
        </>
      ) : null}
    </Container>
  )
}

const Container = styled(Card, {})
