import React, {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react'
import { styled } from '../styles/stitches.config'
import { SceneAnimator } from './SceneAnimator'
import usePortal from 'react-useportal'

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  opaque?: boolean
  children?: ReactNode
}

export const Backdrop = ({
  opaque = false,
  children,
  ...props
}: BackdropProps): ReactElement => {
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
      <BackdropBase opaque={opaque} {...props}>
        <SceneAnimator kind="fade" sceneKey="backdrop">
          {children}
        </SceneAnimator>
      </BackdropBase>
    </Portal>
  )
}

export const BackdropBase = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',

  variants: {
    opaque: {
      true: {
        backgroundColor: '$black',
      },
      false: {
        backgroundColor: '$transBlack',
      },
    },
  },

  defaultVariants: {
    opaque: false,
  },
})
