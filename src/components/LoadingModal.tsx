import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { AnimatedSvgPaths } from './AnimatedSvgPaths'
import { Backdrop } from './Backdrop'
import { Typography } from './Typography'

interface LoadingModalProps {
  children?: string
}

export const LoadingModal = ({ children }: LoadingModalProps): ReactElement => {
  return (
    <Backdrop>
      <Container>
        <AnimatedSvgPaths />

        <Typography>{children}</Typography>
      </Container>
    </Backdrop>
  )
}

const Container = styled('div', {
  flex: 1,
  flexCenter: '',
})
