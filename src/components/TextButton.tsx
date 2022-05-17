import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { Typography } from './Typography'

interface TextButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ContainerProps {
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
      <Typography bold small primary={!disabled} secondary={disabled} underline>
        {children}
      </Typography>
    </Container>
  )
}

interface ContainerProps {}

const Container = styled.button<ContainerProps>`
  align-self: center;
`
