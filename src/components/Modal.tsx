import React, { ReactElement } from 'react'
import { styled } from '../styles/stitches.config'
import { Typography } from './Typography'
import { CloseButton } from './CloseButton'
import { CustomDialog, CustomDialogProps } from './CustomDialog'

export interface ModalProps extends CustomDialogProps {
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
    <CustomDialog open={open} onClose={onClose}>
      <ContentContainer>
        <Typography>{title}</Typography>

        {subtitle && <Typography>{subtitle}</Typography>}

        {children}

        <CloseButton onClick={onClose} />
      </ContentContainer>
    </CustomDialog>
  )
}

const ContentContainer = styled('div', {})
