import React from 'react'
import { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useFlubber } from './useFlubber'
import { theme } from '../../styles/stitches.config'
import { bolt, heart, play, shield, star } from './paths'

const paths = [bolt, heart, play, shield, star, bolt]

const colors = [
  theme.colors.pink.value,
  theme.colors.turquoise.value,
  theme.colors.purple.value,
  theme.colors.blue.value,
  theme.colors.turquoise.value,
  theme.colors.pink.value,
]

export const AnimatedSvgPaths = () => {
  const [pathIndex, setPathIndex] = useState(0)

  const progress = useMotionValue(pathIndex)

  const fill = useTransform(
    progress,
    paths.map((_, index) => index),
    colors,
  )

  const path = useFlubber(progress, paths)

  React.useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.4,
      type: 'spring',
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0)

          setPathIndex(1)
        } else {
          setPathIndex(pathIndex + 1)
        }
      },
    })

    return () => animation.stop()
  }, [pathIndex, progress])

  return (
    <svg width="200" height="200">
      <g transform="translate(24 30) scale(6 6)">
        <motion.path fill={fill} d={path} />
      </g>
    </svg>
  )
}
