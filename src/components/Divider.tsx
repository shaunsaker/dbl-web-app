import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

interface DividerProps {}

export const Divider = ({}: DividerProps): ReactElement => {
  return <Container />
}

const Container = styled('div', {
  width: '100%',
  height: '$borderWidths$default',
  backgroundColor: '$transWhite',
})
