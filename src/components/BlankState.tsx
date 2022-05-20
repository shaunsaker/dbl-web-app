import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
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

      <Typography>{title}</Typography>

      <Typography>{description}</Typography>

      {buttonText && onClick && (
        <>
          <PrimaryButton onClick={onClick}>{buttonText}</PrimaryButton>
        </>
      )}
    </Container>
  )
}

const Container = styled('div', {})

const Image = styled('img', {})
