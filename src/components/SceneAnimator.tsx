import React, { ReactElement, ReactNode } from 'react'
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Variants,
} from 'framer-motion'
import { styled } from '../styles/stitches.config'
import { DEFAULT_TRANSITION } from '../styles/animation'

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

interface SceneAnimatorProps {
  className?: string
  kind?: 'default' | 'fade'
  sceneKey: string
  children: ReactNode
}

export const SceneAnimator = ({
  className,
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
          transition={DEFAULT_TRANSITION}
          className={className}
        >
          {children}
        </StyledMotionContainer>
      </AnimatePresence>
    </LazyMotion>
  )
}

const StyledMotionContainer = styled(m.div, {})
