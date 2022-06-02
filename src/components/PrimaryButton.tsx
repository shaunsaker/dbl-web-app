import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { ButtonBase } from './ButtonBase'
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
    <ElementContainer>
      <Container disabled={disabled} {...props}>
        {loading ? (
          <div>Loading</div>
        ) : (
          <Typography style={{ fontWeight: 700 }}>{children}</Typography>
        )}
      </Container>
    </ElementContainer>
  )
}

const Container = styled(ButtonBase, {
  width: '100%',
  height: 50,
  padding: '0 $default',
  backgroundColor: '$transWhite',
})
