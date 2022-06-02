import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import React, { ReactElement } from 'react'
import { DEFAULT_TRANSITION } from '../styles/animation'
import { styled } from '../styles/stitches.config'
import { BackdropBase } from './Backdrop'
import { ElementContainer } from './ElementContainer'
import { Typography } from './Typography'

const DRAWER_WIDTH = 320
const ITEM_ANIMATION_DURATION = 0.1

export interface DrawerItem {
  label: string
  link: string
}

interface DrawerProps {
  open: boolean
  items: DrawerItem[]
  onClose: () => void
}

export const Drawer = ({ open, items, onClose }: DrawerProps): ReactElement => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <BackdropBase onClick={onClose}>
            <Wrapper
              initial={{ width: 0 }}
              animate={{
                width: DRAWER_WIDTH,
              }}
              exit={{
                width: 0,
                transition: {
                  ...DEFAULT_TRANSITION,
                  // wait for the items to animate out before closing the drawer
                  delay: ITEM_ANIMATION_DURATION * items.length,
                },
              }}
            >
              <StyledElementContainer kind="large">
                <Container
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    closed: {
                      transition: {
                        ...DEFAULT_TRANSITION,
                        staggerChildren: ITEM_ANIMATION_DURATION,
                        staggerDirection: -1,
                      },
                    },
                    open: {
                      transition: {
                        ...DEFAULT_TRANSITION,
                        staggerChildren: ITEM_ANIMATION_DURATION,
                        staggerDirection: 1,
                      },
                    },
                  }}
                >
                  {items.map(item => (
                    <MenuItem
                      key={item.label}
                      href={item.link}
                      variants={{
                        closed: {
                          opacity: 0,
                          scale: 0.9,
                        },
                        open: { opacity: 1, scale: 1 },
                      }}
                    >
                      <Typography kind="title">{item.label}</Typography>
                    </MenuItem>
                  ))}
                </Container>
              </StyledElementContainer>
            </Wrapper>
          </BackdropBase>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

const Wrapper = styled(m.div, {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  backgroundColor: '$black',
})

const StyledElementContainer = styled(ElementContainer, {
  // we only want the RHS border
  borderTop: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
})

const Container = styled(m.div, {
  display: 'flex',
  flexDirection: 'column',
  padding: '$large',
})

const MenuItem = styled(m.a, {
  textDecorationLine: 'none',
  marginBottom: '$large',
  transition: 'color $default',

  '&:hover > span': {
    color: '$turquoise',
  },
})
