import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { Card } from './Card'
import { InfoIcon } from './icons/InfoIcon'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

interface InfoBoxProps {
  children: ReactNode
}

export const InfoBox = ({ children }: InfoBoxProps): ReactElement => {
  return (
    <Container kind="primary" disabled>
      <StyledInfoIcon />

      <Spacer />

      <Typography kind="small">{children}</Typography>
    </Container>
  )
}

const Container = styled(Card, {
  flexDirection: 'row',
})

const StyledInfoIcon = styled(InfoIcon, {
  fontSize: '$icon',
  color: '$white',
})
