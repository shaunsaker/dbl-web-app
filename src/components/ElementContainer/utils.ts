import { keyframes } from '../../styles/stitches.config'

export const getRotateKeyFrames = (colours: string) => {
  const css: Record<string, { borderImage: string }> = {}

  for (let i = 0; i <= 100; i++) {
    const key = `${i}%`
    const degrees = ((360 * i) / 100).toFixed(2)
    const value = {
      borderImage: `conic-gradient(from ${degrees}deg, ${colours}) 1`,
    }

    css[key] = value
  }

  return keyframes(css)
}
