import React, { ReactElement, useCallback } from 'react'
import { useRouter } from 'next/router'
import { styled } from '../../../styles/stitches.config'
import { useDispatch, useSelector } from 'react-redux'
import { OnboardingOne } from '../../../components/onboarding/OnboardingOne'
import { OnboardingTwo } from '../../../components/onboarding/OnboardingTwo'
import { OnboardingThree } from '../../../components/onboarding/OnboardingThree'
import { setHasCompletedOnboarding } from '../../../store/onboarding/actions'
import { navigate } from '../../../store/navigation/actions'
import { selectHasUserSignedUp } from '../../../store/auth/selectors'
import { pageParam, Routes } from '../../../router/models'
import { Spacer } from '../../../components/Spacer'
import { Stepper } from '../../../components/Stepper'
import { SceneAnimator } from '../../../components/SceneAnimator'

const PAGES = [OnboardingOne, OnboardingTwo, OnboardingThree]

interface OnboardingProps {}

const Onboarding = ({}: OnboardingProps): ReactElement | null => {
  const dispatch = useDispatch()

  const router = useRouter()
  const query = router.query
  const page = query.page as string
  const pageIndex = parseInt(page) - 1

  const hasUserSignedUp = useSelector(selectHasUserSignedUp)

  const onStepClick = useCallback(
    (newPageIndex: number) => {
      dispatch(
        navigate({
          route: Routes.onboarding.path.replace(
            pageParam,
            (newPageIndex + 1).toString(),
          ),
        }),
      )
    },
    [dispatch],
  )

  const markCompletedOnboarding = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))

    dispatch(
      navigate({
        route: hasUserSignedUp ? Routes.signIn.path : Routes.signUp.path,
      }),
    )
  }, [dispatch, hasUserSignedUp])

  const onSubmitClick = useCallback(
    (currentPageIndex: number) => {
      const isFinalPage = currentPageIndex === PAGES.length - 1

      if (isFinalPage) {
        markCompletedOnboarding()
      } else {
        const newPageIndex = currentPageIndex + 1

        dispatch(
          navigate({
            route: Routes.onboarding.path.replace(
              pageParam,
              (newPageIndex + 1).toString(),
            ),
          }),
        )
      }
    },
    [markCompletedOnboarding, dispatch],
  )

  const CurrentSlide = PAGES[pageIndex]

  if (!CurrentSlide) {
    return null
  }

  return (
    <Container>
      <SceneAnimator sceneKey={`onboarding-${pageIndex}`}>
        <CurrentSlide onSubmit={() => onSubmitClick(pageIndex)} />
      </SceneAnimator>

      <Spacer />

      <Stepper
        activeStep={pageIndex}
        steps={PAGES.length}
        onStepClick={onStepClick}
      />
    </Container>
  )
}

export default Onboarding

const Container = styled('div', {
  width: '100%',
  flex: 1,
  flexCenter: '',
  position: 'relative',
})
