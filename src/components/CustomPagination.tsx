import { Pagination, PaginationProps } from '@mui/material'
import React, { ReactElement } from 'react'

export interface CustomPaginationProps extends PaginationProps {}

export const CustomPagination = ({
  ...props
}: CustomPaginationProps): ReactElement => {
  return <Pagination {...props} />
}
