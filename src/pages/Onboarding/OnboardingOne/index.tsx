import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Explainer } from '../../../components/Explainer'
import { PrimaryButton } from '../../../components/PrimaryButton'

interface OnboardingOneProps {
  onSubmit: () => void
}

export const OnboardingOne = ({
  onSubmit,
}: OnboardingOneProps): ReactElement => {
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

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
