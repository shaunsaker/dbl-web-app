import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

export const Image = ({ ...props }: ImageProps): ReactElement => {
  return <Container {...props} />
}

const Container = styled('img', {})
