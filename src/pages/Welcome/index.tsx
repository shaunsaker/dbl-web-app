import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { HeaderBar } from '../../components/HeaderBar'
import { Image } from '../../components/Image'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Spacer } from '../../components/Spacer'
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
      <HeaderBar showClose onClose={onCloseClick} />

      <Container>
        <StyledImage />

        <Spacer />

        <Typography large bold center>
          Ready to change your life for the better...forever?
        </Typography>

        <Spacer />

        <Typography secondary center>
          This is a gravity-defying explanation that welcomes the user and gets
          them excited and eager to buy their first tickets.
        </Typography>
      </Container>

      <PrimaryButton onClick={onLearnMoreClick}>LEARN MORE</PrimaryButton>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)``
