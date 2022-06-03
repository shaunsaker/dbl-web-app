import React, { ReactElement, useCallback, useState } from 'react'
import { styled, theme } from '../styles/stitches.config'
import { Typography } from './Typography'
import { useDispatch, useSelector } from 'react-redux'
import { navigate, navigateBack } from '../store/navigation/actions'
import { Routes } from '../router/models'
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
  findRouteByPath,
  hasRouteHistory,
  isOnboardingRoute,
} from '../router/utils'
import { Drawer, DrawerItem } from './Drawer'
import { objectToArray } from '../utils/objectToArray'

const DRAWER_ITEMS: DrawerItem[] = [
  ...objectToArray(Routes)
    .filter(route => route.isDrawerRoute)
    .map(route => ({
      label: route.title,
      link: (route.getDefaultPath && route.getDefaultPath()) || route.path,
    })),
  {
    label: 'Contact Us',
    link: `mailto: ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`,
  },
]

interface HeaderBarProps {}

export const HeaderBar = ({}: HeaderBarProps): ReactElement | null => {
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const hasUserSignedUp = useSelector(selectHasUserSignedUp)

  const [drawerOpen, setDrawerOpen] = useState(false)

  const route = findRouteByPath(router.route)
  const showMenu = route?.isDrawerRoute
  const showBack = !showMenu && hasRouteHistory()
  const showClose = isOnboardingRoute(router.route)

  const navigateToRoot = useCallback(() => {
    if (isOnboardingRoute(router.route)) {
      dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }))
    }

    dispatch(
      navigate({
        route: isAuthenticated
          ? Routes.home.path
          : hasUserSignedUp
          ? Routes.signIn.path
          : Routes.signUp.path,
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

  if (!route) {
    return null
  }

  return (
    <Container>
      <ItemContainer position="left">
        {showBack ? (
          <StyledBackButton onClick={onBackClick} />
        ) : (
          <button onClick={onLogoClick}>
            <Typography kind="logo">DBL</Typography>
          </button>
        )}
      </ItemContainer>

      <ItemContainer position="center">
        {route.title ? (
          <Typography kind="heading">{route.title}</Typography>
        ) : null}
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
  height: theme.sizes.headerBarHeight,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `0 ${theme.space.large}`,
  backgroundColor: '$black',
})

const ItemContainer = styled('div', {
  variants: {
    position: {
      left: {
        display: 'flex',
        justifyContent: 'flex-start',
        flex: 1,
      },
      center: {
        display: 'flex',
        justifyContent: 'center',
        flex: 2,
      },
      right: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
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
