import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { Card } from './Card'
import { Typography } from './Typography'

interface InfoBoxProps {
  children: ReactNode
}

export const InfoBox = ({ children }: InfoBoxProps): ReactElement => {
  return (
    <Container kind="primary" disabled>
      <Typography kind="small">{children}</Typography>
    </Container>
  )
}

const Container = styled(Card, {
  flexDirection: 'row',
})
