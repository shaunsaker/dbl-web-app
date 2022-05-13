import { Dialog, DialogProps } from '@mui/material'
import React, { ReactElement } from 'react'

export interface CustomDialogProps extends DialogProps {}

export const CustomDialog = ({ ...props }: CustomDialogProps): ReactElement => {
  return <Dialog {...props} />
}
