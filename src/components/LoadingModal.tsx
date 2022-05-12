import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'

interface LoadingModalProps {}

export const LoadingModal = ({}: LoadingModalProps): ReactElement => {
  return (
    <Container>
      <div>Loading</div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.backdrop};
  justify-content: center;
  align-items: center;
`
