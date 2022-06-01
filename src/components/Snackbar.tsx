import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { resolveValue, useToaster } from 'react-hot-toast'
import { styled } from '../styles/stitches.config'

import { Typography } from './Typography'

interface SnackbarProps {}

export const Snackbar = ({}: SnackbarProps): ReactElement => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      <AnimatePresence initial={false}>
        {toasts
          .filter(toast => toast.visible)
          .map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 64, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
            >
              <Container>
                <Typography kind="small">
                  {resolveValue(toast.message, toast)}
                </Typography>
              </Container>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}

const Container = styled('div', {
  flexCenter: '',
  backgroundColor: '$transWhite',
  padding: '$small $default',
  borderRadius: '$default',
  marginTop: '$default',
})
