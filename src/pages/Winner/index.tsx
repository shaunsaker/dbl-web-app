import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CloseButton } from '../../components/CloseButton'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Typography } from '../../components/Typography'
import { useLinking } from '../../components/useLinking'
import { useSharing } from '../../components/useSharing'
import { RouteParams } from '../../router/models'
import { selectLotById } from '../../store/lots/selectors'
import { navigateBack } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { selectUserWinningByLotId } from '../../store/userProfile/selectors'

export const Winner = (): ReactElement => {
  const { lotId } = useParams<RouteParams['winner']>()

  const dispatch = useDispatch()

  const { openLink } = useLinking()

  const { share } = useSharing()

  const winning = useSelector(
    (state: ApplicationState) =>
      lotId && selectUserWinningByLotId(state, lotId),
  )
  const lot = useSelector(
    (state: ApplicationState) => lotId && selectLotById(state, lotId),
  )

  const onWithdrawClick = useCallback(() => {
    if (!winning) {
      return
    }

    openLink(winning.link)
  }, [openLink, winning])

  const onShareClick = useCallback(() => {
    if (!lot) {
      return
    }

    const title = 'I just got money fam!'
    const subject = title
    const message = `I just won ${lot?.totalBTC} BTC with ${process.env.APP_NAME}`
    const url = process.env.APP_DOWNLOAD_URL

    share({ title, subject, message, url })
  }, [share, lot])

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

        <PrimaryButton onClick={onShareClick}>SHARE YOUR WIN</PrimaryButton>
      </Container>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
`

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
