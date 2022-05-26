import React, { ReactElement } from 'react'
import { styled } from '../../styles/stitches.config'
import { Explainer, ExplainerProps } from '../Explainer'
import { PrimaryButton, PrimaryButtonProps } from '../PrimaryButton'
import { Spacer } from '../Spacer'

interface OnboardingPageProps {
  explainerProps: ExplainerProps
  buttonProps: PrimaryButtonProps
}

export const OnboardingPage = ({
  explainerProps,
  buttonProps,
}: OnboardingPageProps): ReactElement => {
  return (
    <>
      <Container>
        <Explainer {...explainerProps} />
      </Container>

      <Spacer size="large" />

      <PrimaryButton {...buttonProps} />
    </>
  )
}

const Container = styled('div', {
  width: '100%',
  flex: 1,
  flexCenter: '',
})
