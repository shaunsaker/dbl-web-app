import React, {
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react'
import { styled } from '../styles/stitches.config'
import { ButtonBase } from './ButtonBase'
import { Typography } from './Typography'

interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const TextButton = ({
  children,
  disabled,
  ...props
}: TextButtonProps): ReactElement => {
  return (
    <Container disabled={disabled} {...props}>
      <StyledTypography kind="paragraph" css={{ fontWeight: 700 }}>
        {children}
      </StyledTypography>
    </Container>
  )
}

const Container = styled(ButtonBase, {})

const StyledTypography = styled(Typography, {
  textDecorationLine: 'underline',
})
