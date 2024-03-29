import { styled, theme } from '../styles/stitches.config'

export const Spacer = styled('div', {
  variants: {
    size: {
      verySmall: {
        width: theme.space.verySmall,
        height: theme.space.verySmall,
      },
      small: {
        width: theme.space.small,
        height: theme.space.small,
      },
      default: {
        width: theme.space.default,
        height: theme.space.default,
      },
      large: {
        width: theme.space.large,
        height: theme.space.large,
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
