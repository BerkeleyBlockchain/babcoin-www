import { useEffect } from 'react'

import { useColorMode } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import ismobilejs from 'ismobilejs'
import { Outlet, Route, Routes } from 'react-router-dom'

import TopBar from 'components/TopBar'

import Dashboard from 'views/Dashboard'
import Event from 'views/Event'
import Home from 'views/Home'
import Onboarding from 'views/Onboarding'
import Peek from 'views/Peek'

export const App = () => {
  const isMobile = ismobilejs(window.navigator).any
  const { colorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode === 'light') setColorMode('dark')
  }, [colorMode, setColorMode])

  if (isMobile) {
    return (
      <Routes>
        <Route path="/" element={<TopBar />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Outlet />}>
            <Route path=":id" element={<Event />} />
          </Route>
          <Route path="peek" element={<Outlet />}>
            <Route path=":address" element={<Peek />} />
          </Route>
          <Route path="onboarding" element={<Onboarding />} />
        </Route>
      </Routes>
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
