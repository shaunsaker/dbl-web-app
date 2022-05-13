import React, { ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { OnboardingOne } from './OnboardingOne'
import { OnboardingTwo } from './OnboardingTwo'
import { OnboardingThree } from './OnboardingThree'
import { Page } from '../../components/Page'
import { CloseButton } from '../../components/CloseButton'
import { colors } from '../../theme/colors'
import { setHasCompletedOnboarding } from '../../store/onboarding/actions'
import { BackButton } from '../../components/BackButton'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { selectHasUserSignedUp } from '../../store/auth/selectors'
import { RoutePath } from '../../router/models'

const SLIDES = [OnboardingOne, OnboardingTwo, OnboardingThree]

interface OnboardingProps {}

export const Onboarding = ({}: OnboardingProps): ReactElement => {
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

  const onNavigateClick = useCallback((newPageIndex: number) => {
    setPageIndex(newPageIndex)
  }, [])

  const markCompletedOnboarding = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))

    dispatch(navigate(hasUserSignedUp ? RoutePath.signIn : RoutePath.signUp))
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
      <Container>
        <CurrentSlide onSubmit={() => onSubmitClick(pageIndex)} />
      </Container>

      <DotsContainer>
        {SLIDES.map((_, index) => {
          return (
            <Dot
              key={`dot-${index}`}
              active={pageIndex === index}
              onClick={() => onNavigateClick(index)}
            />
          )
        })}
      </DotsContainer>

      <BackButtonContainer>
        <BackButton onClick={onBackClick} />
      </BackButtonContainer>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
`

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const DotsContainer = styled.div`
  flex-direction: row;
`

const DOT_SIZE = 16

const Dot = styled.button<{ active: boolean }>`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE / 2}px;
  background-color: ${({ active }) =>
    active ? colors.primary : colors.background};
  margin: 10px;
`
