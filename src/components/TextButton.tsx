import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { ButtonBase } from './ButtonBase'
import { Typography } from './Typography'

interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: string
  disabled?: boolean
  onClick?: () => void
}

export const TextButton = ({
  children,
  disabled,
  ...props
}: TextButtonProps): ReactElement => {
  return (
    <Container disabled={disabled} {...props}>
      <StyledTypography kind="small" css={{ fontWeight: 700 }}>
        {children}
      </StyledTypography>
    </Container>
  )
}

const Container = styled(ButtonBase, {})

const StyledTypography = styled(Typography, {
  textDecorationLine: 'underline',
})
