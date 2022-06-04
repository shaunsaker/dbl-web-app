import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../store/snackbars/actions'
import { SnackbarType } from '../store/snackbars/models'
import { ButtonBase } from './ButtonBase'
import { CopyIcon } from './icons/CopyIcon'

interface CopyIconProps {
  value: string | number
}

export const CopyButton = ({ value }: CopyIconProps): ReactElement => {
  const dispatch = useDispatch()

  const onCopyClick = useCallback(async () => {
    navigator.clipboard.writeText(value.toString())

    dispatch(
      showSnackbar({
        type: SnackbarType.success,
        title: `Copied to Clipboard: ${value}`,
      }),
    )
  }, [value, dispatch])

  return (
    <ButtonBase onClick={onCopyClick}>
      <CopyIcon />
    </ButtonBase>
  )
}
