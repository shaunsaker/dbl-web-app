import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { ButtonBase } from './ButtonBase'
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'

interface OpenButtonPropsProps {
  disabled?: boolean
  onClick?: () => void
}

export const OpenButton = ({
  disabled,
  onClick,
}: OpenButtonPropsProps): ReactElement => {
  return (
    <Container disabled={disabled} onClick={onClick}>
      <ExternalLinkIcon />
    </Container>
  )
}

const Container = styled(ButtonBase, {
  flexCenter: '',
  fontSize: '$icon',
})
