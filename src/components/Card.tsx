import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { OpenButton } from './OpenButton'

interface CardProps {
  kind?: 'primary' | 'secondary'
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
}

export const Card = ({
  kind = 'secondary',
  disabled = false,
  children,
  onClick,
  ...props
}: CardProps): ReactElement => {
  return (
    <Container
      kind={kind}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}

      {!disabled && (
        <OpenButtonContainer>
          <OpenButton disabled />
        </OpenButtonContainer>
      )}
    </Container>
  )
}

const Container = styled('div', {
  width: '100%',
  transition: 'backgroundColor $default',
  borderRadius: '$borderRadius$default',
  position: 'relative',
  padding: '$default $large',
  flexCenter: '',

  variants: {
    kind: {
      primary: {
        backgroundColor: '$transWhite',
      },
      secondary: {
        border: '2px solid $transWhite',
      },
    },
    disabled: {
      true: {},
      false: {
        cursor: 'pointer',

        '&:hover, &:active': {
          backgroundColor: '$transTurquoise',
        },
      },
    },
  },
})

const OpenButtonContainer = styled('div', {
  position: 'absolute',
  top: '$small',
  right: '$small',
})
