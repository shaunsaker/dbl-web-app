import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

interface LoadingModalProps {}

export const LoadingModal = ({}: LoadingModalProps): ReactElement => {
  return (
    <Container>
      <div>Loading</div>
    </Container>
  )
}

const Container = styled('div', {})
