import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

interface CardProps {
  children: ReactNode
}

export const Card = ({ children }: CardProps): ReactElement => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  background-color: white;
`
