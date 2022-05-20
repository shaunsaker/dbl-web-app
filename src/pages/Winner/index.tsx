import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled } from '../../styles/stitches.config'
import { CloseButton } from '../../components/CloseButton'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Typography } from '../../components/Typography'
import { useLinking } from '../../components/useLinking'
import { RouteParams } from '../../router/models'
import { navigateBack } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { selectUserWinningByLotId } from '../../store/userProfile/selectors'

export const Winner = (): ReactElement => {
  const { lotId } = useParams<RouteParams['winner']>()

  const dispatch = useDispatch()

  const { openLink } = useLinking()

  const winning = useSelector(
    (state: ApplicationState) =>
      lotId && selectUserWinningByLotId(state, lotId),
  )

  const onWithdrawClick = useCallback(() => {
    if (!winning) {
      return
    }

    openLink(winning.link)
  }, [openLink, winning])

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  return (
    <Page>
      <Container>
        <Typography>Holy shit, you just won 🎉</Typography>

        <Typography>Follow the link below to withdraw your BTC...</Typography>

        <PrimaryButton onClick={onWithdrawClick}>
          SET UP WITHDRAWAL
        </PrimaryButton>
      </Container>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

const Container = styled('div', {})

const CloseButtonContainer = styled('div', {})
