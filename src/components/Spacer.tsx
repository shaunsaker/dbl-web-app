import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

interface SpacerProps {}

export const Spacer = ({}: SpacerProps): ReactElement => {
  return <Container />
}

const Container = styled('div', {})
