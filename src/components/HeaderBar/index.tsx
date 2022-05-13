import React, { ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../theme/colors'
import { RHYTHM } from '../../theme/rhythm'
import { Typography } from '../Typography'
import { useDispatch } from 'react-redux'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { RoutePath } from '../../router/models'
import { MenuIcon } from '../icons/MenuIcon'
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon'
import { PrimaryDrawer } from './PrimaryDrawer'

interface HeaderBarProps {
  showBackButton?: boolean
}

export const HeaderBar = ({ showBackButton }: HeaderBarProps): ReactElement => {
  const dispatch = useDispatch()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const onLogoClick = useCallback(() => {
    dispatch(navigate(RoutePath.home))
  }, [dispatch])

  const onBackClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  const onMenuClick = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <Container>
      <LogoContainer>
        {showBackButton && (
          <StyledBackButton onClick={onBackClick}>
            <StyledChevronLeftIcon fill={colors.primaryText} />
          </StyledBackButton>
        )}

        <button onClick={onLogoClick}>
          <LogoContainer>
            <Logo />

            <Typography bold>DBL</Typography>
          </LogoContainer>
        </button>
      </LogoContainer>

      <button onClick={onMenuClick}>
        <MenuIcon />
      </button>

      <PrimaryDrawer open={drawerOpen} onClose={onCloseDrawer} />
    </Container>
  )
}

export const HEADER_BAR_HEIGHT = 64

const Container = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${RHYTHM}px;
  height: ${HEADER_BAR_HEIGHT}px;
  background-color: ${colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`

const StyledBackButton = styled.button``

const StyledChevronLeftIcon = styled(ChevronLeftIcon)``

const LogoContainer = styled.div`
  flex-direction: row;
`

const Logo = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`
