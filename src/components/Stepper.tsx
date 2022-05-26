import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { arrayFromNumber } from '../utils/arrayFromNumber'

interface StepperProps {
  activeStep: number
  steps: number
  onStepClick: (index: number) => void
}

export const Stepper = ({
  activeStep,
  steps,
  onStepClick,
}: StepperProps): ReactElement => {
  return (
    <Container>
      {arrayFromNumber(steps).map((_, index) => {
        return (
          <Step
            key={`step-${index}`}
            active={activeStep === index}
            onClick={() => onStepClick(index)}
          />
        )
      })}
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
})

const STEP_SIZE = 32
const ACTIVE_WIDTH = 64

const Step = styled('button', {
  margin: '0 -2px',
  height: STEP_SIZE / 2,
  transition: '$default',

  variants: {
    active: {
      true: {
        backgroundColor: '$turquoise',
        width: ACTIVE_WIDTH,
        clipPath: `polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)`,
      },
      false: {
        backgroundColor: '$transWhite',
        width: STEP_SIZE,
        clipPath: `polygon(0% 0%, 50% 0%, 100% 100%, 50% 100%)`,
      },
    },
  },

  '&:hover:not(:active):not(:focus)': {
    backgroundColor: '$transTurquoise',
  },
})
