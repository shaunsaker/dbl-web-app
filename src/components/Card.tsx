import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'

interface CardProps {
  children: ReactNode
}

export const Card = ({ children }: CardProps): ReactElement => {
  return <Container>{children}</Container>
}

const Container = styled('div', {})
