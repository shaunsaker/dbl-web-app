import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { RHYTHM } from '../theme/rhythm'

interface SpacerProps extends ContainerProps {}

export const Spacer = ({ size = 'regular' }: SpacerProps): ReactElement => {
  return <Container size={size} />
}

interface ContainerProps {
  size?: 'small' | 'regular' | 'large'
}

const Container = styled.div<ContainerProps>`
  width: ${({ size }) =>
    size === 'small' ? RHYTHM / 2 : size === 'large' ? RHYTHM * 2 : RHYTHM}px;
  height: ${({ size }) =>
    size === 'small' ? RHYTHM / 2 : size === 'large' ? RHYTHM * 2 : RHYTHM}px;
`
