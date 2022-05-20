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
      default: 'all 0.2s ease-in-out',
    },
    colors: {
      primary: '#C94C19',
      accent: '#C9A218',
      white: '#FFFFFF',
      transWhite: 'rgba(255, 255, 255, 0.8)',
      border: '#C2C9D6',
      background: '#F3F5F9',
      primaryText: '#2E3233',
      secondaryText: '#5C6466',
    },
    // fonts: {
    //   primary: 'Source Sans Pro',
    //   logo: 'Playfair Display',
    // },
    fontSizes: {
      title: '24px',
      heading: '20px',
      regular: '16px',
      small: '14px',
    },
    lineHeights: {
      title: '32px',
      heading: '28px',
      regular: '24px',
      small: '16px',
    },
    space: {
      verySmall: '4px',
      small: '8px',
      large: '16px',
      extraLarge: '32px',
    },
    borderRadius: {
      small: '4px',
      large: '8px',
    },
    breakpoints: {
      tablet: '768px',
      desktop: '1024px',
    },
    boxShadows: {
      small:
        '0px 4px 6px 0px rgb(50 50 93 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 8%)',
      large:
        '0px 4px 12px 0px rgb(50 50 93 / 20%), 0px 1px 3px 0px rgb(0 0 0 / 8%)',
      veryLarge:
        '0px 4px 16px 0px rgb(50 50 93 / 33%), 0px 1px 3px 0px rgb(0 0 0 / 8%)',
    },
    borderWidths: {
      small: '2px',
    },
  },
  media: {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
})

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    fontFamily: "'Source Sans Pro', sans-serif",
    boxSizing: 'border-box',
  },
  // '@font-face': [
  //   {
  //     fontFamily: 'Playfair Display',
  //     src: "url('/fonts/PlayfairDisplay-Bold.ttf')",
  //     fontStyle: 'normal',
  //     fontWeight: '700',
  //     fontDisplay: 'swap',
  //   },
  //   {
  //     fontFamily: 'Source Sans Pro',
  //     src: "url('/fonts/SourceSansPro-Regular.ttf')",
  //     fontStyle: 'normal',
  //     fontWeight: '400',
  //     fontDisplay: 'swap',
  //   },
  //   {
  //     fontFamily: 'Source Sans Pro',
  //     src: "url('/fonts/SourceSansPro-SemiBold.ttf')",
  //     fontStyle: 'normal',
  //     fontWeight: '600',
  //     fontDisplay: 'swap',
  //   },
  //   {
  //     fontFamily: 'Source Sans Pro',
  //     src: "url('/fonts/SourceSansPro-Bold.ttf')",
  //     fontStyle: 'normal',
  //     fontWeight: '700',
  //     fontDisplay: 'swap',
  //   },
  // ],
})
