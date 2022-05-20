import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

interface ImageProps extends HTMLAttributes<HTMLImageElement> {}

export const Image = ({ ...props }: ImageProps): ReactElement => {
  return <Container src="" {...props} />
}

const Container = styled('img', {})
