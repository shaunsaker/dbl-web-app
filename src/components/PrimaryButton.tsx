import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { ElementContainer } from './ElementContainer'
import { Typography } from './Typography'

export interface PrimaryButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export const PrimaryButton = ({
  children,
  disabled,
  loading,
  ...props
}: PrimaryButtonProps): ReactElement => {
  return (
    <Container disabled={disabled} {...props}>
      <ContentContainer>
        {loading ? (
          <div>Loading</div>
        ) : (
          <Typography style={{ fontWeight: 700 }}>{children}</Typography>
        )}
      </ContentContainer>
    </Container>
  )
}

const Container = styled('button', {
  width: '100%',
  height: 50,
  backgroundColor: '$transWhite',
  transition: 'backgroundColor,opacity $default',
  borderRadius: '$borderRadius$default',
  overflow: 'hidden',

  '&:hover:not([disabled]), &[active]': {
    backgroundColor: '$transTurquoise',
  },

  '&[disabled]': {
    opacity: 0.5,
    cursor: 'default',
  },
})

const ContentContainer = styled(ElementContainer, {
  height: '100%',
  padding: '0 $default',
  flexCenter: '',
})
