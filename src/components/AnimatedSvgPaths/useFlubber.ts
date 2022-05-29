import { interpolate } from 'flubber'
import { MotionValue, useTransform } from 'framer-motion'

export function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(
    progress,
    paths.map((_, index) => index),
    paths,
    {
      mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
    },
  )
}
