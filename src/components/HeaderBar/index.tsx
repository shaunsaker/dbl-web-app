import React, { ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { RHYTHM } from '../../theme/rhythm'
import { Typography } from '../Typography'
import { useDispatch } from 'react-redux'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { RoutePath } from '../../router/models'
import { MenuIcon } from '../icons/MenuIcon'
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon'
import { PrimaryDrawer } from './PrimaryDrawer'
import { CloseIcon } from '../icons/CloseIcon'
import { colors } from '../../theme/colors'

interface HeaderBarProps {
  showBack?: boolean
  showLogo?: boolean
  showMenu?: boolean
  showClose?: boolean
  onBack?: () => void
  onClose?: () => void
}

export const HeaderBar = ({
  showBack,
  showLogo,
  showMenu,
  showClose,
  onBack,
  onClose,
}: HeaderBarProps): ReactElement => {
  const dispatch = useDispatch()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const onLogoClick = useCallback(() => {
    dispatch(navigate(RoutePath.home))
  }, [dispatch])

  const onBackClick = useCallback(() => {
    if (onBack) {
      onBack()
    } else {
      dispatch(navigateBack())
    }
  }, [onBack, dispatch])

  const onMenuClick = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const onCloseClick = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <Container>
      {(showBack || showLogo) && (
        <LogoContainer>
          {showBack && (
            <StyledBackButton onClick={onBackClick}>
              <StyledChevronLeftIcon />
            </StyledBackButton>
          )}

          {showLogo ? (
            <button onClick={onLogoClick}>
              <LogoContainer>
                <Logo />

                <Typography bold>DBL</Typography>
              </LogoContainer>
            </button>
          ) : (
            <div />
          )}
        </LogoContainer>
      )}

      {showMenu && (
        <>
          <button onClick={onMenuClick}>
            <StyledMenuIcon />
          </button>

          <PrimaryDrawer open={drawerOpen} onClose={onCloseDrawer} />
        </>
      )}

      {showClose && (
        <button onClick={onCloseClick}>
          <StyledCloseIcon />
        </button>
      )}
    </Container>
  )
}

export const HEADER_BAR_HEIGHT = 64

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${RHYTHM}px;
  height: ${HEADER_BAR_HEIGHT}px;
`

const StyledBackButton = styled.button``

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  font-size: 24px;
  color: ${colors.primaryText};
`

const LogoContainer = styled.div`
  flex-direction: row;
`

const Logo = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`

const StyledMenuIcon = styled(MenuIcon)`
  font-size: 24px;
  color: ${colors.primaryText};
`

const StyledCloseIcon = styled(CloseIcon)`
  font-size: 24px;
  color: ${colors.primaryText};
`
