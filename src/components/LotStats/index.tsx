import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { LotId } from '../../store/lots/models'
import {
  selectLotById,
  selectLotsDataLoading,
} from '../../store/lots/selectors'
import { ApplicationState } from '../../store/reducers'
import { getFormattedTime } from '../../utils/getFormattedTime'
import { maybePluralise } from '../../utils/maybePluralise'
import { CountdownTimer } from '../CountdownTimer'
import { Typography } from '../Typography'

interface LotStatsProps {
  lotId: LotId
  children?: React.ReactNode
}

export const LotStats = ({
  lotId,
  children,
}: LotStatsProps): ReactElement | null => {
  const loading = useSelector(selectLotsDataLoading)
  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  )
  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  )

  return (
    <Container>
      <Typography large bold>
        {lot ? getFormattedTime(lot?.id) : ''}
      </Typography>

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

          <Typography large bold>
            {lot.winnerUsername}
          </Typography>
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

const Container = styled.div`
  border-width: 1px;
`

const ActivityIndicatorContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
