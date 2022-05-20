import React, { ReactElement } from 'react'
import { styled } from '../../../styles/stitches.config'
import { Explainer } from '../../Explainer'
import { PrimaryButton } from '../../PrimaryButton'

interface OnboardingThreeProps {
  onSubmit: () => void
}

export const OnboardingThree = ({
  onSubmit,
}: OnboardingThreeProps): ReactElement => {
  return (
    <>
      <Container>
        <Explainer
          title="Entrancing Subheading"
          description="Physics-defying Explanation."
        />
      </Container>

      <PrimaryButton onClick={onSubmit}>DONE</PrimaryButton>
    </>
  )
}

const Container = styled('div', {})
