import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { ButtonBase } from './ButtonBase'
import { OpenIcon } from './icons/OpenIcon'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

interface DataSummaryProps {
  icon: ReactNode
  title: string
  value?: string | number
  subtitle?: string | number
  children?: ReactNode
  onClick?: () => void
}

export const DataSummary = ({
  icon,
  title,
  value,
  subtitle,
  children,
  onClick,
}: DataSummaryProps): ReactElement => {
  return (
    <Container>
      <TitleContainer>
        <StyledIcon>{icon}</StyledIcon>

        <Spacer size="verySmall" />

        <Typography kind="small">{title}</Typography>
      </TitleContainer>

      <Typography kind="title">{value}</Typography>

      {children}

      {subtitle && <Typography kind="small">{subtitle}</Typography>}

      {onClick && (
        <ButtonBase onClick={onClick}>
          <OpenIcon />
        </ButtonBase>
      )}
    </Container>
  )
}

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const TitleContainer = styled('div', {
  display: 'flex',
})

const StyledIcon = styled('div', {
  fontSize: 16,
  color: '$white',
})
