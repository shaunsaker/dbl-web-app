import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { Image } from './Image'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

interface ExplainerProps {
  imageProps?: HTMLAttributes<HTMLImageElement>
  title: string
  description: string
}

export const Explainer = ({
  imageProps,
  title,
  description,
}: ExplainerProps): ReactElement => {
  return (
    <Container>
      <Image alt="" {...imageProps} />

      <Spacer />

      <Typography>{title}</Typography>

      <Spacer />

      <Typography>{description}</Typography>
    </Container>
  )
}

const Container = styled('div', {})
