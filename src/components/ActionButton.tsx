import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'

type ActionButtonProps = HTMLAttributes<HTMLButtonElement>

export const ActionButton = ({
  children,
  ...props
}: ActionButtonProps): ReactElement => {
  return <Container {...props}>{children}</Container>
}

const Container = styled('button', {})
