import React, { ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { OnboardingOne } from './OnboardingOne'
import { OnboardingTwo } from './OnboardingTwo'
import { OnboardingThree } from './OnboardingThree'
import { Page } from '../../components/Page'
import { colors } from '../../theme/colors'
import { setHasCompletedOnboarding } from '../../store/onboarding/actions'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { selectHasUserSignedUp } from '../../store/auth/selectors'
import { RoutePath } from '../../router/models'
import { HeaderBar } from '../../components/HeaderBar'
import { Spacer } from '../../components/Spacer'
import { TRANSITION } from '../../theme/transition'

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
      <HeaderBar
        showBack
        showClose
        onBack={onBackClick}
        onClose={onCloseClick}
      />

      <Container>
        <CurrentSlide onSubmit={() => onSubmitClick(pageIndex)} />
      </Container>

      <Spacer />

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

const DotsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const DOT_SIZE = 12

const Dot = styled.button<{ active: boolean }>`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE / 2}px;
  background-color: ${({ active }) =>
    active ? colors.primary : colors.lightTransWhite};
  margin: 10px;
  transition: background-color ${TRANSITION};

  &:hover {
    background-color: ${colors.primary};
  }
`
