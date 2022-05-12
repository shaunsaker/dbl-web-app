import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'

const BACKGROUND_COLOR = colors.white

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Page = ({ children, ...props }: PageProps): ReactElement => {
  return <Container {...props}>{children}</Container>
}

const Container = styled.div`
  flex: 1;
  background-color: ${BACKGROUND_COLOR};
`
