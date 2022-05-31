import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { ElementContainer } from './ElementContainer'

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export const Image = ({ ...props }: ImageProps): ReactElement => {
  return (
    <ElementContainer>
      <StyledImage {...props} />
    </ElementContainer>
  )
}

const StyledImage = styled('img', {
  width: '100%',
  minHeight: 237, // TEMP
})
