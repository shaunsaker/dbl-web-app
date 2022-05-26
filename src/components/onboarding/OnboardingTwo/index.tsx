import React, { ReactElement } from 'react'
import { OnboardingPage } from '../OnboardingPage'

interface OnboardingTwoProps {
  onSubmit: () => void
}

export const OnboardingTwo = ({
  onSubmit,
}: OnboardingTwoProps): ReactElement => {
  return (
    <OnboardingPage
      explainerProps={{
        imageProps: {
          src: '/images/cyberpunk-city-2.webp',
          alt: '',
        },
        title: 'Entrancing Subheading',
        description: 'Physics-defying Explanation.',
      }}
      buttonProps={{
        onClick: onSubmit,
        children: 'CONTINUE',
      }}
    />
  )
}
