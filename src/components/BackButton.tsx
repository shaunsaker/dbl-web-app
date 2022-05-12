import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { ChevronLeftIcon } from './icons/ChevronLeftIcon'

const ICON_SIZE = 24

interface BackButtonPropsProps {
  onClick: () => void
}

export const BackButton = ({ onClick }: BackButtonPropsProps): ReactElement => {
  return (
    <Container onClick={onClick}>
      <ChevronLeftIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        fill={colors.primaryText}
      />
    </Container>
  )
}

const Container = styled.button``
