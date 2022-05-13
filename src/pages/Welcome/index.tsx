import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CloseButton } from '../../components/CloseButton'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Typography } from '../../components/Typography'
import { RoutePath } from '../../router/models'
import { selectHasUserSignedUp } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { setHasCompletedOnboarding } from '../../store/onboarding/actions'

interface WelcomeProps {}

export const Welcome = ({}: WelcomeProps): ReactElement => {
  const dispatch = useDispatch()
  const hasUserSignedUp = useSelector(selectHasUserSignedUp)

  const onLearnMoreClick = useCallback(() => {
    dispatch(navigate(RoutePath.onboarding))
  }, [dispatch])

  const onCloseClick = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))

    dispatch(navigate(hasUserSignedUp ? RoutePath.signIn : RoutePath.signUp))
  }, [dispatch, hasUserSignedUp])

  return (
    <Page>
      <Container>
        <StyledImage />

        <Typography large bold>
          Welcome
        </Typography>

        <Typography>
          This is a gravity-defying explanation that welcomes the user and gets
          them excited and eager to buy their first tickets.
        </Typography>

        <PrimaryButton onClick={onLearnMoreClick}>LEARN MORE</PrimaryButton>
      </Container>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

const Container = styled.div``

const StyledImage = styled.div`
  width: 350px;
  height: 311px;
  background-color: black;
`

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
