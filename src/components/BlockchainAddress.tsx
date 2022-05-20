import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { CopyButton } from './CopyButton'
import { Typography } from './Typography'

interface BlockchainAddressProps {
  children: string
}

export const BlockchainAddress = ({
  children: address,
}: BlockchainAddressProps): ReactElement => {
  return (
    <Container>
      <Typography>
        {address}

        <CopyButton value={address} />
      </Typography>
    </Container>
  )
}

const Container = styled('div', {})
