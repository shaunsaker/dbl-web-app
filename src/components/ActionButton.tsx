import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'

type ActionButtonProps = HTMLAttributes<HTMLButtonElement>

export const ActionButton = ({
  children,
  ...props
}: ActionButtonProps): ReactElement => {
  return <Container {...props}>{children}</Container>
}

const SIZE = 48

const Container = styled.button`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${colors.secondary};
  justify-content: center;
  align-items: center;
`
