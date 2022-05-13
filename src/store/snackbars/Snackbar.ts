import { SnackbarProvider } from 'notistack'

export const Snackbar: {
  enqueueSnackbar: SnackbarProvider['enqueueSnackbar'] | null
} = {
  enqueueSnackbar: null,
}
