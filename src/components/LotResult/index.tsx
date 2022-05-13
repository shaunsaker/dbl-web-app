import moment from 'moment'
import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { lotIdParam, RoutePath } from '../../router/models'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { LotId } from '../../store/lots/models'
import { selectLotById } from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { selectUserWinningByLotId } from '../../store/userProfile/selectors'
import { numberToDigits } from '../../utils/numberToDigits'

import { Typography } from '../Typography'

interface LotResultProps {
  lotId: LotId
}

export const LotResult = ({ lotId }: LotResultProps): ReactElement | null => {
  const dispatch = useDispatch()

  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  )

  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  )

  const didUserWinThisLot = Boolean(
    useSelector((state: ApplicationState) =>
      selectUserWinningByLotId(state, lotId),
    ),
  )

  // we use the last call time because drawTime is midnight (technically the next day)
  const lotDate = lot?.lastCallTime

  const onClick = useCallback(() => {
    dispatch(navigate(RoutePath.result.replace(lotIdParam, lotId)))
  }, [dispatch, lotId])

  const onViewWinningDetailsClick = useCallback(() => {
    dispatch(navigate(RoutePath.winner.replace(lotIdParam, lotId)))
  }, [dispatch, lotId])

  if (!lot) {
    return null
  }

  return (
    <Container disabled={!onClick} onClick={onClick}>
      <Typography>{moment(lotDate).format('dddd, DD MMMM YYYY')}</Typography>

      <Typography large bold>
        {lot.winnerUsername}
      </Typography>

      <Typography bold>
        {lot.totalBTC} BTC ($
        {numberToDigits(lot?.totalBTC * rate, 0)})
      </Typography>

      {didUserWinThisLot && (
        <>
          <Typography>You won this one 🎉</Typography>

          <button onClick={onViewWinningDetailsClick}>
            <Typography bold>View Details</Typography>
          </button>
        </>
      )}
    </Container>
  )
}

const Container = styled.button`
  border-width: 1px;
`
