import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'

interface InfoBoxProps {
  children: ReactNode
}

export const InfoBox = ({ children }: InfoBoxProps): ReactElement => {
  return <Container>{children}</Container>
}

const Container = styled('div', {})
