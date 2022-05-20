import React, { ReactElement, ReactNode } from 'react'
import { styled } from '../styles/stitches.config'
import { OpenIcon } from './icons/OpenIcon'
import { Typography } from './Typography'

interface DataSummaryProps {
  icon: ReactNode
  title: string
  value?: string | number
  subtitle?: string
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
      {icon}

      <Typography>{title}</Typography>

      <Typography>{value}</Typography>

      {subtitle && <Typography>{subtitle}</Typography>}

      {children}

      {onClick && (
        <button onClick={onClick}>
          <OpenIcon />
        </button>
      )}
    </Container>
  )
}

const Container = styled('div', {})
