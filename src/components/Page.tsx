import { useRouter } from 'next/router'
import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { styled, theme } from '../styles/stitches.config'
import { ElementContainer } from './ElementContainer'
import { HeaderBar } from './HeaderBar'
import { SceneAnimator } from './SceneAnimator'

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Page = ({ children, ...props }: PageProps): ReactElement => {
  const router = useRouter()

  return (
    <Container {...props}>
      <StyledElementContainer kind="large" />

      <HeaderBarContainer>
        <HeaderBar />
      </HeaderBarContainer>

      <ContentWrapper sceneKey={router.route}>
        <ContentContainer>{children}</ContentContainer>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled('div', {
  height: '100vh',
  position: 'relative',
  backgroundColor: '$black',
  overflow: 'hidden',
})

const StyledElementContainer = styled(ElementContainer, {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
})

const HeaderBarContainer = styled('div', {
  position: 'relative',
  zIndex: 1,
  margin: 4,
})

const ContentWrapper = styled(SceneAnimator, {
  position: 'absolute',
  top: theme.sizes.headerBarHeight,
  bottom: 0,
  right: 0,
  left: 0,
  overflow: 'auto',
  margin: theme.borderWidths.large, // ElementContainer width
  padding: theme.space.large,
  display: 'flex',
  flexDirection: 'column',
})

const ContentContainer = styled('div', {
  margin: '0 auto',
  maxWidth: 560,
  width: '100%',
  height: '100%',
})
