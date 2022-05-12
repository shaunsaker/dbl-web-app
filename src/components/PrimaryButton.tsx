import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS } from '../theme/borderRadius'
import { colors } from '../theme/colors'
import { RHYTHM } from '../theme/rhythm'
import { Typography } from './Typography'

interface PrimaryButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ContainerProps {
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export const PrimaryButton = ({
  children,
  small,
  disabled,
  loading,
  ...props
}: PrimaryButtonProps): ReactElement => {
  return (
    <Container disabled={disabled} {...props}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Typography bold center small={small}>
          {children}
        </Typography>
      )}
    </Container>
  )
}

interface ContainerProps {
  secondary?: boolean
  small?: boolean
  disabled?: boolean
}

const Container = styled.button<ContainerProps>`
  align-self: stretch;
  padding: ${({ small }) => (small ? RHYTHM / 4 : RHYTHM / 2)}px
    ${({ small }) => (small ? RHYTHM / 2 : RHYTHM)}px;
  border-radius: ${BORDER_RADIUS}px;
  justify-content: center;

  background-color: ${({ disabled, secondary }) =>
    disabled ? colors.disabled : secondary ? colors.secondary : colors.primary};
`
