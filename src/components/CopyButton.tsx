import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../store/snackbars/actions'
import { SnackbarType } from '../store/snackbars/models'
import { CopyIcon } from './icons/CopyIcon'
import { colors } from '../theme/colors'

const SIZE = 24

interface CopyIconProps {
  value: string
}

export const CopyButton = ({ value }: CopyIconProps): ReactElement => {
  const dispatch = useDispatch()

  const onCopyClick = useCallback(async () => {
    navigator.clipboard.writeText(value)

    dispatch(
      showSnackbar({
        type: SnackbarType.success,
        title: 'Copied to Clipboard',
        description: value,
      }),
    )
  }, [value, dispatch])

  return (
    <button onClick={onCopyClick}>
      <CopyIcon width={SIZE} height={SIZE} fill={colors.primaryText} />
    </button>
  )
}
