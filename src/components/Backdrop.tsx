import React, { ReactElement, ReactNode, useEffect } from 'react'
import { styled } from '../styles/stitches.config'
import { SceneAnimator } from './SceneAnimator'
import usePortal from 'react-useportal'

interface BackdropProps {
  children?: ReactNode
}

export const Backdrop = ({ children }: BackdropProps): ReactElement => {
  const { Portal } = usePortal()

  useEffect(() => {
    // disable body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <Portal>
      <Container>
        <SceneAnimator kind="fade" sceneKey="backdrop">
          {children}
        </SceneAnimator>
      </Container>
    </Portal>
  )
}

const Container = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$transBlack',
})
