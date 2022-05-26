import React, { ReactElement } from 'react'
import { OnboardingPage } from '../OnboardingPage'

interface OnboardingOneProps {
  onSubmit: () => void
}

export const OnboardingOne = ({
  onSubmit,
}: OnboardingOneProps): ReactElement => {
  return (
    <OnboardingPage
      explainerProps={{
        imageProps: {
          src: '/images/cyberpunk-city-1.webp',
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
