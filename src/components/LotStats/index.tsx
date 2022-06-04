import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { Lot } from '../../store/lots/models'
import { selectLotsDataLoading } from '../../store/lots/selectors'
import { ApplicationState } from '../../store/reducers'
import { getFormattedTime } from '../../utils/getFormattedTime'
import { CountdownTimer } from '../CountdownTimer'
import { Typography } from '../Typography'
import { Card } from '../Card'
import { LoadingModal } from '../LoadingModal'
import { Spacer } from '../Spacer'
import { DataSummary } from '../DataSummary'
import { Divider } from '../Divider'
import { DollarIcon } from '../icons/DollarIcon'
import { TicketIcon } from '../icons/TicketIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { isToday } from '../../utils/isToday'

interface LotStatsProps {
  lot: Lot
  children?: React.ReactNode
}

export const LotStats = ({
  lot,
  children,
}: LotStatsProps): ReactElement | null => {
  const loading = useSelector(selectLotsDataLoading)
  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  )

  const isTodaysLot = isToday(lot?.id)

  return (
    <Container kind="primary" disabled>
      <Typography kind="heading">
        {lot ? (isTodaysLot ? "Today's Lot" : getFormattedTime(lot?.id)) : ''}
      </Typography>

      <Spacer />

      <DataSummary
        icon={<DollarIcon />}
        title="TOTAL VALUE"
        value={`${lot?.totalBTC} BTC`}
        subtitle={`$${Math.round((lot?.totalBTC || 0) * rate)}`}
      />

      <Spacer size="small" />

      <Divider />

      <Spacer />

      <DataSummary
        icon={<TicketIcon />}
        title="TICKETS PURCHASED"
        value={lot?.totalConfirmedTickets || 0}
      />

      <Spacer size="small" />

      <Divider />

      <Spacer />

      <DataSummary
        icon={<ClockIcon />}
        title="TIME UNTIL DRAW"
        subtitle="Ticket sales close 1 hour before"
      >
        {lot && lot.active && <CountdownTimer timestamp={lot.drawTime} />}
      </DataSummary>

      {children}

      {loading && <LoadingModal>Fetching latest lot stats...</LoadingModal>}
    </Container>
  )
}

const Container = styled(Card, {})
