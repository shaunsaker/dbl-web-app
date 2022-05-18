import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { Image } from './Image'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

interface ExplainerProps {
  imageProps?: HTMLAttributes<HTMLImageElement>
  title: string
  description: string
}

export const Explainer = ({
  imageProps,
  title,
  description,
}: ExplainerProps): ReactElement => {
  return (
    <Container>
      <StyledImage {...imageProps} />

      <Spacer />

      <Typography large bold center>
        {title}
      </Typography>

      <Spacer size="small" />

      <Typography secondary center>
        {description}
      </Typography>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)``
