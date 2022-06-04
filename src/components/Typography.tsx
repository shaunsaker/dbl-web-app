import { styled } from '../styles/stitches.config'

export const Typography = styled('span', {
  variants: {
    kind: {
      small: {
        fontSize: '$small',
        lineHeight: '$small',
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.9)',
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
    center: {
      true: {
        textAlign: 'center',
      },
    },
    bold: {
      true: {
        fontWeight: 700,
      },
    },
    ellipsis: {
      true: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },

  defaultVariants: {
    kind: 'paragraph',
  },
})
