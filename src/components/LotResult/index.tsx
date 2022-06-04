import React, {
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  useCallback,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { lotIdParam, Routes } from '../../router/models'
import { Currency } from '../../store/btcRate/models'
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors'
import { Lot } from '../../store/lots/models'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { selectUserWinningByLotId } from '../../store/userProfile/selectors'
import { numberToDigits } from '../../utils/numberToDigits'

import { Typography } from '../Typography'
import { Card } from '../Card'
import { getFormattedTime } from '../../utils/getFormattedTime'
import { Spacer } from '../Spacer'
import { TextButton } from '../TextButton'

interface LotResultProps extends HTMLAttributes<HTMLDivElement> {
  lot: Lot
}

export const LotResult = ({
  lot,
  children,
  ...props
}: LotResultProps): ReactElement | null => {
  const dispatch = useDispatch()

  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  )

  const didUserWinThisLot = Boolean(
    useSelector((state: ApplicationState) =>
      selectUserWinningByLotId(state, lot.id),
    ),
  )

  const lotDate = lot?.lastCallTime

  const didLotHaveWinner = Boolean(lot?.winnerUsername)

  const onClick = useCallback(() => {
    dispatch(
      navigate({ route: Routes.result.path.replace(lotIdParam, lot.id) }),
    )
  }, [dispatch, lot.id])

  const onViewWinningDetailsClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      dispatch(
        navigate({ route: Routes.winner.path.replace(lotIdParam, lot.id) }),
      )
    },
    [dispatch, lot.id],
  )

  const onVerifyResultClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      if (!lot) {
        return
      }

      dispatch(
        navigate({
          route: Routes.verifyResult.path.replace(lotIdParam, lot.id),
        }),
      )
    },
    [lot, dispatch],
  )

  if (!lot) {
    return null
  }

  return (
    <Container {...props} onClick={onClick}>
      {children}

      <Typography kind="small">{getFormattedTime(lotDate)}</Typography>

      <Spacer size="small" />

      {didUserWinThisLot ? (
        <TextButton onClick={onViewWinningDetailsClick}>
          {lot.winnerUsername || 'You'} 🎉
        </TextButton>
      ) : (
        <Typography kind="title">{lot.winnerUsername || '-'}</Typography>
      )}

      <Spacer size="small" />

      <Typography kind="title">{lot.totalBTC} BTC</Typography>

      <Typography kind="small">
        ${numberToDigits(lot?.totalBTC * rate, 0)}
      </Typography>

      {didLotHaveWinner && (
        <>
          <Spacer />

          <TextButton onClick={onVerifyResultClick}>Verify</TextButton>
        </>
      )}
    </Container>
  )
}

const Container = styled(Card, {})
