import React, { ReactElement } from 'react'
import { OnboardingPage } from '../OnboardingPage'

interface OnboardingThreeProps {
  onSubmit: () => void
}

export const OnboardingThree = ({
  onSubmit,
}: OnboardingThreeProps): ReactElement => {
  return (
    <OnboardingPage
      explainerProps={{
        imageProps: {
          src: '/images/cyberpunk-city-3.webp',
          alt: '',
        },
        title: 'Entrancing Subheading',
        description: 'Physics-defying Explanation.',
      }}
      buttonProps={{
        onClick: onSubmit,
        children: 'DONE',
      }}
    />
  )
}
