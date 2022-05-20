import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
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
      <Typography>{children}</Typography>
    </Container>
  )
}

const Container = styled('button', {})
