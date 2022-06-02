import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { ButtonBase } from './ButtonBase'
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

const Container = styled(ButtonBase, {
  flexCenter: '',
  fontSize: '$icon',
})
