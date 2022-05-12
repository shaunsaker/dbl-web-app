import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { PrimaryButton } from '../../../components/PrimaryButton'

import { Typography } from '../../../components/Typography'

interface OnboardingThreeProps {
  onSubmit: () => void
}

export const OnboardingThree = ({
  onSubmit,
}: OnboardingThreeProps): ReactElement => {
  return (
    <Container>
      <Typography large bold>
        Onboarding Three
      </Typography>

      <StyledImage />

      <Typography bold>Entrancing Subheading</Typography>

      <Typography>Physics-defying Explanation</Typography>

      <PrimaryButton onClick={onSubmit}>DONE</PrimaryButton>
    </Container>
  )
}

const Container = styled.div``

const StyledImage = styled.div`
  width: 368px;
  height: 368px;
  background-color: black;
`
