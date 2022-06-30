import { extendTheme } from '@chakra-ui/react'

// Generate color scheme palette: https://smart-swatch.netlify.app/
const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
  styles: {
    global: () => ({
      body: {
        bg: '#000',
      },
    }),
  },
  colors: {
    // HACK ALERT: To set the color for the progress bar it takes a default value of 200 which is why 200 is merkle mango's color on figma
    // In reality it should not be that color based on the palette but this makes it so the merkleMango color works on the progress component
    merkleMango: {
      50: '#fff9db',
      100: '#ffecad',
      200: '#fecb33', // actual 200 color: #ffdf7d
      300: '#fed24b',
      400: '#fec51b',
      500: '#e4ab01',
      600: '#b28500',
      700: '#7f5f00',
      800: '#4d3900',
      900: '#1c1300',
    },
  },
})

export default theme
