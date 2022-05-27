import React, { ReactElement, useCallback, useState } from 'react'
import { styled, theme } from '../../styles/stitches.config'
import { Typography } from '../Typography'
import { useDispatch } from 'react-redux'
import { navigate, navigateBack } from '../../store/navigation/actions'
import { RoutePath } from '../../router/models'
import { MenuIcon } from '../icons/MenuIcon'
import { PrimaryDrawer } from './PrimaryDrawer'
import { BackButton } from '../BackButton'
import { CloseButton } from '../CloseButton'
import { PAGE_PADDING } from '../Page'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const onLogoClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.home }))
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
      {showBack && (
        <ItemContainer position="left">
          <StyledBackButton onClick={onBackClick} />
        </ItemContainer>
      )}

      <ItemContainer position={showBack ? 'center' : 'left'}>
        {showLogo && (
          <button onClick={onLogoClick}>
            <Typography kind="logo">DBL</Typography>
          </button>
        )}
      </ItemContainer>

      {showMenu && (
        <>
          <ItemContainer position="right">
            <button onClick={onMenuClick}>
              <StyledMenuIcon />
            </button>
          </ItemContainer>

          <PrimaryDrawer open={drawerOpen} onClose={onCloseDrawer} />
        </>
      )}

      <ItemContainer position="right">
        {showClose && <StyledCloseButton onClick={onCloseClick} />}
      </ItemContainer>
    </Container>
  )
}

const Container = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: theme.sizes.headerBarHeight,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `0 ${PAGE_PADDING}`,
  backgroundColor: '$black',
  zIndex: 1,
})

const ItemContainer = styled('div', {
  width: '33%',

  variants: {
    position: {
      left: {
        display: 'flex',
        justifyContent: 'flex-start',
      },
      center: {
        display: 'flex',
        justifyContent: 'center',
      },
      right: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
  },
})

const StyledBackButton = styled(BackButton, {})

const StyledCloseButton = styled(CloseButton, {})

const StyledMenuIcon = styled(MenuIcon, {
  fontSize: '$icon',
  color: '$white',
})
