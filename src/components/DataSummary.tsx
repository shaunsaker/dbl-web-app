import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
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

      <Typography small secondary>
        {title}
      </Typography>

      <Typography large bold>
        {value}
      </Typography>

      {subtitle && (
        <Typography small bold>
          {subtitle}
        </Typography>
      )}

      {children}

      {onClick && (
        <button onClick={onClick}>
          <OpenIcon />
        </button>
      )}
    </Container>
  )
}

const Container = styled.div``
