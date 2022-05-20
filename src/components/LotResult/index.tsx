import moment from 'moment'
import React, { HTMLAttributes, ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { lotIdParam, RoutePath } from '../../router/models'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { LotId } from '../../store/lots/models'
import { selectLotById } from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { selectUserWinningByLotId } from '../../store/userProfile/selectors'
import { numberToDigits } from '../../utils/numberToDigits'
import { PrimaryButton } from '../PrimaryButton'

import { Typography } from '../Typography'

interface LotResultProps extends HTMLAttributes<HTMLDivElement> {
  lotId: LotId
}

export const LotResult = ({
  lotId,
  ...props
}: LotResultProps): ReactElement | null => {
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
  const didLotHaveWinner = Boolean(lot?.winnerUsername)

  const onViewMoreClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.result.replace(lotIdParam, lotId) }))
  }, [dispatch, lotId])

  const onViewWinningDetailsClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.winner.replace(lotIdParam, lotId) }))
  }, [dispatch, lotId])

  const onVerifyResultClick = useCallback(() => {
    if (!lot) {
      return
    }

    dispatch(
      navigate({ route: RoutePath.verifyResult.replace(lotIdParam, lot.id) }),
    )
  }, [lot, dispatch])

  if (!lot) {
    return null
  }

  return (
    <Container {...props}>
      <Typography>{moment(lotDate).format('dddd, DD MMMM YYYY')}</Typography>

      <Typography>{lot.winnerUsername}</Typography>

      <Typography>
        {lot.totalBTC} BTC ($
        {numberToDigits(lot?.totalBTC * rate, 0)})
      </Typography>

      <button disabled={!onViewMoreClick} onClick={onViewMoreClick}>
        <Typography>View More</Typography>
      </button>

      {didUserWinThisLot && (
        <>
          <Typography>You won this one 🎉</Typography>

          <button onClick={onViewWinningDetailsClick}>
            <Typography>View Winning Details</Typography>
          </button>
        </>
      )}

      {didLotHaveWinner && (
        <PrimaryButton onClick={onVerifyResultClick}>
          Verify Result
        </PrimaryButton>
      )}
    </Container>
  )
}

const Container = styled('div', {})
