import { useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { showSnackbar } from '../store/snackbars/actions'
import { SnackbarType } from '../store/snackbars/models'

export const useSharing = () => {
  const dispatch = useDispatch()

  const share = useCallback(
    async (options: any) => {
      try {
        // TODO: implement share
        // await Share.open({ ...options, failOnCancel: false })
      } catch (error) {
        dispatch(
          showSnackbar({
            type: SnackbarType.error,
            title: 'Error',
            description: (error as Error).message,
          }),
        )
      }
    },
    [dispatch],
  )

  return {
    share,
  }
}
