import React, { ReactElement, useCallback } from 'react'
import { styled } from '../../styles/stitches.config'
import { ButtonBase } from '../ButtonBase'
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon'
import { ChevronRightIcon } from '../icons/ChevronRightIcon'
import { Spacer } from '../Spacer'
import { Typography } from '../Typography'
import usePagination, { UsePaginationProps } from './usePagination'

interface PaginationProps extends UsePaginationProps {}

export const Pagination = ({ ...props }: PaginationProps): ReactElement => {
  const { items } = usePagination({
    ...props,
  })

  const renderItem = useCallback((item: typeof items[0]) => {
    let component

    if (item.type === 'previous') {
      component = <StyledChevronLeftIcon />
    } else if (item.type === 'next') {
      component = <StyledChevronRightIcon />
    } else if (item.type === 'page') {
      component = (
        <StyledTypography kind="heading">{item.page}</StyledTypography>
      )
    } else if (item.type.includes('ellipsis')) {
      component = <StyledTypography kind="heading">...</StyledTypography>
    }

    return (
      <>
        <Spacer size="small" />

        <ButtonBase
          active={item.selected}
          disabled={item.disabled}
          onClick={item.onClick}
        >
          {component}
        </ButtonBase>

        <Spacer size="small" />
      </>
    )
  }, [])

  return <Container>{items.map(item => renderItem(item))}</Container>
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const StyledChevronLeftIcon = styled(ChevronLeftIcon, {
  fontSize: '$icon',
})

const StyledChevronRightIcon = styled(ChevronRightIcon, {
  fontSize: '$icon',
})

const StyledTypography = styled(Typography, {
  '&&': {
    fontWeight: 'inherit',
    color: 'inherit',
  },
})
