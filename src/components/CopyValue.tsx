import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { CopyButton } from './CopyButton'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

interface CopyValueProps {
  value: string | number
  children: ReactNode
}

export const CopyValue = ({
  value,
  children,
}: CopyValueProps): ReactElement => {
  return (
    <Container>
      <Typography kind="paragraph" bold ellipsis>
        {children}
      </Typography>

      <Spacer />

      <CopyButton value={value} />
    </Container>
  )
}

const Container = styled('div', {
  width: '100%', // needed for ellipsis
  display: 'flex',
})
