import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { arrayFromNumber } from '../utils/arrayFromNumber'
import { ShiftySquare } from './ShiftySquare'

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
          <ShiftySquare
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
