import { Drawer, DrawerProps } from '@mui/material'
import React, { ReactElement } from 'react'

export interface CustomDrawerProps extends DrawerProps {}

export const CustomDrawer = ({ ...props }: CustomDrawerProps): ReactElement => {
  return <Drawer {...props} />
}
