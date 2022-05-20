import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { Typography } from './Typography'

interface PrimaryButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
      {loading ? <div>Loading</div> : <Typography>{children}</Typography>}
    </Container>
  )
}

const Container = styled('button', {})
