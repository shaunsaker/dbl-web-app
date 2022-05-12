import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { PrimaryButton } from './PrimaryButton'
import { Typography } from './Typography'

interface BlankStateProps {
  imageSource: any // FIXME: type this
  title: string
  description: string
  buttonText?: string
  buttonAccessibilityLabel?: string
  onClick?: () => void
}

export const BlankState = ({
  imageSource,
  title,
  description,
  buttonText,
  onClick,
}: BlankStateProps): ReactElement => {
  return (
    <Container>
      <Image src={imageSource} />

      <Typography large bold>
        {title}
      </Typography>

      <Typography center>{description}</Typography>

      {buttonText && onClick && (
        <>
          <PrimaryButton onClick={onClick}>{buttonText}</PrimaryButton>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Image = styled.img``
