import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { CloseIcon } from './icons/CloseIcon'

interface CloseButtonProps {
  onClick: () => void
}

export const CloseButton = ({ onClick }: CloseButtonProps): ReactElement => {
  return (
    <Container onClick={onClick}>
      <CloseIcon />
    </Container>
  )
}

const Container = styled('button', {
  flexCenter: '',
  fontSize: '$icon',
  color: '$white',
  transition: 'color $default',

  '&:hover': {
    color: '$turquoise',
  },
})
