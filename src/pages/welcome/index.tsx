import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { Explainer } from '../../components/Explainer'
import { PrimaryButton } from '../../components/PrimaryButton'
import { pageParam, Routes } from '../../router/models'
import { navigate } from '../../store/navigation/actions'
import { Spacer } from '../../components/Spacer'

interface WelcomeProps {}

const Welcome = ({}: WelcomeProps): ReactElement => {
  const dispatch = useDispatch()

  const onLearnMoreClick = useCallback(() => {
    dispatch(
      navigate({ route: Routes.onboarding.path.replace(pageParam, '1') }),
    )
  }, [dispatch])

  return (
    <>
      <Container>
        <Explainer
          imageProps={{
            src: '/images/cyberpunk-city-4.png',
            alt: '',
          }}
          title="Ready to change your life for the better...forever?"
          description="This is a gravity-defying explanation that welcomes the user and gets them excited and eager to buy their first tickets."
        />
      </Container>

      <Spacer size="large" />

      <PrimaryButton onClick={onLearnMoreClick}>LEARN MORE</PrimaryButton>
    </>
  )
}

export default Welcome

const Container = styled('div', {
  flex: 1,
  flexCenter: '',
})
