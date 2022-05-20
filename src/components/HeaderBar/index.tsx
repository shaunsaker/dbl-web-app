import React, { ReactElement, useCallback, useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { Typography } from '../Typography'
import { useDispatch } from 'react-redux'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { RoutePath } from '../../router/models'
import { MenuIcon } from '../icons/MenuIcon'
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon'
import { PrimaryDrawer } from './PrimaryDrawer'
import { CloseIcon } from '../icons/CloseIcon'

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
              <ChevronLeftIcon />
            </StyledBackButton>
          )}

          {showLogo ? (
            <button onClick={onLogoClick}>
              <LogoContainer>
                <Logo />

                <Typography>DBL</Typography>
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
            <MenuIcon />
          </button>

          <PrimaryDrawer open={drawerOpen} onClose={onCloseDrawer} />
        </>
      )}

      {showClose && (
        <button onClick={onCloseClick}>
          <CloseIcon />
        </button>
      )}
    </Container>
  )
}

export const HEADER_BAR_HEIGHT = 64

const Container = styled('div', {})

const StyledBackButton = styled('button', {})

const LogoContainer = styled('div', {})

const Logo = styled('div', {})
