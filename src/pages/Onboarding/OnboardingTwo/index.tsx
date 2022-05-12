import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { PrimaryButton } from '../../../components/PrimaryButton'

import { Typography } from '../../../components/Typography'

interface OnboardingTwoProps {
  onSubmit: () => void
}

export const OnboardingTwo = ({
  onSubmit,
}: OnboardingTwoProps): ReactElement => {
  return (
    <Container>
      <Typography large bold>
        Onboarding Two
      </Typography>

      <StyledImage />

      <Typography bold>Entrancing Subheading</Typography>

      <Typography>Physics-defying Explanation</Typography>

      <PrimaryButton onClick={onSubmit}>CONTINUE</PrimaryButton>
    </Container>
  )
}

const Container = styled.div``

const StyledImage = styled.div`
  width: 368px;
  height: 368px;
  background-color: black;
`
