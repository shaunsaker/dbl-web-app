import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'

interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const Typography = ({
  children,
  ...props
}: TypographyProps): ReactElement => {
  return <StyledText {...props}>{children}</StyledText>
}

const StyledText = styled('div', {})
