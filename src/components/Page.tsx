import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled, theme } from '../styles/stitches.config'
import { ElementContainer } from './ElementContainer'

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Page = ({ children, ...props }: PageProps): ReactElement => {
  return (
    <StyledElementContainer kind="large">
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
})

export const PAGE_PADDING = theme.space.large

const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$black',
  padding: PAGE_PADDING,
  paddingTop:
    parseInt(theme.sizes.headerBarHeight.value) + parseInt(PAGE_PADDING.value),
  position: 'relative',
})

const ContentContainer = styled('div', {
  flex: 1,
  flexCenter: '',
})
