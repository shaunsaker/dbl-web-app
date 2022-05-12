import React, { ReactElement, useCallback } from 'react'

import { Typography } from './Typography'
import { useLinking } from './useLinking'

interface CustomDrawerProps {}

export const CustomDrawer = ({}: CustomDrawerProps): ReactElement => {
  const { openLink } = useLinking()

  const onContactSupportClick = useCallback(async () => {
    const link = `mailto:${process.env.SUPPORT_EMAIL}`

    await openLink(link)
  }, [openLink])

  return (
    <div>
      <button onClick={onContactSupportClick}>
        <Typography bold>Contact Support</Typography>
      </button>
    </div>
  )
}
