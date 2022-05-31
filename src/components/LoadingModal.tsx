import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { Backdrop, BackdropProps } from './Backdrop'
import { Typography } from './Typography'

interface LoadingModalProps extends BackdropProps {
  children?: string
}

export const LoadingModal = ({
  children,
  ...props
}: LoadingModalProps): ReactElement => {
  return (
    <Backdrop {...props}>
      <Container>
        <Typography>{children}</Typography>
      </Container>
    </Backdrop>
  )
}

const Container = styled('div', {
  flex: 1,
  flexCenter: '',
})
