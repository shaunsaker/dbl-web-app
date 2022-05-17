import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../theme/colors'

interface TypographyProps
  extends StyledTextProps,
    HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const Typography = ({
  children,
  ...props
}: TypographyProps): ReactElement => {
  return <StyledText {...props}>{children}</StyledText>
}

interface StyledTextProps {
  bold?: boolean
  small?: boolean
  large?: boolean
  center?: boolean
  primary?: boolean
  secondary?: boolean
  underline?: boolean
  ellipsis?: boolean
}

const StyledText = styled.div<StyledTextProps>`
  display: block;
  font-size: ${({ small, large }) => (small ? 12 : large ? 32 : 16)}px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: ${({ primary, secondary }) =>
    primary
      ? colors.primary
      : secondary
      ? colors.secondaryText
      : colors.primaryText};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};

  ${({ ellipsis }) =>
    ellipsis
      ? css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `
      : ''}
`
