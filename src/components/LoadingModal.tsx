import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { Backdrop, BackdropProps } from './Backdrop'
import { Spacer } from './Spacer'
import { Spinner } from './Spinner'
import { Typography } from './Typography'

interface LoadingModalProps extends BackdropProps {
  children?: string
}

export const LoadingModal = ({
  children,
  ...props
}: LoadingModalProps): ReactElement => {
  return (
    <Container {...props}>
      <Spinner />

      <Spacer size="large" />

      <Typography>{children}</Typography>
    </Container>
  )
}

const Container = styled(Backdrop, {})
