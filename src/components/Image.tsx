import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS } from '../theme/borderRadius'
import { colors } from '../theme/colors'

interface ImageProps extends HTMLAttributes<HTMLImageElement> {}

export const Image = ({ ...props }: ImageProps): ReactElement => {
  return <Container src="" {...props} />
}

const Container = styled.img`
  max-width: 360px;
  width: 100%;
  height: 240px;
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${colors.lightTransWhite};
`
