import React, { ReactElement, useCallback, useState } from 'react'
import { styled, theme } from '../styles/stitches.config'
import { Typography } from './Typography'
import { useDispatch, useSelector } from 'react-redux'
import { navigate, navigateBack } from '../store/navigation/actions'
import { pageParam, RoutePath } from '../router/models'
import { MenuIcon } from './icons/MenuIcon'
import { BackButton } from './BackButton'
import { CloseButton } from './CloseButton'
import {
  selectHasUserSignedUp,
  selectIsAuthenticated,
} from '../store/auth/selectors'
import { setHasCompletedOnboarding } from '../store/onboarding/actions'
import { useRouter } from 'next/router'
import {
  hasRouteHistory,
  isCloseRoute,
  isMenuRoute,
  isOnboardingRoute,
} from '../router/utils'
import { Drawer, DrawerItem } from './Drawer'

const DRAWER_ITEMS: DrawerItem[] = [
  { label: 'Results', link: RoutePath.results.replace(pageParam, '1') },
  { label: 'Profile', link: RoutePath.profile },
  {
    label: 'Contact Us',
    link: `mailto: ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`,
  },
]

interface HeaderBarProps {}

export const HeaderBar = ({}: HeaderBarProps): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const hasUserSignedUp = useSelector(selectHasUserSignedUp)

  const [drawerOpen, setDrawerOpen] = useState(false)

  const showBack = hasRouteHistory()
  const showMenu = isMenuRoute(router.route)
  const showClose = isCloseRoute(router.route)

  const navigateToRoot = useCallback(() => {
    if (isOnboardingRoute(router.route)) {
      dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))
    }

    dispatch(
      navigate({
        route: isAuthenticated
          ? RoutePath.home
          : hasUserSignedUp
          ? RoutePath.signIn
          : RoutePath.signUp,
      }),
    )
  }, [dispatch, router.route, isAuthenticated, hasUserSignedUp])

  const onLogoClick = useCallback(() => {
    navigateToRoot()
  }, [navigateToRoot])

  const onBackClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  const onMenuClick = useCallback(() => {
    setDrawerOpen(drawerOpen => !drawerOpen)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const onCloseClick = useCallback(() => {
    navigateToRoot()
  }, [navigateToRoot])

  return (
    <Container>
      {showBack && (
        <ItemContainer position="left">
          <StyledBackButton onClick={onBackClick} />
        </ItemContainer>
      )}

      <ItemContainer position={showBack ? 'center' : 'left'}>
        <button onClick={onLogoClick}>
          <Typography kind="logo">DBL</Typography>
        </button>
      </ItemContainer>

      <ItemContainer position="right">
        {showMenu ? (
          <>
            <button onClick={onMenuClick}>
              <StyledMenuIcon />
            </button>

            <Drawer
              open={drawerOpen}
              items={DRAWER_ITEMS}
              onClose={onCloseDrawer}
            />
          </>
        ) : (
          showClose && <StyledCloseButton onClick={onCloseClick} />
        )}
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
  padding: `0 ${theme.space.large}`,
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
