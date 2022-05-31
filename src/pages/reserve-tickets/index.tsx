import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Typography } from '../../components/Typography'
import { firebaseReserveTickets } from '../../services/firebase/functions/firebaseReserveTickets'
import { invoiceIdParam, lotIdParam, RoutePath } from '../../router/models'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { InvoiceId, InvoiceStatus } from '../../store/invoices/models'
import { Lot, MAX_BTC_DIGITS } from '../../store/lots/models'
import { selectActiveLot } from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { maybePluralise } from '../../utils/maybePluralise'
import { numberToDigits } from '../../utils/numberToDigits'
import { getTicketOdds } from '../../utils/getTicketOdds'
import { showSnackbar } from '../../store/snackbars/actions'
import { SnackbarType } from '../../store/snackbars/models'
import { selectTicketIdsByLotIdGroupedByStatus } from '../../store/invoices/selectors'

interface ReserveTicketsProps {}

const ReserveTickets = ({}: ReserveTicketsProps): ReactElement => {
  const dispatch = useDispatch()

  const [ticketCount, setTicketCount] = useState(1)
  const [loading, setLoading] = useState(false)

  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  )

  const activeLot = useSelector(selectActiveLot) as Lot // lot is definitely defined here

  // get the ticket odds
  const ticketIdsGroupedByStatus = useSelector((state: ApplicationState) =>
    selectTicketIdsByLotIdGroupedByStatus(state, activeLot.id),
  )
  const ticketOdds = getTicketOdds({
    newUserTicketCount: ticketCount,
    existingUserTicketCount:
      ticketIdsGroupedByStatus[InvoiceStatus.confirmed].length,
    totalLotTicketCount: activeLot.totalConfirmedTickets,
  })

  // calculate the ticket prices in USD and BTC
  const pricePerTicketUSD = activeLot.ticketPriceUSD
  const pricePerTicketBTC = rate ? activeLot.ticketPriceUSD / rate : 0
  const ticketsValueUSD = numberToDigits(pricePerTicketUSD * ticketCount, 0)
  const ticketsValueBTC = numberToDigits(
    pricePerTicketBTC * ticketCount,
    MAX_BTC_DIGITS,
  )

  const isSubmitDisabled = !ticketCount || loading

  const onAddTickets = useCallback(
    (ticketsToAdd: number) => {
      let newTickets = ticketCount + ticketsToAdd

      if (newTickets < 0) {
        return
      }

      // limit ticket purchases to the totalAvailableTickets
      if (newTickets > activeLot.totalAvailableTickets) {
        newTickets = activeLot.totalAvailableTickets
      }

      // or perUserTicketLimit
      if (newTickets > activeLot.perUserTicketLimit) {
        newTickets = activeLot.perUserTicketLimit
      }

      setTicketCount(newTickets)
    },
    [ticketCount, setTicketCount, activeLot],
  )

  const onSubmitClick = useCallback(async () => {
    if (!activeLot) {
      return
    }

    setLoading(true)

    try {
      const reserveTicketsResponse = await firebaseReserveTickets({
        lotId: activeLot.id,
        ticketCount,
      })

      dispatch(
        navigate({
          route: RoutePath.invoice
            .replace(lotIdParam, activeLot.id)
            .replace(invoiceIdParam, reserveTicketsResponse.data as InvoiceId),
          replace: true,
        }),
      )
    } catch (error) {
      console.error(error)

      dispatch(
        showSnackbar({
          type: SnackbarType.error,
          title: (error as Error).message,
        }),
      )
    }

    setLoading(false)
  }, [activeLot, ticketCount, dispatch])

  return (
    <Container>
      <Typography>How many tickets would you like to buy?</Typography>

      <PrimaryButton onClick={() => onAddTickets(-1)}>-</PrimaryButton>

      <Typography>{ticketCount}</Typography>

      <PrimaryButton onClick={() => onAddTickets(1)}>+</PrimaryButton>

      <Typography>
        {maybePluralise(ticketCount, 'ticket')} ~ {ticketsValueBTC} BTC* ($
        {ticketsValueUSD})
      </Typography>

      <Typography>*Exact BTC value will be confirmed once reserved</Typography>

      <Typography>
        Your odds of winning would be {ticketOdds || 'Infinity'}%
      </Typography>

      <PrimaryButton disabled={isSubmitDisabled} onClick={onSubmitClick}>
        {loading ? 'RESERVING YOUR TICKETS' : 'RESERVE TICKETS'}
      </PrimaryButton>
    </Container>
  )
}

export default ReserveTickets

const Container = styled('div', {})
