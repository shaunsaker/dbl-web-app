import React, { ReactElement } from 'react'
import { styled } from '../../../styles/stitches.config'
import { Explainer } from '../../Explainer'
import { PrimaryButton } from '../../PrimaryButton'

interface OnboardingTwoProps {
  onSubmit: () => void
}

export const OnboardingTwo = ({
  onSubmit,
}: OnboardingTwoProps): ReactElement => {
  return (
    <>
      <Container>
        <Explainer
          title="Entrancing Subheading"
          description="Physics-defying Explanation."
        />
      </Container>

      <PrimaryButton onClick={onSubmit}>CONTINUE</PrimaryButton>
    </>
  )
}

const Container = styled('div', {})
