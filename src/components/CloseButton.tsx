import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { TRANSITION } from '../theme/transition'
import { CloseIcon } from './icons/CloseIcon'

interface CloseButtonProps {
  onClick: () => void
}

export const CloseButton = ({ onClick }: CloseButtonProps): ReactElement => {
  return (
    <Container onClick={onClick}>
      <StyledCloseIcon />
    </Container>
  )
}

const ICON_SIZE = 24

const StyledCloseIcon = styled(CloseIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${colors.primaryText};
  transition: color ${TRANSITION};
`

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    & ${StyledCloseIcon} {
      color: ${colors.primary};
    }
  }
`
