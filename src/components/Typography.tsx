import { styled } from '../styles/stitches.config'

export const Typography = styled('span', {
  variants: {
    kind: {
      small: {
        fontSize: '$small',
        lineHeight: '$small',
        fontWeight: 700,
        color: '$white',
      },
      paragraph: {
        fontSize: '$regular',
        lineHeight: '$regular',
        fontWeight: 400,
        color: '$white',
      },
      heading: {
        fontSize: '$heading',
        lineHeight: '$heading',
        fontWeight: 700,
        color: '$white',
      },
      title: {
        fontSize: '$title',
        lineHeight: '$title',
        fontWeight: 700,
        color: '$white',
      },
      logo: {
        fontFamily: '$logo',
        fontSize: '$small',
        lineHeight: '$small',
        fontWeight: 700,
        color: '$turquoise',
      },
    },
  },

  defaultVariants: {
    kind: 'paragraph',
  },
})
