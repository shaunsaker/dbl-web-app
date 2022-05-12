import React, { createRef, ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { OnboardingOne } from './OnboardingOne'
import { OnboardingTwo } from './OnboardingTwo'
import { OnboardingThree } from './OnboardingThree'
import { Page } from '../../components/Page'
import { CloseButton } from '../../components/CloseButton'
import { colors } from '../../theme/colors'
import { setHasCompletedOnboarding } from '../../store/onboarding/actions'
import { BackButton } from '../../components/BackButton'
import { navigateBack } from '../../store/navigation/actions'

const SLIDES = [OnboardingOne, OnboardingTwo, OnboardingThree]

interface OnboardingProps {}

// TODO: SS implement pager
export const Onboarding = ({}: OnboardingProps): ReactElement => {
  const dispatch = useDispatch()

  const pagerViewRef = createRef<HTMLDivElement>()

  const [pageIndex, setPageIndex] = useState(0)

  const onBackClick = useCallback(() => {
    const isInitialSlide = pageIndex === 0

    if (isInitialSlide) {
      dispatch(navigateBack())
    } else {
      // pagerViewRef.current?.setPage(pageIndex - 1)
    }
  }, [dispatch, pageIndex, pagerViewRef])

  // const onPageSelected = useCallback(
  //   event => {
  //     setPageIndex(event.nativeEvent.position)
  //   },
  //   [setPageIndex],
  // )

  const onNavigateClick = useCallback(
    (newPageIndex: number) => {
      // pagerViewRef.current?.setPage(newPageIndex)
    },
    [pagerViewRef],
  )

  const markCompletedOnboarding = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))
  }, [dispatch])

  const onSubmitClick = useCallback(
    (slideIndex: number) => {
      const isFinalSlide = slideIndex === SLIDES.length - 1

      if (isFinalSlide) {
        markCompletedOnboarding()
      } else {
        // pagerViewRef.current?.setPage(slideIndex + 1)
      }
    },
    [markCompletedOnboarding, pagerViewRef],
  )

  const onCloseClick = useCallback(() => {
    markCompletedOnboarding()
  }, [markCompletedOnboarding])

  return (
    <Page>
      <StyledPagerView>
        {SLIDES.map((Slide, index) => (
          <Slide key={index + 1} onSubmit={() => onSubmitClick(index)} />
        ))}
      </StyledPagerView>

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

const StyledPagerView = styled.div`
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
