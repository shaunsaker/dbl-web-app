import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { RoutePath } from '../../router/models'
import { navigate } from '../../store/navigation/actions'
import { CustomDrawer, CustomDrawerProps } from '../CustomDrawer'

import { Typography } from '../Typography'
import { useLinking } from '../useLinking'

const DRAWER_ROUTES: { label: string; path: string }[] = [
  { label: 'Results', path: RoutePath.results },
  { label: 'Profile', path: RoutePath.profile },
]

interface PrimaryDrawerProps extends CustomDrawerProps {}

export const PrimaryDrawer = ({
  ...props
}: PrimaryDrawerProps): ReactElement => {
  const dispatch = useDispatch()
  const { openLink } = useLinking()

  const onDrawerRouteClick = useCallback(
    (path: string) => {
      dispatch(navigate(path))
    },
    [dispatch],
  )

  const onContactSupportClick = useCallback(() => {
    const link = `mailto:${process.env.SUPPORT_EMAIL}`

    openLink(link)
  }, [openLink])

  return (
    <CustomDrawer anchor="left" {...props}>
      {DRAWER_ROUTES.map(drawerRoute => (
        <button
          key={drawerRoute.label}
          onClick={() => onDrawerRouteClick(drawerRoute.path)}
        >
          <Typography bold>{drawerRoute.label}</Typography>
        </button>
      ))}

      <button onClick={onContactSupportClick}>
        <Typography bold>Contact Support</Typography>
      </button>
    </CustomDrawer>
  )
}
