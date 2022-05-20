import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { pageParam, RoutePath } from '../../router/models'
import { navigate } from '../../store/navigation/actions'
import { CustomDrawer, CustomDrawerProps } from '../CustomDrawer'

import { Typography } from '../Typography'
import { useLinking } from '../useLinking'

const DRAWER_ROUTES: { label: string; route: string }[] = [
  { label: 'Results', route: RoutePath.results.replace(pageParam, '1') },
  { label: 'Profile', route: RoutePath.profile },
]

interface PrimaryDrawerProps extends CustomDrawerProps {}

export const PrimaryDrawer = ({
  ...props
}: PrimaryDrawerProps): ReactElement => {
  const dispatch = useDispatch()
  const { openLink } = useLinking()

  const onDrawerRouteClick = useCallback(
    (route: string) => {
      dispatch(navigate({ route }))
    },
    [dispatch],
  )

  const onContactSupportClick = useCallback(() => {
    const link = `mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`

    openLink(link)
  }, [openLink])

  return (
    <CustomDrawer anchor="left" {...props}>
      {DRAWER_ROUTES.map(drawerRoute => (
        <button
          key={drawerRoute.label}
          onClick={() => onDrawerRouteClick(drawerRoute.route)}
        >
          <Typography>{drawerRoute.label}</Typography>
        </button>
      ))}

      <button onClick={onContactSupportClick}>
        <Typography>Contact Support</Typography>
      </button>
    </CustomDrawer>
  )
}
