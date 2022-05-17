import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Image } from '../../../components/Image'
import { PrimaryButton } from '../../../components/PrimaryButton'
import { Spacer } from '../../../components/Spacer'

import { Typography } from '../../../components/Typography'

interface OnboardingTwoProps {
  onSubmit: () => void
}

export const OnboardingTwo = ({
  onSubmit,
}: OnboardingTwoProps): ReactElement => {
  return (
    <>
      <Container>
        <StyledImage />

        <Spacer />

        <Typography large bold center>
          Entrancing Subheading
        </Typography>

        <Spacer />

        <Typography secondary center>
          Physics-defying Explanation
        </Typography>

        <Spacer />
      </Container>

      <PrimaryButton onClick={onSubmit}>CONTINUE</PrimaryButton>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)``
