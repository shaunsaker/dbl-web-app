import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { ChevronLeftIcon } from './icons/ChevronLeftIcon'

interface BackButtonPropsProps {
  onClick: () => void
}

export const BackButton = ({ onClick }: BackButtonPropsProps): ReactElement => {
  return (
    <Container onClick={onClick}>
      <ChevronLeftIcon />
    </Container>
  )
}

const Container = styled('button', {})
