import React, { ReactElement, ReactNode } from 'react'
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Transition,
  Variants,
} from 'framer-motion'
import { styled } from '../styles/stitches.config'

const FADE_ANIMATION: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const FADE_SCALE_ANIMATION: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
}

const TRANSITION: Transition = {
  type: 'spring',
  duration: 0.4,
}

interface SceneAnimatorProps {
  kind?: 'default' | 'fade'
  sceneKey: string
  children: ReactNode
}

export const SceneAnimator = ({
  kind = 'default',
  sceneKey,
  children,
}: SceneAnimatorProps): ReactElement => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence exitBeforeEnter>
        <StyledMotionContainer
          key={sceneKey}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={kind === 'default' ? FADE_SCALE_ANIMATION : FADE_ANIMATION}
          transition={TRANSITION}
        >
          {children}
        </StyledMotionContainer>
      </AnimatePresence>
    </LazyMotion>
  )
}

const StyledMotionContainer = styled(m.div, {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})