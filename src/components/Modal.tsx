import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { RHYTHM } from '../theme/rhythm'
import { BORDER_RADIUS } from '../theme/borderRadius'
import { Typography } from './Typography'
import { CloseButton } from './CloseButton'
import { Dialog, DialogProps } from '@mui/material'

export interface ModalProps extends DialogProps {
  title: string
  subtitle?: string
  onClose: () => void
}

export const Modal = ({
  title,
  subtitle,
  open,
  children,
  onClose,
}: ModalProps): ReactElement => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <ContentContainer>
        <Typography large bold>
          {title}
        </Typography>

        {subtitle && <Typography>{subtitle}</Typography>}

        {children}

        <StyledCloseButton onClick={onClose} />
      </ContentContainer>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)``

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`

const ContentContainer = styled.div`
  background-color: ${colors.white};
  flex: 1;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
  padding: ${RHYTHM}px;
`
