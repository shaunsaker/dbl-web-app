import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { Lot } from '../../store/lots/models'
import { selectLotsDataLoading } from '../../store/lots/selectors'
import { ApplicationState } from '../../store/reducers'
import { getFormattedTime } from '../../utils/getFormattedTime'
import { maybePluralise } from '../../utils/maybePluralise'
import { CountdownTimer } from '../CountdownTimer'
import { Typography } from '../Typography'

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

  return (
    <Container>
      <Typography>{lot ? getFormattedTime(lot?.id) : ''}</Typography>

      <Typography>
        Value: {lot?.totalBTC} BTC ($
        {Math.round((lot?.totalBTC || 0) * rate)})
      </Typography>

      <Typography>
        {maybePluralise(lot?.totalConfirmedTickets || 0, 'Ticket')} Purchased
      </Typography>

      {lot && lot.active && <CountdownTimer timestamp={lot.drawTime} />}

      {lot && lot.winnerUsername ? (
        <>
          <Typography>Winner</Typography>

          <Typography>{lot.winnerUsername}</Typography>
        </>
      ) : null}

      {loading && (
        <ActivityIndicatorContainer>
          <div>Loading</div>
        </ActivityIndicatorContainer>
      )}

      {children}
    </Container>
  )
}

const Container = styled('div', {})

const ActivityIndicatorContainer = styled('div', {})
