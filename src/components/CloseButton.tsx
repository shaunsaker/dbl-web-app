import React, { ReactElement } from 'react'
import styled from 'styled-components'
import CloseIcon from '../icons/close.svg'
import { colors } from '../theme/colors'

const ICON_SIZE = 24

interface CloseButtonProps {
  onClick: () => void
}

export const CloseButton = ({ onClick }: CloseButtonProps): ReactElement => {
  return (
    <Container onClick={onClick}>
      <CloseIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        fill={colors.primaryText}
      />
    </Container>
  )
}

const Container = styled.button``
