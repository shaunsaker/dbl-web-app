import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { PrimaryButton } from '../../../components/PrimaryButton'

import { Typography } from '../../../components/Typography'

interface OnboardingOneProps {
  onSubmit: () => void
}

export const OnboardingOne = ({
  onSubmit,
}: OnboardingOneProps): ReactElement => {
  return (
    <Container>
      <Typography large bold>
        Onboarding One
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
