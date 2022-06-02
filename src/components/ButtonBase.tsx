import { styled } from '../styles/stitches.config'

export const ButtonBase = styled('button', {
  fontWeight: 500,
  color: '$white',
  transition: 'color $default',

  '&:hover, &[active]': {
    color: '$turquoise',
  },

  '&[disabled]': {
    fontWeight: 400,
    color: '$transWhite',
  },

  variants: {
    active: {
      true: {
        fontWeight: 700,
        color: '$turquoise',
      },
    },
  },

  defaultVariants: {
    active: false,
  },
})
