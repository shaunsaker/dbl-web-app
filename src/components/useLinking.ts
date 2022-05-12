import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useLinking = () => {
  const dispatch = useDispatch()

  const openLink = useCallback(
    (url: string) => {
      window.open(url, '_blank')
    },
    [dispatch],
  )

  return {
    openLink,
  }
}
