import React, { ReactElement, useState } from 'react'
import { styled } from '../styles/stitches.config'
import { arrayFromNumber } from '../utils/arrayFromNumber'
import { ShiftySquare } from './ShiftySquare'
import { useInterval } from './useInterval'

const BARS = 3

interface SpinnerProps {}

export const Spinner = ({}: SpinnerProps): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0)

  useInterval(() => {
    setActiveIndex(index => (index === BARS - 1 ? 0 : index + 1))
  }, 400)

  return (
    <Container>
      {arrayFromNumber(BARS).map((_, index) => {
        return (
          <ShiftySquare key={`bar-${index}`} active={activeIndex === index} />
        )
      })}
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
})
