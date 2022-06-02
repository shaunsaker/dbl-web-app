import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled, theme } from '../styles/stitches.config'
import { ElementContainer } from './ElementContainer'
import { HeaderBar } from './HeaderBar'

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Page = ({ children, ...props }: PageProps): ReactElement => {
  return (
    <StyledElementContainer kind="large">
      <HeaderBar />

      <Container {...props}>
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </StyledElementContainer>
  )
}

const StyledElementContainer = styled(ElementContainer, {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
})

const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$black',
  padding: theme.space.large,
  paddingTop:
    parseInt(theme.sizes.headerBarHeight.value) +
    parseInt(theme.space.large.value),
})

const ContentContainer = styled('div', {
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})
