import React, { HTMLAttributes, ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { PrimaryButton } from './PrimaryButton'
import { Typography } from './Typography'

interface BlankStateProps {
  imageProps: HTMLAttributes<HTMLImageElement>
  title: string
  description: string
  buttonText?: string
  buttonAccessibilityLabel?: string
  onClick?: () => void
}

export const BlankState = ({
  imageProps,
  title,
  description,
  buttonText,
  onClick,
}: BlankStateProps): ReactElement => {
  return (
    <Container>
      <Image alt="" {...imageProps} />

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
