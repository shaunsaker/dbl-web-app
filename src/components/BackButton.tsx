import React, { ReactElement } from 'react'
import styled from 'styled-components'
import ChevronLeftIcon from '../icons/chevron-left.svg'
import { colors } from '../theme/colors'

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
