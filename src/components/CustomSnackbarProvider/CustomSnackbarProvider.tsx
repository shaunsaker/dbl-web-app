import { SnackbarProvider } from 'notistack'
import React, { ReactElement, ReactNode } from 'react'
import { SnackbarSetter } from './SnackbarSetter'

interface CustomSnackbarProviderProps {
  children: ReactNode
}

export const CustomSnackbarProvider = ({
  children,
}: CustomSnackbarProviderProps): ReactElement => {
  return (
    <SnackbarProvider maxSnack={3}>
      {children}

      <SnackbarSetter />
    </SnackbarProvider>
  )
}
