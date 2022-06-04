import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export const Image = ({ ...props }: ImageProps): ReactElement => {
  return <StyledImage {...props} />
}

const StyledImage = styled('img', {
  width: '100%',
  minHeight: 237, // TEMP
  borderRadius: '$borderRadius$default',
  overflow: 'hidden',
})
