import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { RHYTHM } from '../theme/rhythm'

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

const Container = styled.div`
  flex: 1;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  position: relative;
`

const ContentContainer = styled.div`
  flex: 1;
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  padding: ${RHYTHM * 2}px;
  display: flex;
  flex-direction: column;
`
