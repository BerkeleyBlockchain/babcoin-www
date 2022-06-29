import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ismobilejs from 'ismobilejs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'views/Home'

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
})

export const App = () => {
  const isMobile = ismobilejs(window.navigator).any

  if (isMobile) {
    return (
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    )
  }

  return (
    <a
      href="https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome"
      target="_blank"
      rel="noreferrer"
    >
      switch to mobile mode! (and refresh)
    </a>
  )
}
