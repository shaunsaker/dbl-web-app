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
  max-height: 320px;
  width: 100%;
  height: 100%;
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${colors.lightTransWhite};
`
