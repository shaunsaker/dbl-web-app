import { styled } from '@stitches/react'

const STEP_SIZE = 48
const ACTIVE_STEP_WIDTH = STEP_SIZE * 2

export const ShiftySquare = styled('button', {
  margin: '0 -6px',
  height: STEP_SIZE / 2,
  transition: 'all $default',

  variants: {
    active: {
      true: {
        backgroundColor: '$turquoise',
        width: ACTIVE_STEP_WIDTH,
        clipPath: `polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)`,
      },
      false: {
        backgroundColor: '$transWhite',
        width: STEP_SIZE,
        clipPath: `polygon(0% 0%, 50% 0%, 100% 100%, 50% 100%)`,
      },
    },
  },

  '&:hover:not(:active):not(:focus)': {
    backgroundColor: '$transTurquoise',
  },
})
