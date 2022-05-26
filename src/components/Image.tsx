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
      <StyledNextImage width={343} height={238} {...props} />
    </ElementContainer>
  )
}

const StyledNextImage = styled('img', {
  borderRadius: '$default',
})
