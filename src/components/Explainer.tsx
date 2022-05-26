import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { Image, ImageProps } from './Image'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

export interface ExplainerProps {
  imageProps?: ImageProps
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
      <Image src={imageProps?.src || ''} alt="" {...imageProps} />

      <Spacer size="large" />

      <Typography kind="title">{title}</Typography>

      <Spacer size="small" />

      <Typography>{description}</Typography>
    </Container>
  )
}

const Container = styled('div', {
  width: '100%',
})
