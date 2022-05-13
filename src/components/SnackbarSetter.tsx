import { useSnackbar } from 'notistack'
import { Snackbar } from '../store/snackbars/Snackbar'

interface SnackbarSetterProps {}

// this is a hack to allow us to enqueue snackbars from outside of components where we can't use the hook, useSnackbar
export const SnackbarSetter = ({}: SnackbarSetterProps): null => {
  const { enqueueSnackbar } = useSnackbar()

  Snackbar.enqueueSnackbar = enqueueSnackbar

  return null
}
