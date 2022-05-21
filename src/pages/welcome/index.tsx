import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { Explainer } from '../../components/Explainer'
import { HeaderBar } from '../../components/HeaderBar'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { RoutePath } from '../../router/models'
import { selectHasUserSignedUp } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { setHasCompletedOnboarding } from '../../store/onboarding/actions'

interface WelcomeProps {}

const Welcome = ({}: WelcomeProps): ReactElement => {
  const dispatch = useDispatch()
  const hasUserSignedUp = useSelector(selectHasUserSignedUp)

  const onLearnMoreClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.onboarding }))
  }, [dispatch])

  const onCloseClick = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))

    dispatch(
      navigate({
        route: hasUserSignedUp ? RoutePath.signIn : RoutePath.signUp,
      }),
    )
  }, [dispatch, hasUserSignedUp])

  return (
    <Page>
      <HeaderBar showClose onClose={onCloseClick} />

      <Container>
        <Explainer
          title="Ready to change your life for the better...forever?"
          description="This is a gravity-defying explanation that welcomes the user and gets them excited and eager to buy their first tickets."
        />
      </Container>

      <PrimaryButton onClick={onLearnMoreClick}>LEARN MORE</PrimaryButton>
    </Page>
  )
}

export default Welcome

const Container = styled('div', {})
