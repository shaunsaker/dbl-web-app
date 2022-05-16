import { useCallback } from 'react'

export const useLinking = () => {
  const openLink = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])

  return {
    openLink,
  }
}
