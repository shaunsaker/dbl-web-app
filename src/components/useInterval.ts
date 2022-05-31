import { useRef, useEffect } from 'react'

export const useInterval = (cb: () => void, delay: number) => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = cb
  }, [cb])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
