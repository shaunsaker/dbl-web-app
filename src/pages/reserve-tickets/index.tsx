import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Typography } from '../../components/Typography'
import { firebaseReserveTickets } from '../../services/firebase/functions/firebaseReserveTickets'
import { invoiceIdParam, lotIdParam, Routes } from '../../router/models'
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
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { Spacer } from '../../components/Spacer'
import { InfoBox } from '../../components/InfoBox'
import { LoadingModal } from '../../components/LoadingModal'

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
          route: Routes.invoice.path
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
    <ProtectedRoute>
      <Container>
        <Typography kind="title" center>
          How many tickets would you like to buy?
        </Typography>

        <Spacer size="large" />

        <TicketCountContainer>
          <div>
            <PrimaryButton onClick={() => onAddTickets(-1)}>-</PrimaryButton>
          </div>

          <Typography kind="title">{ticketCount}</Typography>

          <div>
            <PrimaryButton onClick={() => onAddTickets(1)}>+</PrimaryButton>
          </div>
        </TicketCountContainer>

        <Spacer size="large" />

        <Typography kind="heading">
          {maybePluralise(ticketCount, 'ticket')} ~ {ticketsValueBTC} BTC* ($
          {ticketsValueUSD})
        </Typography>

        <Spacer size="small" />

        <Typography kind="small">
          *Exact BTC value will be confirmed once reserved
        </Typography>

        <Spacer />

        <Typography>
          Your odds of winning would be {ticketOdds || 'Infinity'}%
        </Typography>

        <Spacer size="large" />

        <InfoBox>
          After clicking Reserve, your tickets will be reserved for a total of
          15 minutes for you to make payment.
        </InfoBox>

        <Spacer size="large" />

        <FooterContainer>
          <PrimaryButton disabled={isSubmitDisabled} onClick={onSubmitClick}>
            RESERVE TICKETS
          </PrimaryButton>
        </FooterContainer>

        {loading && <LoadingModal>Reserving your tickets...</LoadingModal>}
      </Container>
    </ProtectedRoute>
  )
}

const Container = styled('div', {
  height: '100%',
  flexCenter: '',
})

const TicketCountContainer = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const FooterContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

export default ReserveTickets
