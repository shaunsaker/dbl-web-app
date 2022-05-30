import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../../styles/stitches.config'
import { getRotateKeyFrames } from './utils'

interface ElementContainerProps extends HTMLAttributes<HTMLDivElement> {
  kind?: 'default' | 'large'
}

export const ElementContainer = ({
  kind = 'default',
  ...props
}: ElementContainerProps): ReactElement => {
  return <Container kind={kind} {...props} />
}

export const colours = '$pink, $turquoise, $blue, $purple, $pink'

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  '--angle': '0deg',
  borderWidth: '$default',
  borderStyle: 'solid',
  borderImage: `conic-gradient(from var(--angle), ${colours}) 1`,
  animation: `10s ${getRotateKeyFrames(colours)} linear infinite`,

  '@property --angle': {
    syntax: '<angle>',
    initialValue: '0deg',
    inherits: false,
  },

  variants: {
    kind: {
      default: {
        borderWidth: '$default',
      },
      large: {
        borderWidth: '$large',
      },
    },
  },
})
