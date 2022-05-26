import React, { ReactElement, useCallback, useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { useDispatch, useSelector } from 'react-redux'
import { OnboardingOne } from '../../components/onboarding/OnboardingOne'
import { OnboardingTwo } from '../../components/onboarding/OnboardingTwo'
import { OnboardingThree } from '../../components/onboarding/OnboardingThree'
import { Page } from '../../components/Page'
import { setHasCompletedOnboarding } from '../../store/onboarding/actions'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { selectHasUserSignedUp } from '../../store/auth/selectors'
import { RoutePath } from '../../router/models'
import { HeaderBar } from '../../components/HeaderBar'
import { Spacer } from '../../components/Spacer'
import { Stepper } from '../../components/Stepper'

const SLIDES = [OnboardingOne, OnboardingTwo, OnboardingThree]

interface OnboardingProps {}

const Onboarding = ({}: OnboardingProps): ReactElement => {
  const dispatch = useDispatch()

  const hasUserSignedUp = useSelector(selectHasUserSignedUp)

  const [pageIndex, setPageIndex] = useState(0)

  const onBackClick = useCallback(() => {
    const isInitialSlide = pageIndex === 0

    if (isInitialSlide) {
      dispatch(navigateBack())
    } else {
      setPageIndex(pageIndex - 1)
    }
  }, [dispatch, pageIndex])

  const onStepClick = useCallback((newPageIndex: number) => {
    setPageIndex(newPageIndex)
  }, [])

  const markCompletedOnboarding = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))

    dispatch(
      navigate({
        route: hasUserSignedUp ? RoutePath.signIn : RoutePath.signUp,
      }),
    )
  }, [dispatch, hasUserSignedUp])

  const onSubmitClick = useCallback(
    (slideIndex: number) => {
      const isFinalSlide = slideIndex === SLIDES.length - 1

      if (isFinalSlide) {
        markCompletedOnboarding()
      } else {
        setPageIndex(slideIndex + 1)
      }
    },
    [markCompletedOnboarding],
  )

  const onCloseClick = useCallback(() => {
    markCompletedOnboarding()
  }, [markCompletedOnboarding])

  const CurrentSlide = SLIDES[pageIndex]

  return (
    <Page>
      <HeaderBar
        showBack
        showLogo
        showClose
        onBack={onBackClick}
        onClose={onCloseClick}
      />

      <Container>
        <CurrentSlide onSubmit={() => onSubmitClick(pageIndex)} />
      </Container>

      <Spacer />

      <Stepper
        activeStep={pageIndex}
        steps={SLIDES.length}
        onStepClick={onStepClick}
      />
    </Page>
  )
}

export default Onboarding

const Container = styled('div', {
  width: '100%',
  flex: 1,
  flexCenter: '',
})
