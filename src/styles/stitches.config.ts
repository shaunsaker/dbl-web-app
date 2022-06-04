import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    transitions: {
      default: '0.167s ease-in-out',
    },
    colors: {
      purple: '#711c91',
      pink: '#ea00d9',
      turquoise: '#0abdc6',
      transTurquoise: 'rgba(10, 189, 198, 0.33)',
      blue: '#133e7c',
      black: '#091833',
      transBlack: 'rgba(9, 24, 51, 0.9)',
      white: '#FFFFFF',
      transWhite: 'rgba(255, 255, 255, 0.167)',
    },
    fonts: {
      default: 'Courier Prime',
      logo: 'Rock Salt',
    },
    fontSizes: {
      title: '24px',
      heading: '18px',
      regular: '16px',
      small: '14px',
      icon: '24px',
    },
    lineHeights: {
      title: '28px',
      heading: '24px',
      regular: '20px',
      small: '16px',
    },
    space: {
      verySmall: '4px',
      small: '8px',
      default: '16px',
      large: '32px',
    },
    borderRadius: {
      default: '4px',
    },
    breakpoints: {
      tablet: '768px',
      desktop: '1024px',
    },
    borderWidths: {
      default: '2px',
      large: '4px',
    },
    sizes: {
      headerBarHeight: '64px',
    },
  },
  media: {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
  utils: {
    flexCenter: () => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }),
  },
})

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    fontFamily: "'Courier Prime', sans-serif",
    boxSizing: 'border-box',
  },
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
  },
  '#__next': {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    background: 'none',
    border: 'none',
    outline: '$white',
    cursor: 'pointer',
  },
  input: {
    outline: 'none',
    border: 'none',
  },
  '::-webkit-scrollbar': {
    width: theme.space.small,
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '$transWhite',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '$transWhite',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '$transTurquoise',
  },
})
