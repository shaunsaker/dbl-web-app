import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface DividerProps {}

export const Divider = ({}: DividerProps): ReactElement => {
  return <Container />
}

const Container = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgray;
`
