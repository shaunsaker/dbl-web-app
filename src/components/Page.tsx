import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Page = ({ children, ...props }: PageProps): ReactElement => {
  return (
    <Container {...props}>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  )
}

const Container = styled('div', {})

const ContentContainer = styled('div', {})
